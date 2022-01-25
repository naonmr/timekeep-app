import { RouteProps, Route, Redirect } from "react-router-dom";
import { useAuthContext } from "./AuthContext";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

const PrivateRoute: React.VFC<RouteProps> = ({ children, ...rest }) => {
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
