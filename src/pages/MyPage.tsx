import Header from "../component/Header";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { PrimaryButton, PrimaryButton2, SubButton } from "../component/Button";
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
  HStack,
  Center,
  Spacer,
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
      <Box w="100%">
        <Header />
        <br></br>

        <Center>
          <Box w="80%" minW="80%" box-sizing="border-box">
            <Table variant="simple" size="sm" w="100%" box-sizing="border-box">
              <TableCaption>Your Meeting is here</TableCaption>
              <Thead>
                <Tr>
                  <Th>Meeting Title</Th>
                  <Th w="5%"> </Th>
                  <Th w="10%" isNumeric>
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
                          <PrimaryButton2
                            text="Start"
                            onclick={async () => {
                              history.push(`/timer/${meeting.id}`);
                            }}
                          />
                        </Td>

                        <Td>
                          <HStack float="right">
                            <SubButton
                              text="Fix"
                              onclick={async () => {
                                history.push(`/fix-agenda/${meeting.id}`);
                              }}
                            />
                            <SubButton
                              text="Delete"
                              onclick={() => deleteMeeting(meeting.id)}
                            />
                          </HStack>
                        </Td>
                      </Tr>
                    );
                  })}
              </Tbody>
            </Table>
          </Box>
        </Center>
      </Box>
    </>
  );
};

export default MyPage;
