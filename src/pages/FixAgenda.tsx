import { async } from "@firebase/util";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { json } from "stream/consumers";
import Header from "../component/Header";
import InputAgenda from "../component/InputAgenda";
import { useTimerContext } from "../component/timerContext";
import { useAuthContext } from "../firebase/AuthContext";

type Contents = {
  title: string;
  agendas: {
    title: string;
    time: number;
    meetingId?: any;
  }[];
};

const FixAgenda: any = () => {
  const { currentUser } = useAuthContext();

  const [currentMeetingTitle, setCurrentMeetingTitle] = useState("");
  const [currentAgendas, setCurrentAgendas] = useState([
    { title: "", time: 1 },
  ]);

  const history = useHistory();
  //　paramからmeeeting Idをget

  let params: any = useParams();
  let id: number = params.meetindId;

  useEffect(() => {
    const getAgendaList = async (meetingId: number) => {
      try {
        const res = await axios.get(
          `/api/agendas/${currentUser}?meetingId=${meetingId}`
        );

        const agendas = res.data.agendas.map((agenda: any) => {
          return { title: agenda.title, time: agenda.time };
        });

        setCurrentMeetingTitle(res.data.title);
        setCurrentAgendas(() => agendas);
        console.log(currentMeetingTitle, currentAgendas);
      } catch (error) {
        console.log(error);
      }
    };

    getAgendaList(id);
  }, []);

  // TODO orderを追加
  const onSubmit = async (data: Contents) => {
    console.log(data.agendas);
    const putMeeting = async () => {
      await axios.put(`/api/meetings/${currentUser}?meetingId=${id}`, data);
    };
    putMeeting();
    history.push("/");
  };

  return (
    <>
      <Header />
      <InputAgenda
        defaultAgenda={currentAgendas}
        defaultMtgTitle={currentMeetingTitle}
        onSubmit={onSubmit}
      />
    </>
  );
};

export default FixAgenda;
