import { type } from "os";
import React from "react";
import "./App.css";
import { LoginButton, LogoutButton } from "./component/Button";

import { AuthProvider, useAuthContext } from "./firebase/AuthContext";

const App: React.FC = () => {
  const { currentUser } = useAuthContext();
  return (
    <>
      <div className="App">
        <p>firebase setup</p>
        <AuthProvider>
          <p>はろー！！</p>
          {currentUser ? <LogoutButton /> : <LoginButton />}
        </AuthProvider>
      </div>
    </>
  );
};

export default App;
