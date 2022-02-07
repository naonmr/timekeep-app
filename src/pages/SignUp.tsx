import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import axios from "axios";

import firebase from "../firebase/firebaseConfig";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

import { PrimaryButton } from "../component/Button";
import { useAuthContext } from "../firebase/AuthContext";

import {
  FormControl,
  FormLabel,
  Input,
  Box,
  Center,
  FormErrorMessage,
  Link,
  Heading,
} from "@chakra-ui/react";

import { ExternalLinkIcon } from "@chakra-ui/icons";

const SignUp = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const { currentUser, setCurrentUser } = useAuthContext();
  const history = useHistory();

  const onSubmit = async (data: any) => {
    const auth = getAuth(firebase);

    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      await onAuthStateChanged(auth, async (user) => {
        if (user) {
          setCurrentUser(user?.uid);
          const newUser = {
            uid: user?.uid,
            name: data.userName,
            meetings: {},
          };
          const res = await axios.post(`/api/users/${user?.uid}`, newUser);
          if (res.status === 200) {
            history.push("/is-register");
          }
        }
      });
    } catch (error) {
      // バリデーション
      if (
        String(error) ===
        "FirebaseError: Firebase: Error (auth/email-already-in-use)."
      ) {
        alert("ご入力いただいたアドレスは既に使用されています");
      }
    }
  };

  useEffect(() => {
    if (currentUser) {
      history.push("/mypage");
    }
  }, [currentUser]);

  return (
    <>
      <Center p={3}>
        <Box borderWidth="1px" borderRadius="lg" p={4} m={2} w="xl">
          <Heading as="h3" size="lg">
            SignUp
          </Heading>
          <Center m={4}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl isInvalid={errors.userName} mt={2}>
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
              <FormControl isInvalid={errors.email} mt={2}>
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

              <FormControl isInvalid={errors.password} mt={2}>
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
              <PrimaryButton text="Signup" type="submit" mt={3} />
            </form>
          </Center>
          <Box mt={2}>
            <Link href="/login" fontSize="sm">
              ログイン
              <ExternalLinkIcon mx="2px" />
            </Link>
          </Box>
        </Box>
      </Center>
    </>
  );
};

export default SignUp;
