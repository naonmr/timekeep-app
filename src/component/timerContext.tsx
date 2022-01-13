import { exitCode } from "process";
import React, { createContext, useContext, useState } from "react";

type TimerContextProps = {
  agendaList: any;
};
const TimerContext = React.createContext<TimerContextProps>({
  agendaList: undefined,
});

export const TimerProvider: React.FC = ({ children }) => {
  const [agendaList, setAgendaList] = useState<string[]>([]);

  return (
    <TimerContext.Provider value={{ agendaList: agendaList }}>
      {" "}
      {children}
    </TimerContext.Provider>
  );
};

export const useTimerContext = () => useContext(TimerContext);
