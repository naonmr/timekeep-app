import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Header from "../component/Header";
import InputAgenda from "../component/InputAgenda";
import { useTimerContext } from "../component/timerContext";
import { useAuthContext } from "../firebase/AuthContext";

type Contents = {
  title: string;
  agendas: {
    title: string;
    time: number;
    meetingId?: number;
  }[];
};

const FixAgenda: any = () => {
  const { currentUser } = useAuthContext();

  const [currentMeetingTitle, setCurrentMeetingTitle] = useState("");
  const [currentAgendas, setCurrentAgendas] = useState([
    { title: "", time: 1 },
  ]);

  const history = useHistory();
  const currentMeetingTitleRef = useRef("");
  const currentAgendasRef = useRef([{ title: "", time: 1 }]);
  //　paramからmeeeting Idをget

  let params: any = useParams();
  let meetingId: string = params.meetindId;

  useEffect(() => {
    const getAgendaList = async (meetingId: string) => {
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

    getAgendaList(meetingId);
  }, []);

  const onSubmit = async (data: Contents) => {
    const agendas = data.agendas.map((agenda) => {
      // agenda.meetingId = id;
      return agenda;
    });

    const newMeeting: any = {
      title: data.title,
      authorId: currentUser,
      agendas: agendas,
    };

    history.push("/");
    await axios.put(
      `/api/meetings/${currentUser}?meetingId=${meetingId}`,
      newMeeting
    );
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
