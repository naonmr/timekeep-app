import { time } from "console";
import { useEffect, useState } from "react";
import AgendaList from "../component/AgendaList";
import Header from "../component/Header";
import Timer from "../component/Timer";
import { useTimerContext } from "../component/timerContext";
// TODO: timer関数を修正
const TimerPage = () => {
  const { agendas, mtgTotalTime } = useTimerContext();

  const timeList = agendas.map((agenda: any) => {
    return agenda.time;
  });

  console.log(timeList);
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <>
      <Header />
      <br></br>
      <Timer
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        timeList={timeList}
      />
      <AgendaList />
    </>
  );
};

export default TimerPage;
