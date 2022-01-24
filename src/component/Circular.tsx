import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";

type Props = {
  value: number;
  text: any;
  color: string;
};

const Circular = (props: Props) => {
  return (
    <>
      <CircularProgress
        value={props.value}
        size="120px"
        thickness="4px"
        color={props.color}
      >
        <CircularProgressLabel fontSize={22}>
          {props.text}
        </CircularProgressLabel>
      </CircularProgress>
    </>
  );
};

export default Circular;
