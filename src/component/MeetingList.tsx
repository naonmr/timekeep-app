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

  return (
    <>
      {meetings.map((meeting: Meetings) => {
        return (
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
        );
      })}
    </>
  );
};

export default Meetinglist;
