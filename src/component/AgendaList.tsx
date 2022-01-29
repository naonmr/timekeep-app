import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Center,
} from "@chakra-ui/react";

type Agenda = {
  title: string;
  time: number;
};

type AgendaListProps = {
  agendas: any;
  currentMeetingTitle: String;
};

const AgendaList = (props: AgendaListProps) => {
  const { agendas, currentMeetingTitle } = props;

  return (
    <>
      <></>
      <Center>
        <Table variant="simple" size="sm" w="80%" minW="80%">
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
      </Center>
    </>
  );
};

export default AgendaList;
