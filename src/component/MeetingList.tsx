import { useHistory, Redirect } from "react-router-dom";
import { useContext } from "react";
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

const MeetingList = () => {
  const data = [{ No: 1, meetingTitle: "example" }];

  return (
    <>
      <h1>Meeting Lists</h1>

      <Table variant="simple">
        <TableCaption>Your Meeting is here</TableCaption>
        <Thead>
          <Tr>
            <Th>No</Th>
            <Th>Meeting Title</Th>
            <Th> </Th>
            <Th> </Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>inches</Td>
            <Td>millimetres (mm)</Td>
            <Td>
              <Button>Fix</Button>
            </Td>
            <Td>
              <Button>Start</Button>
            </Td>
          </Tr>
          <Tr>
            <Td>feet</Td>
            <Td>centimetres (cm)</Td>
            <Td>
              <Button>Fix</Button>
            </Td>
            <Td>
              <Button>Start</Button>
            </Td>
          </Tr>
          <Tr>
            <Td>yards</Td>
            <Td>metres (m)</Td>
            <Td>
              <Button>Fix</Button>
            </Td>
            <Td>
              <Button>Start</Button>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </>
  );
};

export default MeetingList;
