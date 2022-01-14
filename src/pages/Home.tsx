import { useHistory, Redirect } from "react-router-dom";

import { getAuth } from "firebase/auth";
import firebase from "../firebase/firebaseConfig";
import { useAuthContext } from "../firebase/AuthContext";

import MeetingList from "../component/MeetingList";
import Header from "../component/Header";
// import { TimerProvider } from "../component/timerContext";
const Home = () => {
  const history = useHistory();
  const { currentUser } = useAuthContext();

  if (!currentUser?.email) {
    return <Redirect to="/login" />;
  }

  return (
    <>
      {/* <TimerProvider> */}
      <Header />
      <MeetingList />
      {/* </TimerProvider> */}
    </>
  );
};

export default Home;
