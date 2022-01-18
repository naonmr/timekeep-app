import axios from "axios";
import { useHistory } from "react-router-dom";
import Header from "../component/Header";
import InputAgenda from "../component/InputAgenda";
import { useAuthContext } from "../firebase/AuthContext";

type Contents = {
  title: string;
  agendas: {
    title: string;
    time: number;
  }[];
};

const SetupAgenda = () => {
  const { currentUser } = useAuthContext();
  const history = useHistory();

  const defaultAgenda = [{ title: "", time: 1 }];
  const defaultMtgTitle = "";

  const onSubmit = async (data: Contents) => {
    let newMeeting: any = {
      title: data.title,
      authorId: currentUser,
      agendas: {
        create: data.agendas,
      },
    };
    await axios.post(`/api/meetings/${currentUser}`, newMeeting);

    history.push("/mypage");
  };
  return (
    <>
      <Header />
      <InputAgenda
        defaultAgenda={defaultAgenda}
        defaultMtgTitle={defaultMtgTitle}
        onSubmit={onSubmit}
      />
    </>
  );
};

export default SetupAgenda;
