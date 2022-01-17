import React, { useEffect, useRef, useState } from "react";

type TimerProps = {
  currentIndex: number;
  setCurrentIndex: any;
  timeList: number[];
};

export default function Timer(props: TimerProps) {
  const { currentIndex, setCurrentIndex, timeList } = props;
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
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <h1>Pomodoro Timer</h1>
      <button onClick={start}>start</button>
      <button onClick={pause}>pause</button>
      <div>{secondsLeft} seconds left</div>
    </div>
  );
}
