// lib/upload.js
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const upload = async (file) => {
    if (!file) return null;

    const storage = getStorage();
    const fileRef = ref(storage, `images/${file.name}_${Date.now()}`);

    try {
        await uploadBytes(fileRef, file);
        const url = await getDownloadURL(fileRef);
        return url;
    } catch (err) {
        console.error("Upload error:", err);
        throw err;
    }
};

export default upload;