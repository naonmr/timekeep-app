import { useHistory, Redirect } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import firebase from "../firebase/firebaseConfig";
import { useAuthContext } from "../firebase/AuthContext";

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

type data = {
  No: number;
  meetingTitle: string;
};

const MeetingList = () => {
  const datas = [
    { No: 1, meetingTitle: "example1" },
    { No: 2, meetingTitle: "example2" },
    { No: 3, meetingTitle: "example3" },
  ];

  const [meetingList, setMeetindList] = useState<any>([]);

  return (
    <>
      <h1>Meeting Lists</h1>

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
              <Tr>
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

export default MeetingList;
