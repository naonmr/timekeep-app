import { RouteProps, Route, Redirect } from "react-router-dom";
import getUser, { getAuth } from "firebase/auth";
import { Component, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import Login from "../pages/Login";

const PrivateRoute: React.FC<RouteProps> = ({ component, ...rest }) => {
  const { currentUser } = useAuthContext();

  const Component = currentUser ? component : Login;
  //currentUserがtrueの場合component＝Home、falseならLoginコンポーネントにroute

  return <Route {...rest} component={Component} />;
};

export default PrivateRoute;
