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
  const { agendas, currentMeetingTitle } = props;

  return (
    <>
      <></>
      <Table variant="simple" size="sm">
        <TableCaption>{currentMeetingTitle}</TableCaption>
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
