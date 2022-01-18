import Header from "../component/Header";
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
import { useTimerContext } from "../component/timerContext";

type MyPageProps = {
  meetingId?: number | undefined;
  setMeetingId?: any;
};

type Meetings = {
  authorId: string;
  id: number;
  title: string;
};

const MyPage = (props: MyPageProps) => {
  const { setMeetingId, setMtgTitle, setAgendas } = useTimerContext();

  const [meetings, setMeetings] = useState<Meetings[] | []>([
    { authorId: "", id: 1, title: "" },
  ]);
  const { currentUser } = useAuthContext();
  const history = useHistory();

  const getMeetingList = async () => {
    try {
      console.log("currentUser", currentUser);
      const res = await axios.get(`/api/meetings/${currentUser}`);
      await setMeetings(res.data);
      console.log("res.data", res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("useEfect meetingList");
    getMeetingList();
    console.log(meetings);
  }, []);

  const deleteMeeting = async (id: number) => {
    try {
      await axios.delete(`/api/meetings/${currentUser}?meetingId=${id}`);
      await getMeetingList();
    } catch (error) {
      console.log(error);
    }
  };

  const getAgendaList = async (meetingId: number) => {
    setMeetingId(meetingId);
    console.log(meetingId);
    try {
      const res = await axios.get(
        `/api/agendas/${currentUser}?meetingId=${meetingId}`
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
      <Header />
      <br></br>
      {/* <MeetingList /> */}
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
                  onclick={() => history.push("/setup-agenda")}
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
                        history.push("/fix-agenda");
                      }}
                    />
                  </Td>
                  <Td>
                    <SubButton
                      text="Start"
                      onclick={async () => {
                        // await getAgendaList(meeting.id);
                        setMeetingId(meeting.id);
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
    </>
  );
};

export default MyPage;
