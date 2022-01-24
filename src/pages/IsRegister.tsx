import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { PrimaryButton } from "../component/Button";
import { useAuthContext } from "../firebase/AuthContext";
import firebase from "../firebase/firebaseConfig";
import { useHistory } from "react-router-dom";

import {
  FormControl,
  FormLabel,
  Input,
  Box,
  Center,
  FormErrorMessage,
  Text,
  Link,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
const IsRegister = () => {
  return (
    <>
      <Box mt={2}>
        <Text>登録が完了しました</Text>
        <Box mt={2}>
          <Link href="/login" fontSize="sm">
            ログインはこちら
            <ExternalLinkIcon mx="2px" />
          </Link>
        </Box>
      </Box>
    </>
  );
};

export default IsRegister;
