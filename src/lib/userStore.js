// userStore.js
import { doc, getDoc } from "firebase/firestore";
import { create } from "zustand";
import { db } from "./firebase";
import { toast } from "react-toastify";

export const useUserStore = create((set) => ({
  currentUser: null,
  isLoading: true,
  fetchUserInfo: async (uid) => {
    if (!uid) {
      set({ currentUser: null, isLoading: false });
      return;
    }

    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        set({ currentUser: docSnap.data(), isLoading: false });
      } else {
        set({ currentUser: null, isLoading: false });
        toast.warn("User data not found.");
      }
    } catch (err) {
      console.error("Fetch user error:", err);
      set({ currentUser: null, isLoading: false });
      if (err.code === "unavailable") {
        toast.error("You are offline. Please check your connection.");
      } else {
        toast.error("Failed to fetch user data: " + err.message);
      }
    }
  },
}));