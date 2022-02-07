import { useHistory, withRouter } from "react-router-dom";
import { useForm } from "react-hook-form";

import firebase from "../firebase/firebaseConfig";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useAuthContext } from "../firebase/AuthContext";

import { PrimaryButton } from "../component/Button";

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
import { useEffect } from "react";

const Login = () => {
  const { currentUser, setCurrentUser } = useAuthContext();
  const history = useHistory();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    const auth = getAuth(firebase);

    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      await onAuthStateChanged(auth, (user) => setCurrentUser(user?.uid));
      history.push("/mypage");
    } catch (error) {
      // バリデーション
      console.log(String(error));
      if (
        String(error) ===
          "FirebaseError: Firebase: Error (auth/missing-email)." ||
        String(error) ===
          "FirebaseError: Firebase: Error (auth/wrong-password)."
      ) {
        alert("ご入力いただいたメールアドレスまたはパスワードは間違っています");
      }
      if (
        String(error) ===
        "FirebaseError: Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests)."
      ) {
        alert("しばらく経ってからログインしてください。");
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
            Login
          </Heading>
          <Center m={4}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl isInvalid={errors.email}>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="email"
                  {...register("email", {
                    required: true,
                  })}
                />
                <FormErrorMessage>
                  {errors.email && "メールアドレスを入力してください"}
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
                  })}
                />
                <FormErrorMessage>
                  {errors.password && "パスワードを入力してください"}
                </FormErrorMessage>
              </FormControl>
              <PrimaryButton text="Login" type="submit" mt={3} />
            </form>
          </Center>
          <Box mt={2}>
            <Link href="/signup" fontSize="sm">
              アカウント登録
              <ExternalLinkIcon mx="2px" />
            </Link>
          </Box>
        </Box>
      </Center>
    </>
  );
};

export default Login;
