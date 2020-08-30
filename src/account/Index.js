import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";

import { accountService } from "@/_services";
import { LoginState } from "@/_helpers";

import { Login } from "./Login";
import { Register } from "./Register";
import { VerifyEmail } from "./VerifyEmail";
import { ForgotPassword } from "./ForgotPassword";
import { ResetPassword } from "./ResetPassword";

const selectElementToDisplay = (loginState) => {
  switch (loginState) {
    case LoginState.login:
      return <Login nextStep={nextStep} />;

    case LoginState.register:
      return <Register nextStep={nextStep} />;

    case LoginState.verifyEmail:
      return <VerifyEmail nextStep={nextStep} />;

    case LoginState.forgotPassword:
      return <ForgotPassword nextStep={nextStep} />;

    case LoginState.resetPassword:
      return <ResetPassword nextStep={nextStep} />;

    default:
      return null;
  }
};

function Account({ setShow }) {
  const [loginState, setLoginState] = useState(LoginState.login);

  const nextStep = (next) => {
    if ((next = "finished")) {
      setShow(false);
      return;
    }

    setLoginState(next);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-8 offset-sm-2 mt-5">
          <div className="card m-3">{selectElementToDisplay(loginState)}</div>
        </div>
      </div>
    </div>
  );
}

export { Account };
