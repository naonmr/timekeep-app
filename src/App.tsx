import React, { useEffect, useState } from "react";
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
import { getAuth, onAuthStateChanged } from "firebase/auth";

const App: React.FC = () => {
  const [meetingId, setMeetingId] = useState<number | undefined>(undefined);
  const [agendas, setAgendas] = useState<any>([{ title: "", time: 1 }]);

  return (
    <>
      <div className="App">
        <AuthProvider>
          <BrowserRouter>
            <Switch>
              <Route path="/signup" component={SignUp} />
              <Route path="/login" component={Login} />

              <TimerProvider>
                <PrivateRoute
                  path="/mypage"
                  children={
                    <MyPage meetingId={meetingId} setMeetingId={setMeetingId} />
                  }
                />
                <PrivateRoute path="/setup-agenda" children={<SetupAgenda />} />
                <PrivateRoute path="/fix-agenda" children={<FixAgenda />} />
                <PrivateRoute
                  path="/timer"
                  children={
                    <TimerPage
                      meetingId={meetingId}
                      setMeetingId={setMeetingId}
                      agendas={agendas}
                      setAgendas={setAgendas}
                    />
                  }
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
