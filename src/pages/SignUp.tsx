import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { PrimaryButton } from "../component/Button";
import { useAuthContext } from "../firebase/AuthContext";
import firebase from "../firebase/firebaseConfig";
import { useHistory } from "react-router-dom";

import { FormControl, FormLabel, Input, Box, Center } from "@chakra-ui/react";
import axios from "axios";
const SignUp = () => {
  const { setCurrentUser } = useAuthContext();
  const history = useHistory();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const { email, password, userName } = event.target.elements;
    const auth = getAuth(firebase);

    await createUserWithEmailAndPassword(auth, email.value, password.value);
    let uid;
    onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user?.uid);

      uid = user?.uid;
      console.log(uid);
      const newUser = { uid: uid, name: userName.value, meetings: {} };
      axios
        .post(`/api/user/${uid}`, newUser)
        .then((res) => {
          history.push("/login");
        })
        .catch((e) => {
          console.error(e);
        });
    });
  };

  return (
    <>
      {/* TODO 左右対称にする */}
      {/* TODO バリデーション */}
      <Center p={3}>
        <Box
          maxW="sm"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          p={2}
        >
          <h1>SignUp</h1>
          <Center m={4}>
            <form onSubmit={handleSubmit}>
              <FormControl isRequired m={2}>
                <FormLabel htmlFor="email">Your Name</FormLabel>
                <Input name="userName" type="text" placeholder="your name" />
              </FormControl>
              <FormControl isRequired m={2}>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input name="email" type="email" placeholder="email" />
              </FormControl>
              <FormControl isRequired m={2}>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input name="password" type="password" placeholder="password" />
              </FormControl>
              <PrimaryButton text="Sign Up" type="submit" mt={2} />
            </form>
          </Center>
        </Box>
      </Center>
    </>
  );
};

export default SignUp;
