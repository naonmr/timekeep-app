import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";
import { type } from "os";

type Props = {
  value: number;
};

const Circular = (props: Props) => {
  return (
    <>
      <CircularProgress value={props.value} size="200px" color="orange.400">
        <CircularProgressLabel>{props.value}%</CircularProgressLabel>
      </CircularProgress>
    </>
  );
};

export default Circular;
