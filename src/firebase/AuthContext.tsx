import { createContext, useContext, useEffect, useState } from "react";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebase from "./firebaseConfig";

type AuthContextProps = {
  currentUser?: string | null | undefined;
  setCurrentUser?: any;
};

const AuthContext = createContext<AuthContextProps>({ currentUser: undefined });

export const AuthProvider: React.FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<string | null | undefined>(
    undefined
  );

  useEffect(() => {
    const auth = getAuth(firebase);
    onAuthStateChanged(auth, (user) => {
      const userInfo: string | null = user ? user?.uid : null;
      setCurrentUser(user?.uid);
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
