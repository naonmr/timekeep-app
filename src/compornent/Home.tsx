import { auth } from "../firebaseConfig";
import { useHistory, Redirect } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const Home = () => {
  const history = useHistory();
  const user = useContext(AuthContext);
  const handleLogout = () => {
    auth.signOut();
    history.push("/login");
  };

  if (!user) {
    return <Redirect to="/login" />;
  } else {
    return (
      <>
        {console.log(user)}
        <h1>Home</h1>
        <button onClick={handleLogout}>ログアウト</button>
      </>
    );
  }
};

export default Home;
