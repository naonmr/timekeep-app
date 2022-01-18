import React, { useEffect, useState } from "react";
import MyPage from "../pages/MyPage";
import SetupAgenda from "../pages/SetupAgenda";
import FixAgenda from "../pages/FixAgenda";
import TimerPage from "../pages/TimerPage";

import PrivateRoute from "../firebase/PrivateRoute";
import { AuthProvider } from "../firebase/AuthContext";
import { TimerProvider } from "../component/timerContext";
import { BrowserRouter, Switch, Route } from "react-router-dom";

const Home: React.FC = () => {
  // const [meetingId, setMeetingId] = useState<number | undefined>(undefined);
  const [agendas, setAgendas] = useState<any>([{ title: "", time: 1 }]);

  return (
    <>
      <div className="App">
        <AuthProvider>
          <BrowserRouter>
            <Switch>
              <TimerProvider>
                <PrivateRoute path="/mypage" children={<MyPage />} />
                <PrivateRoute path="/setup-agenda" children={<SetupAgenda />} />
                <PrivateRoute path="/fix-agenda" children={<FixAgenda />} />
                <PrivateRoute
                  path="/timer"
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

export default Home;
