import { useHistory, Redirect } from "react-router-dom";
import { useContext } from "react";

const Home = () => {
  const history = useHistory();
  const handleLogout = async () => {
    history.push("/login");
  };

  return (
    <>
      <h1>Home</h1>
      <button onClick={handleLogout}>ログアウト</button>
    </>
  );
};

export default Home;
