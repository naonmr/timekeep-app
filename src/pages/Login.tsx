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
  Input,
  Box,
  Center,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import { PrimaryButton } from "../component/Button";

const Login = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const history = useHistory();
  const { setCurrentUser } = useAuthContext();
  const onSubmit = async (data: any) => {
    console.log(data);
    const auth = getAuth(firebase);

    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      onAuthStateChanged(auth, (user) => setCurrentUser(user?.uid));
      history.push("/");
    } catch (error) {
      if (
        String(error) === "FirebaseError: Firebase: Error (auth/missing-email)."
      ) {
        alert("ご入力いただいたアドレスまたはパスワードは間違っています");
      }
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl isInvalid={errors.email} m={2}>
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
              <FormControl isInvalid={errors.password} m={2}>
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
              <PrimaryButton text="Login" type="submit" mt={2} />
            </form>
          </Center>
          <div>
            アカウント登録は<Link to="/signup">こちら</Link>
          </div>
        </Box>
      </Center>
    </>
  );
};

export default withRouter(Login);
