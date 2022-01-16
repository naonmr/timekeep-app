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
const SignUp = () => {
  const { setCurrentUser } = useAuthContext();
  const history = useHistory();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    const auth = getAuth(firebase);

    try {
      await createUserWithEmailAndPassword(auth, email.value, password.value);
      onAuthStateChanged(auth, (user) => {
        setCurrentUser(user);
      });
      history.push("/login");
    } catch (error) {
      console.log(error);
    }
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
