import { useHistory, withRouter } from "react-router-dom";
import axios from "axios";

import { useAuthContext } from "../firebase/AuthContext";

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

const SetupAgenda = () => {
  const { currentUser } = useAuthContext();
  let history = useHistory();

  //　空のデフォルト値を用意
  const defaultAgenda = [{ title: "", time: 1 }];
  const defaultMtgTitle = "";

  const onSubmit = async (data: MeetingContents) => {
    console.log(data);
    await axios.post(`/api/meetings/${currentUser}`, data);
    history.push("/mypage");
  };
  return (
    <>
      <Header />
      <br></br>
      <InputAgenda
        defaultAgenda={defaultAgenda}
        defaultMtgTitle={defaultMtgTitle}
        onSubmit={onSubmit}
      />
    </>
  );
};

export default withRouter(SetupAgenda);
