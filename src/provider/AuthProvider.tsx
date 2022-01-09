import { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import { auth } from "../firebaseConfig";
import { AuthContext } from "../context/AuthContext";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const AuthProvider: React.FC<Props> = ({ children, ...props }) => {
  const [user, setUser] = useState<firebase.User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
    });

    return unsubscribe;
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
