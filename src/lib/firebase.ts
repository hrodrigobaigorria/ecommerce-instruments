import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup, signOut, User } from "firebase/auth";
import { toast } from "sonner";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export async function signInWithGoogle(): Promise<User | null> {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    toast(`Welcome, ${user.displayName || "User"}!`, { type: "success" });
    return user;
  } catch (error) {
    toast.error("Google sign-in failed. Please try again.");
    return null;
  }
}

export async function signInWithFacebook(): Promise<User | null> {
  try {
    const result = await signInWithPopup(auth, facebookProvider);
    const user = result.user;
    toast(`Welcome, ${user.displayName || "User"}!`, { type: "success" });
    return user;
  } catch (error) {
    toast.error("Facebook sign-in failed. Please try again.");
    return null;
  }
}

export async function signOutUser(): Promise<void> {
  try {
    await signOut(auth);
    toast("Signed out successfully.", { type: "success" });
  } catch (error) {
    toast.error("Failed to sign out. Please try again.");
  }
}
