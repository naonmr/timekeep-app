import Circular from "../component/Circular";
import { SubButton } from "../component/Button";
import { useTimerContext } from "../component/timerContext";
import { useRef } from "react";

const Tiemr = () => {
  const {
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
  } = useTimerContext();

  const leftTimeOfATRef = useRef(leftTimeOfAT);
  const leftTimeOfTTRef = useRef(leftTimeOfTT);

  const isPausedRef = useRef(isPaused);
  const currentIndexRef = useRef(currentIndex);

  const initTimer = () => {
    setTimeOfAT(agendaList[currentIndex].time);
    leftTimeOfATRef.current = agendaList[currentIndex].time * 60;
    setLleftTimeOfAT(leftTimeOfATRef.current);

    // TTの初期化
    leftTimeOfTTRef.current = timeOfTT * 60;
    setTimeOfTT(leftTimeOfTTRef.current);

    // TODO:現在のagendaの設定
  };

  const tick = () => {
    leftTimeOfATRef.current--;
    setLleftTimeOfAT(leftTimeOfATRef.current);

    leftTimeOfTTRef.current--;
    setLleftTimeOfTT(leftTimeOfTTRef.current);
  };

  const switchNextAgenda = () => {};
  return (
    <>
      <Circular value={40} />
      <SubButton text="start" />
      <SubButton text="pause" />
      <SubButton text="back" />
    </>
  );
};

export default Tiemr;
