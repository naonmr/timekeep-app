import React, { useEffect, useState } from "react";
import "./App.css";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import MyPage from "./pages/MyPage";
import SetupAgenda from "./pages/SetupAgenda";
import FixAgenda from "./pages/FixAgenda";
import TimerPage from "./pages/TimerPage";

import PrivateRoute from "./firebase/PrivateRoute";
import { AuthProvider } from "./firebase/AuthContext";
import { TimerProvider } from "./component/timerContext";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import IsRegister from "./pages/IsRegister";

const App: React.FC = () => {
  // const [meetingId, setMeetingId] = useState<number | undefined>(undefined);
  const [agendas, setAgendas] = useState<any>([{ title: "", time: 1 }]);

  return (
    <>
      <div className="App">
        <AuthProvider>
          <BrowserRouter>
            <Switch>
              <Route path="/signup" component={SignUp} />
              <Route path="/is-register" component={IsRegister} />
              <Route path="/login" component={Login} />

              <TimerProvider>
                <PrivateRoute exact path="/" children={<MyPage />} />
                <PrivateRoute
                  path="/setup-agenda/"
                  children={<SetupAgenda />}
                />
                <PrivateRoute
                  path="/fix-agenda/:meetindId"
                  children={<FixAgenda />}
                />
                <PrivateRoute
                  path="/timer/:meetindId"
                  children={<TimerPage />}
                />
              </TimerProvider>
            </Switch>
          </BrowserRouter>
        </AuthProvider>
      </div>
    </>
  );
};

export default App;
