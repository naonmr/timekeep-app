import { type } from "os";
import React from "react";
import "./App.css";

import { AuthProvider } from "./firebase/AuthContext";

const App: React.FC = ({ Component, pageProps }: any) => {
  return (
    <>
      <div className="App">
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </div>
    </>
  );
};

export default App;
