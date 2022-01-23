import React, { useEffect, useRef, useState } from "react";
import AgendaList from "./AgendaList";
import { PrimaryButton } from "./Button";
import Circular from "./Circular";

type TimerProps = {
  currentIndex: number;
  setCurrentIndex: any;
  timeList: number[];
  agendas?: any;
};

export default function Timer(props: TimerProps) {
  const { currentIndex, setCurrentIndex, timeList, agendas } = props;
  console.log("☀️", timeList, currentIndex);
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isWorking, setIsWorking] = useState(false);

  const isWorkingRef = useRef(isWorking);
  const currentIndexRef = useRef(currentIndex);
  const secondsLeftRef = useRef(secondsLeft);

  const start = () => {
    isWorkingRef.current = true;
    setIsWorking(() => true);
    console.log(isWorking);
  };
  const pause = () => {
    isWorkingRef.current = false;
    setIsWorking(() => false);
    console.log(isWorking);
  };

  const initTimer = () => {
    secondsLeftRef.current = timeList[currentIndexRef.current] * 60;
    setSecondsLeft(() => secondsLeftRef.current);
    console.log("initTimer");
  };
  const tick = () => {
    secondsLeftRef.current = secondsLeftRef.current - 1;
    setSecondsLeft(() => secondsLeftRef.current);
    console.log("tick", secondsLeftRef.current, secondsLeft);
  };

  const switchNextAgenda = () => {
    console.log("🌸", timeList.length, currentIndexRef.current + 1);
    if (timeList.length <= currentIndexRef.current + 1) {
      // 全てのアジェンダが終了したら実行される処理
      console.log("next");

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
    }, 1000);
    return () => clearInterval(interval);
  }, [timeList]);

  // きれいに表示するために諸々設定
  let percentage = (secondsLeft / (timeList[currentIndex] * 60)) * 100;
  let minute = Math.trunc(secondsLeft / 60);
  let seconds: number | string = secondsLeft % 60;
  if (seconds < 10) seconds = "0" + String(seconds);

  return (
    <div className="App">
      {/* <div>{agendas[currentIndex].agenda}</div> */}
      <Circular
        value={percentage}
        text={`${minute}:${seconds}`}
        color="#E53E3E"
      />
      {isWorking ? (
        <PrimaryButton onclick={pause} text="pause" />
      ) : (
        <PrimaryButton onclick={start} text="start" />
      )}
    </div>
  );
}
