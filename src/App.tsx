import { type } from "os";
import React from "react";
import "./App.css";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import MyPage from "./pages/MyPage";
import SetupAgenda from "./pages/SetupAgenda";
import FixAgenda from "./pages/FixAgenda";
import TiemerPage from "./pages/TimerPage";

import PrivateRoute from "./firebase/PrivateRoute";
import { AuthProvider, useAuthContext } from "./firebase/AuthContext";
import { TimerProvider } from "./component/timerContext";
import { BrowserRouter, Switch, Route } from "react-router-dom";

const App: React.FC = () => {
  const { currentUser } = useAuthContext();

  console.log(currentUser);
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
                <PrivateRoute path="/timer" component={TiemerPage} />
              </TimerProvider>
            </Switch>
          </BrowserRouter>
          {console.log(currentUser)}
        </AuthProvider>
      </div>
    </>
  );
};

export default App;
