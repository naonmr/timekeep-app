import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { useAuthContext } from "../firebase/AuthContext";

type TimerContextProps = {
  meetingId?: number;
  setMeetingId?: any;
  agendas?: any;
  setAgendas?: any;
  mtgTitle?: any;
  setMtgTitle?: any;
  mtgTotalTime?: any;
  setMtgTotalTime?: any;
};
const TimerContext = React.createContext<TimerContextProps>({});

export const TimerProvider: React.FC = ({ children }) => {
  const { currentUser } = useAuthContext();
  const [meetingId, setMeetingId] = useState();
  const [agendas, setAgendas] = useState<any[]>([{ title: "", time: 1 }]);

  const [mtgTitle, setMtgTitle] = useState("");
  const [mtgTotalTime, setMtgTotalTime] = useState();

  return (
    <TimerContext.Provider
      value={{
        meetingId,
        setMeetingId,

        agendas,
        setAgendas,
        mtgTitle,
        setMtgTitle,

        mtgTotalTime,
        setMtgTotalTime,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export const useTimerContext = () => useContext(TimerContext);
