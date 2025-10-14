import React, { useState, useEffect, useCallback } from 'react';
import { initializeApp, getApps, getApp } from 'firebase/app'; // <-- Import getApps and getApp
import {
  getAuth,
  signInAnonymously,
  signInWithCustomToken,
  onAuthStateChanged
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
  arrayUnion,
  setLogLevel
} from 'firebase/firestore';

// --- MOCK USER STORE (Adapted for single-file use) ---
// In a real app, this would be a separate Zustand/Context store.
// Here we use simple global state management (signals/useState).
const useUserStore = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [db, setDb] = useState(null);
  const [auth, setAuth] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Initialize Firebase
    try {
      const firebaseConfig = JSON.parse(typeof __firebase_config !== 'undefined' ? __firebase_config : '{}');
      let app;

      // CRITICAL FIX: Check if Firebase app is already initialized
      if (!getApps().length) {
        app = initializeApp(firebaseConfig);
      } else {
        app = getApp(); // If already initialized, use the existing default app
      }

      const firestoreDb = getFirestore(app);
      const firebaseAuth = getAuth(app);
      setDb(firestoreDb);
      setAuth(firebaseAuth);

      // Set Firestore log level for debugging
      setLogLevel('debug');

      const unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
        if (user) {
          setUserId(user.uid);
          // Fetch user data into the store (mocked structure)
          // In a real scenario, this would fetch from /users/{user.uid}
          setCurrentUser({ id: user.uid, username: `User-${user.uid.substring(0, 4)}`, avatar: "./avatar.png" });
        } else {
          // Sign in anonymously if initial token is missing
          if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
            await signInWithCustomToken(firebaseAuth, __initial_auth_token);
          } else {
            await signInAnonymously(firebaseAuth);
          }
        }
        setIsLoading(false);
      });

      return () => unsubscribe();
    } catch (e) {
      console.error("Firebase Initialization Error:", e);
      // This catch block will now often catch the 'duplicate-app' error, 
      // but the fix above should prevent it from happening in the first place.
      setIsLoading(false);
    }
  }, []);

  return { db, auth, userId, currentUser, isLoading };
};

// --- REACT COMPONENT ---

const AddUser = () => {
  const { db, currentUser, isLoading } = useUserStore();
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  // Styling for the component, using Tailwind CSS
  const styles = {
    addUserContainer: "p-5 flex flex-col gap-5 items-center bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl",
    form: "flex gap-2 w-full",
    input: "flex-1 p-2 bg-white/20 border border-white/30 rounded-lg placeholder-white/70 focus:ring-sky-400 focus:border-sky-400",
    button: "py-2 px-4 bg-sky-500 text-white font-semibold rounded-lg hover:bg-sky-600 transition duration-200 disabled:bg-gray-500",
    userCard: "flex justify-between items-center bg-white/20 p-3 rounded-lg w-full",
    userDetail: "flex items-center gap-3",
    avatar: "w-10 h-10 rounded-full object-cover",
    span: "text-white font-medium",
    message: "text-sm text-red-400 mt-2"
  };

  const handleSearch = useCallback(async (e) => {
    e.preventDefault();
    if (!db) return;

    const formData = new FormData(e.target);
    const username = formData.get("username").trim();

    if (!username) {
      setError("Please enter a username to search.");
      return;
    }

    setError('');
    setUser(null);
    setIsSearching(true);

    try {
      // NOTE: Collection name is 'users' (lowercase) based on your rules file.
      const userRef = collection(db, "users");
      const q = query(userRef, where("username", "==", username));
      const querySnapShot = await getDocs(q);

      if (!querySnapShot.empty) {
        // Assuming the document data contains the necessary user fields
        setUser({ id: querySnapShot.docs[0].id, ...querySnapShot.docs[0].data() });
      } else {
        setError(`No user found with username: ${username}`);
      }
    } catch (err) {
      console.error("Error during search:", err);
      setError(`Search failed: ${err.message}`);
    } finally {
      setIsSearching(false);
    }
  }, [db]);

  const handleAdd = useCallback(async () => {
    if (!db) return;
    if (isLoading || !currentUser || !currentUser.id) {
      setError("You must be logged in to add a user.");
      console.error("Authentication check failed. Current user state:", currentUser);
      return;
    }
    if (!user || !user.id) {
      setError("No user selected to add.");
      return;
    }

    setError('');
    setIsAdding(true);

    // Use lowercase collection names to match the security rules
    const chatRef = collection(db, "chats");
    const userChatsRef = collection(db, "userchats");

    try {
      // 1. Create a new chat document in the 'chats' collection
      const newChatRef = doc(chatRef);
      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        messages: [],
      });

      // 2. Update the RECIPIENT's 'userchats' document (Requires the broad rule fix!)
      await updateDoc(doc(userChatsRef, user.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: currentUser.id,
          updatedAt: Date.now(),
        }),
      });

      // 3. Update the CURRENT USER's 'userchats' document (Should pass your specific rule)
      await updateDoc(doc(userChatsRef, currentUser.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: user.id, // The ID of the person we just added
          updatedAt: Date.now(),
        }),
      });

      console.log("Chat successfully created and chat lists updated.");
      setUser(null); // Clear search result after successful addition
    } catch (err) {
      // This catch block will now likely only be hit if the updated security rules are NOT published
      console.error("FirebaseError during handleAdd:", err);
      setError(`Failed to add user/start chat. Check your security rules: ${err.message}`);
    } finally {
      setIsAdding(false);
    }
  }, [db, currentUser, isLoading, user]);

  if (isLoading) {
    return <div className={styles.addUserContainer}><p className="text-white">Loading...</p></div>;
  }

  return (
    <div className={styles.addUserContainer}>
      <h2 className="text-xl font-bold text-white mb-3">Add New Contact</h2>
      <form onSubmit={handleSearch} className={styles.form}>
        <input
          type="text"
          placeholder="Enter username"
          name="username"
          className={styles.input}
          disabled={isSearching}
        />
        <button
          className={styles.button}
          disabled={isSearching}
        >
          {isSearching ? "Searching..." : "Search"}
        </button>
      </form>

      {error && <p className={styles.message}>{error}</p>}

      {user && (
        <div className={styles.userCard}>
          <div className={styles.userDetail}>
            {/* The avatar should ideally come from the user document, using a placeholder if needed */}
            <img
              src={user.avatar || "https://placehold.co/40x40/0E7490/ffffff?text=U"}
              alt="User Avatar"
              className={styles.avatar}
              onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/40x40/0E7490/ffffff?text=U"; }}
            />
            <span className={styles.span}>{user.username}</span>
          </div>
          <button
            onClick={handleAdd}
            className={`${styles.button} bg-green-500 hover:bg-green-600`}
            disabled={isAdding}
          >
            {isAdding ? "Adding..." : "Add User"}
          </button>
        </div>
      )}

      <p className="text-xs text-white/50 mt-2">Current User ID: {currentUser?.id || "N/A"}</p>
    </div>
  );
};

// Apply simple global styling for aesthetics
const App = () => (
  <>
    <style dangerouslySetInnerHTML={{
      __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
        body { 
            font-family: 'Inter', sans-serif; 
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
        }
        .addUser { 
            max-width: 400px; 
            width: 90%;
        }
    `}} />
    <AddUser />
  </>
);

export default App;
