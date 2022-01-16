import { RouteProps, Route } from "react-router-dom";
import { useAuthContext } from "./AuthContext";
import Login from "../pages/Login";

const PrivateRoute: React.FC<RouteProps> = ({ component, ...rest }) => {
  const { currentUser } = useAuthContext();

  const Component = currentUser?.uid ? component : Login;
  //currentUserがtrueの場合component＝Home、falseならLoginコンポーネントにroute

  return <Route {...rest} component={Component} />;
};

export default PrivateRoute;
