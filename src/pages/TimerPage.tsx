import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useAuthContext } from "../firebase/AuthContext";
import axios from "axios";

import AgendaList from "../component/AgendaList";
import Header from "../component/Header";
import Timer from "../component/Timer";

import { Box, Text } from "@chakra-ui/react";

type Agenda = {
  title: string;
  time: number;
};

const TimerPage = () => {
  const { currentUser } = useAuthContext();
  const history = useHistory();

  const [currentMeetingTitle, setCurrentMeetingTitle] = useState<String>("");
  const [agendas, setAgendas] = useState<Agenda[]>([{ title: "", time: 1 }]);
  const [timeList, setTimeList] = useState<number[]>([]);
  const [totalTime, setTotaltime] = useState<number>(0);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // paramsを取得
  let params: any = useParams();
  let meetingId: string = params.meetindId;

  const pickupNecessaryAgendaInfo = (data: any) => {
    return data.agendas.map((agenda: Agenda) => {
      return { title: agenda.title, time: agenda.time };
    });
  };

  const getTimeList = (agendas: Agenda[]) => {
    return agendas.map((agenda: Agenda) => {
      return agenda.time;
    });
  };

  const getAgendaList = async (meetingId: string) => {
    try {
      const res = await axios.get(
        `/api/agendas/${currentUser}?meetingId=${meetingId}`
      );

      // アジェンダから必要な情報のみ取得(orderを削除)
      const agendas = pickupNecessaryAgendaInfo(res.data);

      // アジェンダからtimeの情報飲み取得
      const newTimeList = getTimeList(agendas);

      // アジェンダのtime合計値を算出
      const add = (previousValue: number, currentValue: number) =>
        previousValue + currentValue;
      const NewTotalTime = newTimeList.reduce(add, 0);

      // stateに値をset
      setCurrentMeetingTitle(res.data.title);
      setAgendas(agendas);
      setTimeList(newTimeList);
      setTotaltime(NewTotalTime);
    } catch (error) {
      console.log(error);
      history.push("/mypage");
    }
  };

  useEffect(() => {
    getAgendaList(meetingId);
  }, []);

  return (
    <>
      <Header />
      <Box mt="4">
        <Text fontSize="lg" as="u">
          {currentMeetingTitle}
        </Text>
        <Timer
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          timeList={timeList}
          agendas={agendas}
          totalTime={totalTime}
        />
        <AgendaList
          agendas={agendas}
          currentMeetingTitle={currentMeetingTitle}
        />
      </Box>
    </>
  );
};

export default TimerPage;
