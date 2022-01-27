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

type Meetings = {
  authorId: string;
  id: number;
  title: string;
};

const Meetinglist = (props: any) => {
  const { meetings } = props;
  const history = useHistory();

  return (
    <>
      {meetings.map((meeting: Meetings) => {
        return (
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
              <Tr key={meeting.id}>
                <Td>{meeting.title}</Td>
                <Td>
                  <PrimaryButton2
                    text="Start"
                    // onclick={async () => {
                    //   history.push(`/timer/${meeting.id}`);
                    // }}
                  />
                </Td>

                <Td>
                  <HStack float="right">
                    <SubButton
                      text="Fix"
                      // onclick={async () => {
                      //   history.push(`/fix-agenda/${meeting.id}`);
                      // }}
                    />
                    <SubButton
                      text="Delete"
                      // onclick={() => deleteMeeting(meeting.id)}
                    />
                  </HStack>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        );
      })}
    </>
  );
};

export default Meetinglist;
