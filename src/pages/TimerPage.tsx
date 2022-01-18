import axios from "axios";
import { time } from "console";
import { useEffect, useState } from "react";
import AgendaList from "../component/AgendaList";
import Header from "../component/Header";
import Timer from "../component/Timer";
import { useTimerContext } from "../component/timerContext";
import { useAuthContext } from "../firebase/AuthContext";
// TODO: timer関数を修正

type TimerPageProps = {
  meetingId: number | undefined;
  setMeetingId: any;
  agendas: any;
  setAgendas: any;
};
const TimerPage = (props: TimerPageProps) => {
  const { currentUser } = useAuthContext();
  const { meetingId, setMeetingId, agendas, setAgendas } = props;
  // const [agendas, setAgendas] = useState<any>([{ title: "", time: 1 }]);

  const { mtgTotalTime, setMtgTitle } = useTimerContext();
  console.log("Timerpage", meetingId);

  const timeList = agendas.map((agenda: any) => {
    return agenda.time;
  });
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const getAgendaList = async (meetingId: number | undefined) => {
      try {
        const res = await axios.get(
          `/api/agendas/${currentUser}?meetingId=${meetingId}`
        );
        console.log("res", res);

        const agendas = res.data.agendas.map((agenda: any) => {
          return { title: agenda.title, time: agenda.time };
        });

        setMtgTitle(res.data.title);
        setAgendas(agendas);
        console.log(agendas);
      } catch (error) {
        console.log(error);
      }
    };
    getAgendaList(meetingId);
  }, []);

  return (
    <>
      <Header />
      <br></br>
      <p>total time {timeList}</p>
      <Timer
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        timeList={timeList}
        agendas={agendas}
      />
      <AgendaList
        agendas={agendas}
        setAgendas={setAgendas}
        meetingId={meetingId}
      />
    </>
  );
};

export default TimerPage;
