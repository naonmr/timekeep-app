import {
  getAuth,
  GoogleAuthProvider,
  signInWithRedirect,
  signOut,
  onAuthStateChanged as onFirebaseAuthStateChanged,
  EmailAuthCredential,
} from "firebase/auth";
import firebase from "./firebaseConfig";
import { User } from "./User";

const provider = new GoogleAuthProvider();

export function login(): void {
  const auth = getAuth(firebase);
  signInWithRedirect(auth, provider);
}

export function logout(): Promise<void> {
  return new Promise((resolve, reject) => {
    const auth = getAuth(firebase);
    signOut(auth)
      .then(() => resolve())
      .catch((error) => reject(error));
  });
}

export const onAuthStateChanged = (callback: (user: User | null) => void) => {
  const auth = getAuth(firebase);

  onFirebaseAuthStateChanged(auth, (user) => {
    const userInfo: User | null = user
      ? {
          displayName: user?.displayName,
          email: user?.email,
        }
      : null;
    callback(userInfo);
  });
};
