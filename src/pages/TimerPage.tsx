import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AgendaList from "../component/AgendaList";
import Header from "../component/Header";
import Timer from "../component/Timer";
import { useTimerContext } from "../component/timerContext";
import { useAuthContext } from "../firebase/AuthContext";
// TODO: timer関数を修正

const TimerPage = () => {
  const { currentUser } = useAuthContext();
  const [currentMeetingTitle, setCurrentMeetingTitle] = useState("");
  const [currentAgendas, setCurrentAgendas] = useState([
    { title: "", time: 1 },
  ]);

  let params: any = useParams();
  let meetingId: string = params.meetindId;
  console.log("🌸", meetingId);

  const { setMtgTitle, setAgendas } = useTimerContext();
  console.log("Timerpage", meetingId);

  const timeList = currentAgendas.map((agenda: any) => {
    return agenda.time;
  });

  const add = (previousValue: number, currentValue: number) =>
    previousValue + currentValue;
  // const totalTime = timeList.reduce(add(time,0));

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const getAgendaList = async (meetingId: string) => {
      try {
        const res = await axios.get(
          `/api/agendas/${currentUser}?meetingId=${meetingId}`
        );

        const agendas = res.data.agendas.map((agenda: any) => {
          return { title: agenda.title, time: agenda.time };
        });

        setCurrentMeetingTitle(res.data.title);
        setCurrentAgendas(() => agendas);
        console.log(currentMeetingTitle, currentAgendas);
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
        agendas={currentAgendas}
      />
      <AgendaList
        currentAgendas={currentAgendas}
        currentMeetingTitle={currentMeetingTitle}
        setAgendas={setAgendas}
        meetingId={meetingId}
      />
    </>
  );
};

export default TimerPage;
