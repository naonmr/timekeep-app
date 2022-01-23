import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import AgendaList from "../component/AgendaList";
import Header from "../component/Header";
import Timer from "../component/Timer";
import { useTimerContext } from "../component/timerContext";
import { useAuthContext } from "../firebase/AuthContext";
// TODO: 会議全体の時間のTimerの作成

const TimerPage = () => {
  const { currentUser } = useAuthContext();
  const [currentMeetingTitle, setCurrentMeetingTitle] = useState("");
  const [agendas, setAgendas] = useState([{ title: "", time: 1 }]);
  const [timeList, setTimeList] = useState([]);
  const [totalTime, setTotaltime] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  // paramsを取得
  let params: any = useParams();
  let meetingId: string = params.meetindId;

  useEffect(() => {
    let agendas: any = [];
    let newTimeList: any = [];

    const getAgendaList = async (meetingId: string) => {
      const res = await axios.get(
        `/api/agendas/${currentUser}?meetingId=${meetingId}`
      );

      // アジェンダから必要な情報のみ取得
      agendas = res.data.agendas.map((agenda: any) => {
        return { title: agenda.title, time: agenda.time };
      });

      setCurrentMeetingTitle(res.data.title);
      setAgendas(agendas);

      console.log(agendas);
      newTimeList = agendas.map((agenda: any) => {
        return agenda.time;
      });
      setTimeList(newTimeList);

      const add = (previousValue: number, currentValue: number) =>
        previousValue + currentValue;

      const NewTotalTime = newTimeList.reduce(add, 0);
      setTotaltime(NewTotalTime);
    };

    getAgendaList(meetingId);

    // timeの情報だけを抽出
  }, []);

  // TODO CSS整える！
  return (
    <>
      <Header />
      <br></br>
      <h1>{currentMeetingTitle}</h1>
      <p>total time {totalTime}m</p>
      <div>現在のアジェンダ： {agendas[currentIndex].title}</div>
      <Timer
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        timeList={timeList}
        agendas={agendas}
        totalTime={totalTime}
      />
      <AgendaList agendas={agendas} currentMeetingTitle={currentMeetingTitle} />
    </>
  );
};

export default TimerPage;
