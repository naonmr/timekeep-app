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
const SignUp = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();
  const { currentUser, setCurrentUser } = useAuthContext();
  const history = useHistory();

  const [isRegister, setIsRegister] = useState(false);
  const onSubmit = async (data: any) => {
    console.log(data);
    const auth = getAuth(firebase);

    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      onAuthStateChanged(auth, async (user) => {
        setCurrentUser(user?.uid);

        console.log("🌹");
      });
    } catch (error) {
      console.log(String(error));

      if (
        String(error) ===
        "FirebaseError: Firebase: Error (auth/email-already-in-use)."
      ) {
        alert("ご入力いただいたアドレスは既に使用されています");
      }
    }

    console.log(currentUser);
    if (currentUser) {
      const newUser = { uid: currentUser, name: data.userName, meetings: {} };
      axios.post(`/api/user/${currentUser}`, newUser);
      history.push("/is-register");
    }
  };

  return (
    <>
      <Center p={3}>
        <Box
          maxW="sm"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          p={2}
        >
          <h1>SignUp</h1>
          <Center m={5}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl isInvalid={errors.userName} m={2}>
                <FormLabel htmlFor="name">Your Name</FormLabel>
                <Input
                  id="userName"
                  type="text"
                  placeholder="your name"
                  {...register("userName", {
                    required: true,
                  })}
                />
                <FormErrorMessage>
                  {errors.userName && "お名前を入力してください"}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.email} m={2}>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  id="email"
                  // type="email"
                  placeholder="email"
                  {...register("email", {
                    required: true,
                    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i,
                  })}
                />
                <FormErrorMessage>
                  {errors.email && "メールアドレスを正しく入力してください"}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.password} m={2}>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                  id="password"
                  type="password"
                  placeholder="password"
                  {...register("password", {
                    required: "パスワードは6文字以上入力してください",
                    minLength: {
                      value: 6,
                      message: "パスワードは6文字以上入力してください",
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.password && errors.password.message}
                </FormErrorMessage>
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
