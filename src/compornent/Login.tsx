import { auth } from "../firebaseConfig";
import { Link } from "react-router-dom";

const Home = () => {
  const handleSubmit = (event: any) => {
    event.preventDefault();
    const { email, password } = event.target.elemants;
    auth.signInWithEmailAndPassword(email.value, password.value);
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

export default Home;
