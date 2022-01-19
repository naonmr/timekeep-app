import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";
import { useEffect } from "react";

type Agenda = {
  title: string;
  time: number;
};

const AgendaList = (props: any) => {
  const { currentAgendas, currentMeetingTitle } = props;

  return (
    <>
      <></>
      <Table variant="simple">
        <TableCaption>{currentMeetingTitle}</TableCaption>
        <Thead>
          <Tr>
            <Th>Agenda Title</Th>
            <Th>time</Th>
          </Tr>
        </Thead>
        <Tbody>
          {currentAgendas.map((agenda: Agenda) => {
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
