import { createContext, useContext, useEffect, useState } from "react";
import { User } from "./User";
import firebase from "./firebaseConfig";
import { onAuthStateChanged } from "./auth";
import { getAuth } from "firebase/auth";

type AuthContextProps = {
  currentUser: User | null | undefined;
};

const AuthContext = createContext<AuthContextProps>({ currentUser: undefined });

export const AuthProvider: React.FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null | undefined>(
    undefined
  );

  useEffect(() => {
    const auth = getAuth(firebase);

    const unsubscribe = onAuthStateChanged((firebaseUser) => {
      setCurrentUser(firebaseUser);
    });

    return unsubscribe;
  }, []);

  return (
    <>
      <AuthContext.Provider value={{ currentUser: currentUser }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};

export const useAuthContext = () => useContext(AuthContext);
