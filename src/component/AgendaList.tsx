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

const AgendaList = () => {
  const { mtgTitle, agendas } = useTimerContext();

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
                <Td>{agenda.time}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </>
  );
};

export default AgendaList;
