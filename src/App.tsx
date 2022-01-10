import React from "react";
import "./App.css";
import SignUp from "./compornent/SignUp";
import Home from "./compornent/Home";
import Login from "./compornent/Login";

import { AuthProvider } from "./provider/AuthProvider";
import { BrowserRouter, Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="App">
      <AuthProvider>
        <p>firebase setup</p>
        <BrowserRouter>
          <Switch>
            <Route path="/signup" component={SignUp} />
            <Route path="/login" component={Login} />
            <Route path="/" component={Home} />
          </Switch>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
};

export default App;
