import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { PrimaryButton } from "../component/Button";
import { useAuthContext } from "../firebase/AuthContext";
import firebase from "../firebase/firebaseConfig";
import { Link } from "react-router-dom";

const SignUp = () => {
  const { currentUser } = useAuthContext();

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    console.log(email.value, password.value);
    const auth = getAuth(firebase);

    createUserWithEmailAndPassword(auth, email.value, password.value)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        // TODO : エラーコードを表示
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <>
      <h1>SignUp {console.log("今ログインしてるのは", currentUser)}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>メールアドレス</label>
          <input name="email" type="email" placeholder="email" />
        </div>
        <div>
          <label>パスワード</label>
          <input name="password" type="password" placeholder="password" />
        </div>
        <div>
          <PrimaryButton text="SIGN UP" onclick={() => handleSubmit} />
        </div>
        <div>
          <Link to={"/login"}>Login</Link>
        </div>
      </form>
    </>
  );
};

export default SignUp;
