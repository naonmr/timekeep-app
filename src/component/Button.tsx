import { Button } from "@chakra-ui/react";

type ButtonProps = {
  text: string;
  type?: any;
  onclick?(): any | null;
  mt?: any;
  mr?: any;
};

export const PrimaryButton: React.VFC<ButtonProps> = (props) => {
  return (
    <Button
      color="brand.300"
      bg="brand.200"
      size="sm"
      w={50}
      variant="solid"
      type={props.type}
      onClick={props.onclick}
      mt={props.mt}
      mr={props.mr}
      shadow="base"
    >
      {props.text}
    </Button>
  );
};
export const PrimaryButton2: React.VFC<ButtonProps> = (props) => {
  return (
    <Button
      color="brand.300"
      bg="brand.100"
      size="sm"
      w={50}
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
      color="brand.100"
      size="sm"
      w={50}
      variant="ghost"
      type={props.type}
      onClick={props.onclick}
    >
      {props.text}
    </Button>
  </>
);
export const MiniButton: React.VFC<ButtonProps> = (props) => (
  <>
    <Button
      color="brand.200"
      size="xs"
      w={50}
      variant="ghost"
      type={props.type}
      onClick={props.onclick}
    >
      {props.text}
    </Button>
  </>
);

export const BigButton: React.VFC<ButtonProps> = (props) => {
  return (
    <Button
      color="brand.300"
      bg="brand.200"
      size="lg"
      w={70}
      variant="solid"
      type={props.type}
      onClick={props.onclick}
      mt={props.mt}
      mr={props.mr}
      shadow="base"
    >
      {props.text}
    </Button>
  );
};
