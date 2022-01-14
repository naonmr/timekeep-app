import React, { createContext, useContext, useState, useEffect } from "react";

type TimerContextProps = {
  agendaList?: any;
  setAgendaList?: any;

  timeOfAT?: any;
  setTimeOfAT?: any;
  leftTimeOfAT?: any;
  setLleftTimeOfAT?: any;
  currentIndex?: any;
  setCurrentIndex?: any;

  timeOfTT?: any;
  setTimeOfTT?: any;
  leftTimeOfTT?: any;
  setLleftTimeOfTT?: any;

  isPaused?: any;
  setIsPaused?: any;
};
const TimerContext = React.createContext<TimerContextProps>({});

export const TimerProvider: React.FC = ({ children }) => {
  /////
  // TT = Total Timer, AT = Agenda Timer
  /////

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
  const [leftTimeOfAT, setLleftTimeOfAT] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentAgenda, setCurrentAgenda] = useState("");

  // total timer関連のstate
  const [timeOfTT, setTimeOfTT] = useState(0);
  const [leftTimeOfTT, setLleftTimeOfTT] = useState(1);

  // timerの動き関連の
  const [isPaused, setIsPaused] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    let totalTime = 0;
    agendaList.map((agenda) => {
      totalTime = totalTime + Number(agenda.time);
    });
    setTimeOfTT(totalTime);
  }, [agendaList]);
  return (
    <TimerContext.Provider
      value={{
        agendaList,
        setAgendaList,

        timeOfAT,
        setTimeOfAT,
        leftTimeOfAT,
        setLleftTimeOfAT,
        currentIndex,
        setCurrentIndex,

        timeOfTT,
        setTimeOfTT,
        leftTimeOfTT,
        setLleftTimeOfTT,

        isPaused,
        setIsPaused,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export const useTimerContext = () => useContext(TimerContext);
