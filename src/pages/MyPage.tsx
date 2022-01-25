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
  Box,
} from "@chakra-ui/react";
import { useAuthContext } from "../firebase/AuthContext";

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
  const [meetings, setMeetings] = useState<Meetings[] | null>(null);
  const { currentUser } = useAuthContext();
  const history = useHistory();

  const getMeetingList = async () => {
    try {
      const res = await axios.get(`/api/meetings/${currentUser}`);
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
      await axios.delete(`/api/meetings/${currentUser}?meetingId=${id}`);
      await getMeetingList();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Box>
        <Header />
        <br></br>
        <Table variant="simple" size="sm">
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
            {!(meetings === null) &&
              meetings.map((meeting: Meetings) => {
                return (
                  <Tr key={meeting.id}>
                    <Td>{meeting.title}</Td>
                    <Td>
                      <SubButton
                        text="Start"
                        onclick={async () => {
                          history.push(`/timer/${meeting.id}`);
                        }}
                      />
                    </Td>

                    <Td>
                      <SubButton
                        text="Fix"
                        onclick={async () => {
                          // await getAgendaList(meeting.id);
                          history.push(`/fix-agenda/${meeting.id}`);
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
      </Box>
    </>
  );
};

export default MyPage;
