import { Box, Center } from "@chakra-ui/react";
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
  const onSubmit = async (data: Contents) => {
    await axios.post(`/api/meetings/${currentUser}`, data);
    history.push("/");
  };
  return (
    <>
      <Header />
      <Box>
        <InputAgenda
          defaultAgenda={defaultAgenda}
          defaultMtgTitle={defaultMtgTitle}
          onSubmit={onSubmit}
        />
      </Box>
    </>
  );
};

export default withRouter(SetupAgenda);
