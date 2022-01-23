import React, { useEffect, useRef, useState } from "react";
import AgendaList from "./AgendaList";
import { PrimaryButton } from "./Button";
import Circular from "./Circular";
import useSound from "use-sound";

type TimerProps = {
  currentIndex: number;
  setCurrentIndex: any;
  timeList: number[];
  agendas: any;
  totalTime: number;
};

export default function Timer(props: TimerProps) {
  const { currentIndex, setCurrentIndex, timeList, totalTime } = props;
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [secondsLeftOfTotal, setSecondsLeftOfTotal] = useState(totalTime * 60);
  const [isWorking, setIsWorking] = useState(false);
  const [isEnd, setIsEnd] = useState(false);

  const isWorkingRef = useRef(isWorking);
  const currentIndexRef = useRef(currentIndex);
  const secondsLeftRef = useRef(secondsLeft);
  const secondsLeftOfTotalRef = useRef(totalTime);

  const start = () => {
    isWorkingRef.current = true;
    setIsWorking(() => true);
  };
  const pause = () => {
    isWorkingRef.current = false;
    setIsWorking(() => false);
  };

  const initTimer = () => {
    secondsLeftRef.current = timeList[currentIndexRef.current] * 60;
    setSecondsLeft(() => secondsLeftRef.current);

    secondsLeftOfTotalRef.current = totalTime * 60;
    setSecondsLeftOfTotal(() => secondsLeftOfTotalRef.current);
  };
  const tick = () => {
    secondsLeftRef.current = secondsLeftRef.current - 1;
    setSecondsLeft(() => secondsLeftRef.current);

    secondsLeftOfTotalRef.current = secondsLeftOfTotalRef.current - 1;
    setSecondsLeftOfTotal(() => secondsLeftOfTotalRef.current);
  };

  const switchNextAgenda = () => {
    const play = useSound;

    if (timeList.length <= currentIndexRef.current + 1) {
      // 全てのアジェンダが終了したら実行される処理
      setIsEnd(true);
      isWorkingRef.current = false;
      setIsWorking(isWorkingRef.current);

      return;
    }
    currentIndexRef.current = currentIndexRef.current + 1;
    setCurrentIndex(() => currentIndexRef.current);
    secondsLeftRef.current = timeList[currentIndexRef.current] * 60;
    setSecondsLeft(() => secondsLeftRef.current);
  };

  useEffect(() => {
    initTimer();

    const interval = setInterval(() => {
      if (!isWorkingRef.current) {
        return;
      }
      if (secondsLeftRef.current === 0) {
        return switchNextAgenda();
      }

      tick();
    }, 100);
    return () => clearInterval(interval);
  }, [timeList, totalTime]);

  // きれいに表示するために諸々設定
  let percentage = (secondsLeft / (timeList[currentIndex] * 60)) * 100;
  let minute = Math.trunc(secondsLeft / 60);
  let seconds: number | string = secondsLeft % 60;
  if (seconds < 10) seconds = "0" + String(seconds);

  let percentageOfTotal =
    (secondsLeftOfTotalRef.current / (totalTime * 60)) * 100;
  let minuteOfTotal = Math.trunc(secondsLeftOfTotal / 60);
  let secondsOfTotal: number | string = secondsLeftOfTotal % 60;
  if (secondsOfTotal < 10) secondsOfTotal = "0" + String(secondsOfTotal);

  return (
    <div className="App">
      <Circular
        value={percentage}
        text={`${minute}:${seconds}`}
        color="#276749"
      />
      <Circular
        value={percentageOfTotal}
        text={`${minuteOfTotal}:${secondsOfTotal}`}
        color="#ED8936"
      />
      {isEnd ? (
        "end"
      ) : isWorking ? (
        <PrimaryButton onclick={pause} text="pause" />
      ) : (
        <PrimaryButton onclick={start} text="start" />
      )}
    </div>
  );
}
