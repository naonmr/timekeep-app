import { useHistory } from "react-router-dom";
import { PrimaryButton } from "../component/Button";

const Home = () => {
  const history = useHistory();
  return (
    <>
      <h1>HOME!</h1>
      <PrimaryButton text="login" onclick={() => history.push("/login")} />
    </>
  );
};

export default Home;
