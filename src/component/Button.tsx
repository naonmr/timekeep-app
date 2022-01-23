import { Button } from "@chakra-ui/react";

type ButtonProps = {
  text: string;
  type?: any;
  onclick?(): any | null;
  mt?: any;
};

export const PrimaryButton: React.VFC<ButtonProps> = (props) => {
  return (
    <Button
      color="brand.300"
      bg="brand.200"
      size="sm"
      w={65}
      variant="solid"
      type={props.type}
      onClick={props.onclick}
      mt={props.mt}
      shadow="base"
    >
      {props.text}
    </Button>
  );
};

export const SubButton: React.VFC<ButtonProps> = (props) => (
  <>
    <Button
      color="brand.200"
      size="sm"
      w={65}
      variant="ghost"
      type={props.type}
      onClick={props.onclick}
      mt={props.mt}
    >
      {props.text}
    </Button>
  </>
);
