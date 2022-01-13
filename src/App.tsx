import { type } from "os";
import React from "react";
import "./App.css";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./pages/Home";
import SetAgenda from "./pages/SetupAgenda";
import Tiemr from "./pages/Timer";

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
              <Route path="/home" component={Home} />
              <Route path="/agenda" component={SetAgenda} />
              <Route path="/timer" component={Tiemr} />
            </Switch>
          </BrowserRouter>
          {console.log(currentUser)}
        </AuthProvider>
      </div>
    </>
  );
};

export default App;
