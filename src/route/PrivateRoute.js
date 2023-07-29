import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { authUser, authLoader } = useContext(AuthContext);
  const navigation = useNavigate();

  // if (!authUser) {
  //   return <SignIn></SignIn>;
  // }

  if (authLoader) {
    return (
      <p className="flex justify-center items-center text-3xl font-bold">
        Loading...
      </p>
    );
  } else if (!authUser) {
    navigation("/signin");
  } else {
    return <div>{children}</div>;
  }
};

export default PrivateRoute;
