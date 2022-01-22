import axios from "axios";
import { useHistory, withRouter } from "react-router-dom";
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
  let history = useHistory();

  const defaultAgenda = [{ title: "", time: 1 }];
  const defaultMtgTitle = "";
  //　TODO orderを追加
  const onSubmit = async (data: Contents) => {
    let newMeeting: any = {
      title: data.title,
      author: {
        connect: {
          uid: currentUser,
        },
      },
      agendas: {
        create: data.agendas,
      },
    };
    console.log("sendData", newMeeting);
    await axios.post(`/api/meetings/${currentUser}`, newMeeting);
    history.push("/");
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

export default withRouter(SetupAgenda);
