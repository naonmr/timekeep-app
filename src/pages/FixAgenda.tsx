import { useEffect, useState } from "react";

import { useHistory, useParams } from "react-router-dom";
import { useAuthContext } from "../firebase/AuthContext";
import axios from "axios";

import Header from "../component/Header";
import InputAgenda from "../component/InputAgenda";

type Agenda = {
  title: string;
  time: number;
};

type MeetingContents = {
  title: string;
  agendas: Agenda[];
};

const FixAgenda = () => {
  const { currentUser } = useAuthContext();

  const [currentMeetingTitle, setCurrentMeetingTitle] = useState<string>("");
  const [currentAgendas, setCurrentAgendas] = useState<Agenda[]>([
    { title: "", time: 1 },
  ]);

  const history = useHistory();

  //　paramからmeeting Idをget
  const params: any = useParams();
  const id: number = params.meetingId;

  useEffect(() => {
    const getAgendaList = async (meetingId: number) => {
      try {
        const res = await axios.get(
          `/api/agendas/${currentUser}?meetingId=${meetingId}`
        );

        if (res.status === 200) {
          const agendas = res.data.agendas.map((agenda: Agenda) => {
            return { title: agenda.title, time: agenda.time };
          });

          setCurrentMeetingTitle(res.data.title);
          setCurrentAgendas(() => agendas);
        }
      } catch (error) {
        console.log(error);

        history.push("/mypage");
      }
    };

    getAgendaList(id);
  }, []);

  const putMeeting = async (data: MeetingContents) => {
    await axios.put(`/api/meetings/${currentUser}?meetingId=${id}`, data);
  };

  const onSubmit = async (data: MeetingContents) => {
    await putMeeting(data);
    history.push("/mypage");
  };

  return (
    <>
      <Header />
      <br></br>
      <InputAgenda
        defaultAgenda={currentAgendas}
        defaultMtgTitle={currentMeetingTitle}
        onSubmit={onSubmit}
      />
    </>
  );
};

export default FixAgenda;
