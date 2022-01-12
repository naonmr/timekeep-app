import { type } from "os";
import React from "react";
import "./App.css";
import { LoginButton, LogoutButton } from "./component/Button";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./pages/Home";

import { AuthProvider, useAuthContext } from "./firebase/AuthContext";
import { BrowserRouter, Switch, Route } from "react-router-dom";

const App: React.FC = () => {
  const { currentUser } = useAuthContext();
  return (
    <>
      <div className="App">
        <AuthProvider>
          <BrowserRouter>
            <Switch>
              <Route path="/signup" component={SignUp} />
              <Route path="/login" component={Login} />
              <Route path="/" component={Home} />
            </Switch>
          </BrowserRouter>
          {console.log(currentUser)}
        </AuthProvider>
      </div>
    </>
  );
};

export default App;
