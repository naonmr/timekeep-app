import Header from "../component/Header";
import MeetingList from "../component/MeetingList";
import { useTimerContext } from "../component/timerContext";

const MyPage = () => {
  return (
    <>
      <>
        <Header />
        <br></br>
        <MeetingList />
      </>
    </>
  );
};

export default MyPage;
