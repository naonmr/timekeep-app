import Circular from "../component/Circular";
import { SubButton } from "../component/Button";
import { useTimerContext } from "../component/timerContext";
import { useEffect, useRef } from "react";

// TODO: timer関数を修正
const Tiemr = () => {
  const {
    agendaList,
    // setAgendaList,

    timeOfAT,
    setTimeOfAT,
    leftTimeOfAT,
    setLeftTimeOfAT,
    currentIndex,
    setCurrentIndex,

    timeOfTT,
    // setTimeOfTT,
    leftTimeOfTT,
    setLeftTimeOfTT,

    isPaused,
    setIsPaused,
    isEnd,
    setIsEnd,
  } = useTimerContext();

  const leftTimeOfATRef = useRef(leftTimeOfAT);
  const leftTimeOfTTRef = useRef(leftTimeOfTT);

  const isPausedRef = useRef(isPaused);
  const currentIndexRef = useRef(currentIndex);

  const initTimer = () => {
    setTimeOfAT(agendaList[currentIndex].time);
    leftTimeOfATRef.current = agendaList[currentIndex].time * 60;
    setLeftTimeOfAT(leftTimeOfATRef.current);

    // TTの初期化
    leftTimeOfTTRef.current = timeOfTT * 60;

    // TODO:現在のagendaの設定
  };

  const tick = () => {
    leftTimeOfATRef.current--;
    console.log("残り", leftTimeOfATRef.current);
    setLeftTimeOfAT(leftTimeOfATRef.current);

    leftTimeOfTTRef.current--;

    setLeftTimeOfTT(leftTimeOfTTRef.current);
  };

  // const switchNextAgenda = () => {
  //   const nextIndex = currentIndexRef.current + 1;
  //   currentIndexRef.current = nextIndex;
  //   setCurrentIndex(currentIndexRef.current);
  //   console.log(currentIndexRef.current, "🌸");
  //   if (agendaList[currentIndexRef.current] === undefined) {
  //     // TODO:agendaをendと表示？
  //     console.log("いふアンディファインド");
  //     return setIsEnd(true);
  //   }
  //   console.log("nextIndex", nextIndex);
  //   setTimeOfAT(agendaList[currentIndexRef.current].time);
  // };

  useEffect(() => {
    initTimer();
    const interval = setInterval(() => {
      if (isPausedRef.current) {
        return;
      }
      if (leftTimeOfATRef.current === 0) {
        const nextIndex = currentIndexRef.current + 1;
        currentIndexRef.current = nextIndex;
        setCurrentIndex(currentIndexRef.current);
        console.log(currentIndexRef.current, "🌸");
        if (agendaList[currentIndexRef.current] === undefined) {
          return setIsEnd(true);
        }
        console.log("nextIndex", nextIndex);

        setTimeOfAT(agendaList[currentIndexRef.current].time);
        initTimer();
      }

      tick();
    }, 100);
    return () => clearInterval(interval);
  }, []);

  //　綺麗に時間を表示するための設定 about AT
  const totalSecondsOfAT = timeOfAT * 60;
  const parcentageOfAT = (leftTimeOfAT / totalSecondsOfAT) * 100;
  const minutesOfAT = Math.floor(leftTimeOfAT / 60);
  let seconsdsOfAT: any = leftTimeOfAT % 60;
  if (seconsdsOfAT < 10) seconsdsOfAT = "0" + String(seconsdsOfAT);

  const displayOfAT = `${minutesOfAT}m${seconsdsOfAT}s`;

  //　綺麗に時間を表示するための設定 about TT
  const totalSecondsOfTT = timeOfTT * 60;
  const parcentageOfTT = (leftTimeOfTT / totalSecondsOfTT) * 100;

  const hoursOfTT = Math.floor(leftTimeOfTT / 3600);
  let minutesOfTT: any = Math.floor(leftTimeOfTT / 60) % 60;
  if (minutesOfTT < 10) minutesOfTT = "0" + minutesOfTT;
  let seconsdsOfTT: any = leftTimeOfTT % 60;
  if (seconsdsOfTT < 10) seconsdsOfTT = "0" + seconsdsOfTT;

  let displayOfTT = `${hoursOfTT}h${minutesOfTT}m${seconsdsOfTT}s`;

  return (
    <>
      <Circular
        value={isEnd ? 0 : parcentageOfAT}
        text={isEnd ? "End" : displayOfAT}
        color="orange.400"
      />
      <Circular
        value={isEnd ? 0 : parcentageOfTT}
        text={isEnd ? "End" : displayOfTT}
        color="orange.400"
      />
      <SubButton
        text="start"
        onclick={() => {
          isPausedRef.current = false;
          setIsPaused(isPausedRef.current);
          console.log("start", isPausedRef.current);
        }}
      />
      <SubButton
        text="pause"
        onclick={() => {
          isPausedRef.current = true;
          setIsPaused(isPausedRef.current);
          console.log("pause", isPausedRef.current);
        }}
      />
    </>
  );
};

export default Tiemr;
