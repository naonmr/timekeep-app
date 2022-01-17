import { createContext, useContext, useEffect, useState } from "react";
import { User } from "./User";
import firebase from "./firebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";

type AuthContextProps = {
  currentUser?: User | null | undefined;
  setCurrentUser?: any;
  loading?: boolean;
};

const AuthContext = createContext<AuthContextProps>({ currentUser: undefined });

export const AuthProvider: React.FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null | undefined>(
    undefined
  );
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setLoading(true);

    const auth = getAuth(firebase);

    onAuthStateChanged(auth, (user) => {
      const userInfo: User | null = user
        ? {
            uid: user?.uid,
          }
        : null;
      setCurrentUser(userInfo);
      console.log(userInfo);
    });
    setLoading(false);
  }, []);

  return (
    <>
      <AuthContext.Provider value={{ currentUser, setCurrentUser, loading }}>
        {!loading && children}
      </AuthContext.Provider>
    </>
  );
};

export const useAuthContext = () => useContext(AuthContext);
