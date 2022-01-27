import React from "react";
import "./App.css";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import MyPage from "./pages/MyPage";
import SetupAgenda from "./pages/SetupAgenda";
import FixAgenda from "./pages/FixAgenda";
import TimerPage from "./pages/TimerPage";
import Home from "./pages/Home";

import PrivateRoute from "./firebase/PrivateRoute";
import { AuthProvider } from "./firebase/AuthContext";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import IsRegister from "./pages/IsRegister";

const App: React.FC = () => {
  return (
    <>
      <div className="App">
        <AuthProvider>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" children={<Home />} />
              <Route path="/signup" component={SignUp} />
              <Route path="/is-register" component={IsRegister} />
              <Route path="/login" component={Login} />

              <PrivateRoute exact path="/mypage" children={<MyPage />} />
              <PrivateRoute path="/setup-agenda" children={<SetupAgenda />} />
              <PrivateRoute
                path="/fix-agenda/:meetindId"
                children={<FixAgenda />}
              />
              <PrivateRoute path="/timer/:meetindId" children={<TimerPage />} />
            </Switch>
          </BrowserRouter>
        </AuthProvider>
      </div>
    </>
  );
};

export default App;
