import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { PrimaryButton, SubButton } from "../component/Button";
import axios from "axios";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";
import { useAuthContext } from "../firebase/AuthContext";
import { useTimerContext } from "./timerContext";
import { async } from "@firebase/util";

type Agenda = {
  title: string;
  time: number;
};

const AgendaList = (props: any) => {
  const { currentUser } = useAuthContext();
  const { agendas, meetingId, setAgendas } = props;
  const { mtgTitle, setMtgTitle } = useTimerContext();
  console.log(agendas);

  // useEffect(() => {
  //   const getAgendaList = async (meetingId: number) => {
  //     try {
  //       const res = await axios.get(
  //         `/api/agendas/${currentUser}?meetingId=${meetingId}`
  //       );
  //       console.log("res", res);

  //       const agendas = res.data.agendas.map((agenda: any) => {
  //         return { title: agenda.title, time: agenda.time };
  //       });

  //       setMtgTitle(res.data.title);
  //       setAgendas(agendas);
  //       console.log(agendas);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //     getAgendaList(meetingId);
  //   };
  // }, []);

  return (
    <>
      <></>
      <Table variant="simple">
        <TableCaption>{mtgTitle}</TableCaption>
        <Thead>
          <Tr>
            <Th>Agenda Title</Th>
            <Th>time</Th>
          </Tr>
        </Thead>
        <Tbody>
          {agendas.map((agenda: Agenda) => {
            return (
              <Tr key={agenda.title}>
                <Td>{agenda.title}</Td>
                <Td>{agenda.time}min</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </>
  );
};

export default AgendaList;
