import { useHistory, Redirect } from "react-router-dom";
import { useContext } from "react";
import { getAuth } from "firebase/auth";
import firebase from "../firebase/firebaseConfig";
import { useAuthContext } from "../firebase/AuthContext";

const Home = () => {
  const history = useHistory();
  const { currentUser } = useAuthContext();
  const handleLogout = async () => {
    const auth = getAuth(firebase);
    history.push("/login");
  };

  if (!currentUser?.email) {
    return <Redirect to="/login" />;
  }

  return (
    <>
      <h1>Home</h1>
      <button onClick={handleLogout}>ログアウト</button>
    </>
  );
};

export default Home;
