import { Button, ButtonGroup } from "@chakra-ui/react";

type ButtonProps = {
  text: string;
  type?: any;
  onclick?(): any | null;
};

export const PrimaryButton: React.VFC<ButtonProps> = (props) => {
  return (
    <Button
      colorScheme="teal"
      size="sm"
      w={65}
      variant="solid"
      type={props.type}
      onClick={props.onclick}
    >
      {props.text}
    </Button>
  );
};
export const SubButton: React.VFC<ButtonProps> = (props) => (
  <>
    <Button
      colorScheme="teal"
      size="sm"
      w={65}
      variant="outline"
      type={props.type}
      onClick={props.onclick}
    >
      {props.text}
    </Button>
  </>
);
