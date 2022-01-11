import { login, logout } from "../firebase/auth";

type BaseButtonProps = {
  text: string;
  onclick(): void;
};

export const BaseButton: React.VFC<BaseButtonProps> = (props) => (
  <button style={{ backgroundColor: "#FF8A80", padding: "20px" }}>
    {props.text}
  </button>
);

export const LoginButton = () => (
  <BaseButton onclick={() => login()} text="LOGIN"></BaseButton>
);
export const LogoutButton = () => (
  <BaseButton onclick={() => logout()} text="LOGOUT"></BaseButton>
);
