import { useEffect, useState } from "react";
import { auth } from "../firebaseConfig";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const SignUp = () => {
  const user = useContext(AuthContext);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    console.log(email.value, password.value);
    auth.createUserWithEmailAndPassword(email.value, password.value);
  };

  return (
    <>
      <h1>🔑Sign Up</h1>
      <h1>ユーザ登録 </h1>
      {console.log(user)}

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
          <button>登録</button>
        </div>
      </form>
    </>
  );
};

export default SignUp;
