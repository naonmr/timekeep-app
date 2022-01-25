import { useEffect, useRef, useState } from "react";
import { PrimaryButton, PrimaryButton2 } from "./Button";
import Circular from "./Circular";
import {
  Box,
  Center,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Spacer,
  Switch,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

type TimerProps = {
  currentIndex: number;
  setCurrentIndex: any;
  timeList: number[];
  agendas: any;
  totalTime: number;
};

export default function Timer(props: TimerProps) {
  const history = useHistory();

  const { currentIndex, setCurrentIndex, timeList, totalTime, agendas } = props;
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [secondsLeftOfTotal, setSecondsLeftOfTotal] = useState(totalTime * 60);
  const [isWorking, setIsWorking] = useState(false);
  const [isEnd, setIsEnd] = useState(false);

  const [sound, setSound] = useState(true);

  const isWorkingRef = useRef(isWorking);
  const currentIndexRef = useRef(currentIndex);
  const secondsLeftRef = useRef(secondsLeft);
  const secondsLeftOfTotalRef = useRef(totalTime);
  const soundRef = useRef(sound);

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
    // TODO 音を鳴らす

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
        console.log("🌸", soundRef);
        if (soundRef.current) {
          const audio = new Audio(`${process.env.PUBLIC_URL}/end.mp3`);
          audio.play();
        }

        return switchNextAgenda();
      }

      tick();
    }, 1000);
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
      <Center mt="4" mb="2">
        <VStack>
          <HStack>
            <Text fontSize="sm" w="120px">
              "{agendas[currentIndex].title}" 残り
            </Text>
            <Text fontSize="sm" w="120px">
              会議 残り
            </Text>
          </HStack>

          <Flex>
            <Circular
              value={percentage}
              text={`${minute}:${seconds}`}
              color="#487d9f"
            />

            <Circular
              value={percentageOfTotal}
              text={`${minuteOfTotal}:${secondsOfTotal}`}
              color="#c79139"
            />
          </Flex>
        </VStack>
      </Center>

      {isEnd ? (
        <PrimaryButton2 onclick={() => history.push("")} text="pause" />
      ) : isWorking ? (
        <PrimaryButton onclick={pause} text="pause" />
      ) : (
        <PrimaryButton onclick={start} text="start" />
      )}

      <Center>
        <Box mt="4">
          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="email-alerts" mb="0">
              sound off ⇄ on?
            </FormLabel>
            <Switch
              defaultIsChecked
              id="sound-on-off"
              colorScheme={"telegram"}
              onChange={(e) => {
                console.log("e:", e.target.checked);
                if (e.target.checked === true) {
                  soundRef.current = true;
                  setSound(() => true);
                  console.log(soundRef.current);
                }
                if (e.target.checked === false) {
                  soundRef.current = false;
                  setSound(false);
                }
              }}
            />
          </FormControl>
        </Box>
      </Center>
    </div>
  );
}
