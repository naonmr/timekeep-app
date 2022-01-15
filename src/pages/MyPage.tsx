import { useHistory, Redirect, Link } from "react-router-dom";

import { getAuth } from "firebase/auth";
import firebase from "../firebase/firebaseConfig";
import { useAuthContext } from "../firebase/AuthContext";

import MeetingList from "../component/MeetingList";
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
import { SubButton } from "../component/Button";
// import { TimerProvider } from "../component/timerContext";
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

  useEffect(() => {
    const fetch = async function () {
      const res = await axios.get(`/meetig/${currentUser?.uid}`);

      try {
        setMeetings(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
    console.log(meetings);
  }, []);

  return (
    <>
      <Header />
      <Table variant="simple">
        <TableCaption>Your Meeting is here</TableCaption>
        <Thead>
          <Tr>
            <Th>Meeting Title</Th>
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
                    onclick={() => history.push("/agenda")}
                  />
                </Td>
                <Td>
                  <SubButton text="Start" />
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
