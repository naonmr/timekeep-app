import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { PrimaryButton } from "../component/Button";
import { useAuthContext } from "../firebase/AuthContext";
import firebase from "../firebase/firebaseConfig";
import { Link } from "react-router-dom";

const SignUp = () => {
  const { currentUser, setCurrentUser } = useAuthContext();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    const auth = getAuth(firebase);

    try {
      await createUserWithEmailAndPassword(auth, email.value, password.value);
      onAuthStateChanged(auth, (user) => {
        setCurrentUser(user);
      });
    } catch (error) {
      alert(error);
    }
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
