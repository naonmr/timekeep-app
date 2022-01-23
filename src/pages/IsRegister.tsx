import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { PrimaryButton } from "../component/Button";
import { useAuthContext } from "../firebase/AuthContext";
import firebase from "../firebase/firebaseConfig";
import { Link, useHistory } from "react-router-dom";

import {
  FormControl,
  FormLabel,
  Input,
  Box,
  Center,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
const IsRegister = () => {
  return (
    <>
      <p>登録が完了しました</p>
      <div>
        ログインは<Link to="/login">こちら</Link>
      </div>
    </>
  );
};

export default IsRegister;
