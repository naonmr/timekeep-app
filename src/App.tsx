import React, { useEffect } from "react";
import "./App.css";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import MyPage from "./pages/MyPage";
import SetupAgenda from "./pages/SetupAgenda";
import FixAgenda from "./pages/FixAgenda";
import TimerPage from "./pages/TimerPage";

import PrivateRoute from "./firebase/PrivateRoute";
import { AuthProvider, useAuthContext } from "./firebase/AuthContext";
import { TimerProvider, useTimerContext } from "./component/timerContext";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import axios from "axios";

const App: React.FC = () => {
  return (
    <>
      <div className="App">
        <AuthProvider>
          <BrowserRouter>
            <Switch>
              <Route path="/signup" component={SignUp} />
              <Route path="/login" component={Login} />

              <TimerProvider>
                <PrivateRoute path="/mypage" component={MyPage} />
                <PrivateRoute path="/setup/agenda" component={SetupAgenda} />
                <PrivateRoute path="/fix/agenda" component={FixAgenda} />
                <PrivateRoute path="/timer" component={TimerPage} />
              </TimerProvider>
            </Switch>
          </BrowserRouter>
        </AuthProvider>
      </div>
    </>
  );
};

export default App;
