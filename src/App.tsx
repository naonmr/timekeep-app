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
                  // render={({match}) => <FixAgenda match={match} />}
                />
                <PrivateRoute
                  path="/timer/:meetingId"
                  children={
                    <TimerPage agendas={agendas} setAgendas={setAgendas} />
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
