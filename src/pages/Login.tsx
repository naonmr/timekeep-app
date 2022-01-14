import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Link, useHistory, withRouter } from "react-router-dom";
import { useAuthContext } from "../firebase/AuthContext";
import firebase from "../firebase/firebaseConfig";

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Box,
  Center,
} from "@chakra-ui/react";
import { useState } from "react";
import { PrimaryButton } from "../component/Button";

const Login = () => {
  const history = useHistory();
  const { setCurrentUser } = useAuthContext();
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    console.log(email.value, password.value);
    const auth = getAuth(firebase);

    try {
      await signInWithEmailAndPassword(auth, email.value, password.value);
      onAuthStateChanged(auth, (user) => setCurrentUser(user));
      history.push("/home");
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return (
    <>
      {/* TODO 左右対称にする */}
      <Center p={3}>
        <Box
          maxW="sm"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          p={2}
        >
          <h1>Login</h1>
          <Center m={4}>
            <form onSubmit={handleSubmit}>
              <FormControl isRequired m={2}>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input name="email" type="email" placeholder="email" />
              </FormControl>
              <FormControl isRequired m={2}>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input name="password" type="password" placeholder="password" />
              </FormControl>
              <PrimaryButton text="Login" type="submit" mt={2} />
            </form>
          </Center>
        </Box>
      </Center>
    </>
  );
};

export default withRouter(Login);
