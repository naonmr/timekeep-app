import { useTimerContext } from "../component/timerContext";
import { useEffect, useRef } from "react";
import { cookieStorageManager } from "@chakra-ui/react";

import Timer from "../component/Timer";
// TODO: timer関数を修正
const TimerPage = () => {
  return (
    <>
      <Timer />
    </>
  );
};

export default TimerPage;
