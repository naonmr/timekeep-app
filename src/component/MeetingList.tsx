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

type Meetings = {
  authorId: string;
  id: number;
  title: string;
};

const MeetingList = () => {
  const { setMtgTitle, setAgendas, setMtgTotalTime, setMeetingId } =
    useTimerContext();

  const [meetings, setMeetings] = useState<Meetings[] | []>([
    { authorId: "", id: 1, title: "" },
  ]);
  const { currentUser } = useAuthContext();
  const history = useHistory();

  const getMeetingList = async () => {
    try {
      const res = await axios.get(`/api/meetings/${currentUser?.uid}`);
      await setMeetings(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMeetingList();
  }, []);

  const deleteMeeting = async (id: number) => {
    try {
      await axios.delete(`/api/meetings/${currentUser?.uid}?meetingId=${id}`);
      await getMeetingList();
    } catch (error) {
      console.log(error);
    }
  };

  const getAgendaList = async (meetingId: number) => {
    setMeetingId(meetingId);
    try {
      const res = await axios.get(
        `/api/agendas/${currentUser?.uid}?meetingId=${meetingId}`
      );

      const agendas = res.data.agendas.map((agenda: any) => {
        return { title: agenda.title, time: agenda.time };
      });

      setMtgTitle(res.data.title);
      setAgendas(agendas);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Table variant="simple">
        <TableCaption>Your Meeting is here</TableCaption>
        <Thead>
          <Tr>
            <Th>Meeting Title</Th>
            <Th> </Th>
            <Th> </Th>
            <Th>
              <PrimaryButton
                text="new"
                onclick={() => history.push("/setup/agenda")}
              />
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {meetings.map((meeting: Meetings) => {
            return (
              <Tr key={meeting.id}>
                <Td>{meeting.title}</Td>
                <Td>
                  <SubButton
                    text="Fix"
                    onclick={async () => {
                      await getAgendaList(meeting.id);
                      history.push("/fix/agenda");
                    }}
                  />
                </Td>
                <Td>
                  <SubButton
                    text="Start"
                    onclick={async () => {
                      await getAgendaList(meeting.id);
                      history.push("/timer");
                    }}
                  />
                </Td>
                <Td>
                  <SubButton
                    text="Delete"
                    onclick={() => deleteMeeting(meeting.id)}
                  />
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </>
  );
};

export default MeetingList;
