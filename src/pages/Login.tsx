import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Link, useHistory, withRouter } from "react-router-dom";
import { useAuthContext } from "../firebase/AuthContext";
import firebase from "../firebase/firebaseConfig";

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
      <h1>Login</h1>
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
          <button>ログイン</button>
        </div>
        <div>
          ユーザー登録は<Link to={"/signup"}>こちら</Link>から
        </div>
      </form>
    </>
  );
};

export default withRouter(Login);
