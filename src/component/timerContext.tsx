import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { useAuthContext } from "../firebase/AuthContext";

type TimerContextProps = {
  agendaList?: any;
  setAgendaList?: any;

  timeOfAT?: any;
  setTimeOfAT?: any;
  leftTimeOfAT?: any;
  setLeftTimeOfAT?: any;
  currentIndex?: any;
  setCurrentIndex?: any;

  timeOfTT?: any;
  setTimeOfTT?: any;
  leftTimeOfTT?: any;
  setLeftTimeOfTT?: any;

  isPaused?: any;
  setIsPaused?: any;
  isEnd?: any;
  setIsEnd?: any;

  meetingId?: number;
  setMeetingId?: any;
  defaultAgenda?: any;
  setDefaultAgenda?: any;
  defaultMtgTitle?: any;
  setDefaultMtgTitle?: any;
};
const TimerContext = React.createContext<TimerContextProps>({});

export const TimerProvider: React.FC = ({ children }) => {
  const { currentUser } = useAuthContext();

  const [defaultAgenda, setDefaultAgenda] = useState<any[]>([
    { title: "", time: 1 },
  ]);

  const [defaultMtgTitle, setDefaultMtgTitle] = useState("");

  /////
  // TT = Total Timer, AT = Agenda Timer
  /////
  const [meetingId, setMeetingId] = useState();

  const [agendaList, setAgendaList] = useState([
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

  // each agenda timer関連のstate
  const [timeOfAT, setTimeOfAT] = useState(0);
  const [leftTimeOfAT, setLeftTimeOfAT] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  // const [currentAgenda, setCurrentAgenda] = useState("");

  // total timer関連のstate
  // TODO stateの初期値の見直し
  const [timeOfTT, setTimeOfTT] = useState(3);
  const [leftTimeOfTT, setLeftTimeOfTT] = useState(3 * 60);

  // timerの動き関連の
  const [isPaused, setIsPaused] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  return (
    <TimerContext.Provider
      value={{
        agendaList,
        setAgendaList,

        timeOfAT,
        setTimeOfAT,
        leftTimeOfAT,
        setLeftTimeOfAT,
        currentIndex,
        setCurrentIndex,

        timeOfTT,
        setTimeOfTT,
        leftTimeOfTT,
        setLeftTimeOfTT,

        isPaused,
        setIsPaused,
        isEnd,
        setIsEnd,

        meetingId,
        setMeetingId,

        defaultAgenda,
        setDefaultAgenda,
        defaultMtgTitle,
        setDefaultMtgTitle,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export const useTimerContext = () => useContext(TimerContext);
