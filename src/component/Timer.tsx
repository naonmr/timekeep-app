import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";

import { PrimaryButton, PrimaryButton2 } from "./Button";
import Circular from "./Circular";

import {
  Box,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Switch,
  Text,
  VStack,
} from "@chakra-ui/react";

type TimerProps = {
  currentMeetingTitle: string;
  currentIndex: number;
  setCurrentIndex: any;
  timeList: number[];
  agendas: any;
  totalTime: number;
};

type Agenda = {
  title: string;
  time: number;
};

export default function Timer(props: TimerProps) {
  const history = useHistory();
  const {
    currentMeetingTitle,
    currentIndex,
    setCurrentIndex,
    timeList,
    totalTime,
    agendas,
  } = props;

  // アジェンダタイマーの残り時間state
  const [secondsLeft, setSecondsLeft] = useState<number>(25 * 60);

  // 会議タイマーの残り時間state
  const [secondsLeftOfTotal, setSecondsLeftOfTotal] = useState<number>(
    totalTime * 60
  );

  // アジェンダタイマー・会議タイマー共通のstate
  const [isWorking, setIsWorking] = useState<boolean>(false);
  const [isEnd, setIsEnd] = useState<boolean>(false);
  const [sound, setSound] = useState<boolean>(true);

  // 変更をすぐに反映させるためのRef
  const isWorkingRef = useRef(isWorking);
  const currentIndexRef = useRef(currentIndex);
  const secondsLeftRef = useRef(secondsLeft);
  const secondsLeftOfTotalRef = useRef(totalTime);
  const soundRef = useRef(sound);

  // タイマーをstart/pauseさせるための関数
  const start = () => {
    isWorkingRef.current = true;
    setIsWorking(isWorkingRef.current);
  };
  const pause = () => {
    isWorkingRef.current = false;
    setIsWorking(isWorkingRef.current);
  };

  const initTimer = () => {
    // アジェンダタイマーの時間をset
    secondsLeftRef.current = timeList[currentIndexRef.current] * 60;
    setSecondsLeft(() => secondsLeftRef.current);

    // 会議タイマーの時間をset
    secondsLeftOfTotalRef.current = totalTime * 60;
    setSecondsLeftOfTotal(() => secondsLeftOfTotalRef.current);
  };

  const tick = () => {
    // アジェンダタイマーの時間をset
    secondsLeftRef.current = secondsLeftRef.current - 1;
    setSecondsLeft(() => secondsLeftRef.current);

    // 会議タイマーの時間をset
    secondsLeftOfTotalRef.current = secondsLeftOfTotalRef.current - 1;
    setSecondsLeftOfTotal(() => secondsLeftOfTotalRef.current);
  };

  const switchNextAgenda = () => {
    // 全てのアジェンダが終了したら実行される処理(isEndする処理)
    if (timeList.length <= currentIndexRef.current + 1) {
      setIsEnd(true);
      isWorkingRef.current = false;
      setIsWorking(isWorkingRef.current);
      return;
    }

    // 次のアジェンダtimeをセットする処理
    currentIndexRef.current = currentIndexRef.current + 1;
    setCurrentIndex(() => currentIndexRef.current);
    secondsLeftRef.current = timeList[currentIndexRef.current] * 60;
    setSecondsLeft(() => secondsLeftRef.current);
  };

  useEffect(() => {
    // タイマーの初期化
    initTimer();

    const interval = setInterval(() => {
      if (!isWorkingRef.current) {
        return;
      }

      if (secondsLeftRef.current === 0) {
        //　タイマー終了時に音を鳴らす
        if (soundRef.current) {
          const audio = new Audio(`${process.env.PUBLIC_URL}/end.mp3`);
          audio.play();
        }

        // アジェンダタイマー終了時に、次のアジェンダtimeをセットする or isEndするための関数
        return switchNextAgenda();
      }

      // タイマーを進める関数
      tick();
    }, 1000);
    return () => clearInterval(interval);
  }, [timeList, totalTime]);

  // きれいにcirclerを表示するための設定
  //　アジェンダタイマーの設定
  let percentage = (secondsLeft / (timeList[currentIndex] * 60)) * 100;
  let minute = Math.trunc(secondsLeft / 60);
  let seconds: number | string = secondsLeft % 60;
  if (seconds < 10) seconds = "0" + String(seconds);

  //　会議タイマーの設定
  let percentageOfTotal =
    (secondsLeftOfTotalRef.current / (totalTime * 60)) * 100;
  let minuteOfTotal = Math.trunc(secondsLeftOfTotal / 60);
  let secondsOfTotal: number | string = secondsLeftOfTotal % 60;
  if (secondsOfTotal < 10) secondsOfTotal = "0" + String(secondsOfTotal);

  // 音をONOFF設定関数
  const soundOnOff = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked === true) {
      soundRef.current = true;
      setSound(soundRef.current);
    }
    if (e.target.checked === false) {
      soundRef.current = false;
      setSound(soundRef.current);
    }
  };

  return (
    <Box>
      <Center mt="2" mb="2">
        <Box borderWidth="1px" borderRadius="lg" p={4} m={2} w="md">
          <VStack>
            <Heading fontSize="lg" as="u" wordBreak="break-all">
              {currentMeetingTitle}
            </Heading>
            <HStack spacing="3">
              <Circular
                value={percentage}
                text={`${minute}:${seconds}`}
                color="brand.400"
              />

              <Circular
                value={percentageOfTotal}
                text={`${minuteOfTotal}:${secondsOfTotal}`}
                color="brand.500"
              />
            </HStack>

            <HStack spacing="3">
              <Text fontSize="sm" w="120px">
                {agendas[currentIndex].title}
              </Text>
              <Text fontSize="sm" w="120px">
                全体残り時間
              </Text>
            </HStack>
          </VStack>
        </Box>
      </Center>

      {isEnd ? (
        <PrimaryButton2 onclick={() => history.push("")} text="pause" />
      ) : isWorking ? (
        <PrimaryButton onclick={pause} text="pause" />
      ) : (
        <PrimaryButton onclick={start} text="start" />
      )}

      <Center>
        <Box mt="2" mb="4">
          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="email-alerts" mb="0">
              sound off ⇄ on?
            </FormLabel>
            <Switch
              defaultIsChecked
              id="sound-on-off"
              colorScheme={"telegram"}
              onChange={(e) => soundOnOff(e)}
            />
          </FormControl>
        </Box>
      </Center>
    </Box>
  );
}
