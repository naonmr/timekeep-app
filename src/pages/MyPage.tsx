import { useHistory, Redirect, Link } from "react-router-dom";

import { useAuthContext } from "../firebase/AuthContext";

import Header from "../component/Header";
import MeetingList from "../component/MeetingList";
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

import SetupAgenda from "./SetupAgenda";

const MyPage = () => {
  return (
    <>
      <>
        <Header />
        <br></br>
        <MeetingList />
      </>
    </>
  );
};

export default MyPage;
