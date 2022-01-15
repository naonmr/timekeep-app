import { useHistory, Redirect } from "react-router-dom";

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
import { useEffect } from "react";
// import { TimerProvider } from "../component/timerContext";
const MyPage = () => {
  const history = useHistory();
  const { currentUser } = useAuthContext();

  const datas = [
    { No: 1, meetingTitle: "example1" },
    { No: 2, meetingTitle: "example2" },
    { No: 3, meetingTitle: "example3" },
  ];

  // useEffect(async() => {
  //   await

  // }, []);

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
          {datas.map((data) => {
            return (
              <Tr key={data.No}>
                <Td>{data.meetingTitle}</Td>
                <Td>
                  <Button>Fix</Button>
                </Td>
                <Td>
                  <Button>Start</Button>
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
