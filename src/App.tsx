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
import axios from "axios";

const App: React.FC = () => {
  const [showInput, setShowInput] = useState(true);
  const [isPaused, setIsPaused] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [list, setList] = useState([
    {
      id: 1,
      agenda: "example",
      time: "1",
    },
    {
      id: 2,
      agenda: "example2",
      time: "2",
    },
  ]);

  // individual timer関連のstate
  const [workMinutes, setWorkMinutes] = useState(0);
  const [secondLeft, setSecondLeft] = useState(1);
  const [index, setIndex] = useState(0);
  const [currentAgenda, setCurrentAgenda] = useState("");

  // total timer関連のstate
  const [totalTime, setTotalTime] = useState(0);
  const [totalSecondLeft, setTotalSecondLeft] = useState(1);

  useEffect(() => {
    let total = 0;
    list.map((item) => {
      total = total + Number(item.time);
    });
    setTotalTime(total);
  }, [list]);

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
