import { createContext, useContext, useEffect, useState } from "react";
import { User } from "./User";
import firebase from "./firebaseConfig";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";

type AuthContextProps = {
  currentUser?: User | null | undefined;
  setCurrentUser?: any;
};

const AuthContext = createContext<AuthContextProps>({ currentUser: undefined });

export const AuthProvider: React.FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null | undefined>(
    undefined
  );
  const auth = getAuth(firebase);

  useEffect(() => {
    const auth = getAuth(firebase);

    onAuthStateChanged(auth, (user) => {
      console.log(user);
      const userInfo: User | null = user
        ? {
            uid: user?.uid,
          }
        : null;
      setCurrentUser(user);
    });
  }, []);

  return (
    <>
      <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};

export const useAuthContext = () => useContext(AuthContext);
