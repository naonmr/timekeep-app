import { useHistory, Redirect } from "react-router-dom";

import { getAuth } from "firebase/auth";
import firebase from "../firebase/firebaseConfig";
import { useAuthContext } from "../firebase/AuthContext";

import MeetingList from "../component/MeetingList";
import Header from "../component/Header";

const Home = () => {
  const history = useHistory();
  const { currentUser } = useAuthContext();

  // if (!currentUser?.email) {
  //   return <Redirect to="/login" />;
  // }

  return (
    <>
      <Header />
      <MeetingList />
    </>
  );
};

export default Home;
