import React from "react";
import { AuthorizeWithToken } from "./login_components/page";

const LoginScreen = () => {
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <AuthorizeWithToken />
    </div>
  );
};

export default LoginScreen;
