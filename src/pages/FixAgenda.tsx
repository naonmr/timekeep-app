import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
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
const FixAgenda = () => {
  const { currentUser } = useAuthContext();
  const { meetingId, agendas, mtgTitle } = useTimerContext();

  const history = useHistory();

  const onSubmit = async (data: Contents) => {
    const agendas = data.agendas.map((agenda) => {
      agenda.meetingId = meetingId;
      return agenda;
    });

    const newMeeting: any = {
      title: data.title,
      authorId: currentUser?.uid,
      agendas: agendas,
    };

    console.log(newMeeting);
    // putの処理をする
    await axios.put(
      `/api/meetings/${currentUser?.uid}?meetingId=${meetingId}`,
      newMeeting
    );
    // TODO historyが遷移しない問題を解決する
    history.push("/mypage");
    console.log("tesuto");
  };

  return (
    <>
      <Header />
      <InputAgenda
        defaultAgenda={agendas}
        defaultMtgTitle={mtgTitle}
        onSubmit={onSubmit}
      />
    </>
  );
};

export default FixAgenda;
