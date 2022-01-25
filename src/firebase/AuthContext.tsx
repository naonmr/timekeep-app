import { createContext, useContext, useState } from "react";

type AuthContextProps = {
  currentUser?: string | null | undefined;
  setCurrentUser?: any;
};

const AuthContext = createContext<AuthContextProps>({ currentUser: undefined });

export const AuthProvider: React.FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<string | null | undefined>(
    undefined
  );
  // useEffect(() => {
  //   const auth = getAuth(firebase);

  //   onAuthStateChanged(auth, (user) => {
  //     const userInfo: string | null = user ? user?.uid : null;
  //     setCurrentUser(user?.uid);
  //     console.log(userInfo);
  //   });
  // }, []);

  return (
    <>
      <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};

export const useAuthContext = () => useContext(AuthContext);
