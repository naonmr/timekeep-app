import Circular from "../component/Circular";
import { SubButton } from "../component/Button";

const Tiemr = () => {
  return (
    <>
      <Circular value={40} />
      <SubButton text="start" />
      <SubButton text="pause" />
      <SubButton text="back" />
    </>
  );
};

export default Tiemr;
