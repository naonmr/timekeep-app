import { useHistory, Redirect, Link } from "react-router-dom";

import { useAuthContext } from "../firebase/AuthContext";

import Header from "../component/Header";

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { PrimaryButton, SubButton } from "../component/Button";

type Meetings = {
  authorId: string;
  id: number;
  title: string;
};

const MyPage = () => {
  const history = useHistory();
  const { currentUser } = useAuthContext();
  const [meetings, setMeetings] = useState<Meetings[]>([
    { authorId: "", id: 1, title: "" },
  ]);

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

    console.log(meetings);
  }, []);

  const deleteMeeting = async (id: number) => {
    try {
      await axios.delete(`/api/meetings/${currentUser?.uid}?meetingId=${id}`);
      await getMeetingList();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      <br></br>
      <PrimaryButton text="new" onclick={() => history.push("/agenda")} />
      <Table variant="simple">
        <TableCaption>Your Meeting is here</TableCaption>
        <Thead>
          <Tr>
            <Th>Meeting Title</Th>
            <Th> </Th>
            <Th> </Th>
            <Th> </Th>
          </Tr>
        </Thead>
        <Tbody>
          {meetings.map((meeting) => {
            return (
              <Tr key={meeting.id}>
                <Td>{meeting.title}</Td>
                <Td>
                  <SubButton
                    text="Fix"
                    // onclick={() => history.push("/agenda")}
                  />
                </Td>
                <Td>
                  <SubButton text="Start" />
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

export default MyPage;
