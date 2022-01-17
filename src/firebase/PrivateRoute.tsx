import { RouteProps, Route, Redirect } from "react-router-dom";
import { useAuthContext } from "./AuthContext";
import Login from "../pages/Login";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

const PrivateRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  const { currentUser, setCurrentUser } = useAuthContext();

  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user.uid);
      }

      setAuthChecked(true);
    });
  }, []);

  // const Component = currentUser?.uid ? component : Login;
  // //currentUserがtrueの場合component＝Home、falseならLoginコンポーネントにroute

  // return <Route {...rest} component={Component} />;
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (authChecked) {
          if (currentUser) {
            return children;
          } else {
            return (
              <Redirect to={{ pathname: "login", state: { from: location } }} />
            );
          }
        } else {
          return <></>;
        }
      }}
    />
  );
};

export default PrivateRoute;
