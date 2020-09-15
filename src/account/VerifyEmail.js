import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import queryString from "query-string";
import { useStoreActions } from "easy-peasy";

function VerifyEmail({ history }) {
  const verifyEmail = useStoreActions((a) => a.aStore.verifyEmail);
  const alertSuccess = useStoreActions((a) => a.iStore.success);

  const EmailStatus = {
    Verifying: "Verifying",
    Failed: "Failed",
  };

  const [emailStatus, setEmailStatus] = useState(EmailStatus.Verifying);

  useEffect(() => {
    const { token } = queryString.parse(window.location.search);

    // remove token from url to prevent http referer leakage
    history.replace(window.location.pathname);

    verifyEmail(token)
      .then(() => {
        alertSuccess({
          message: "Verification successful, you can now login",
          keepAfterRouteChange: true,
        });
        history.push("login");
      })
      .catch(() => {
        setEmailStatus(EmailStatus.Failed);
      });
  }, []);

  function getBody() {
    switch (emailStatus) {
      case EmailStatus.Verifying:
        return <div>Verifying...</div>;
      case EmailStatus.Failed:
        return (
          <div>
            Verification failed, you can also verify your account using the{" "}
            <Link to="forgot-password">forgot password</Link> page.
          </div>
        );
      default:
        return <></>;
    }
  }

  return (
    <div>
      <h3 className="card-header">Verify Email</h3>
      <div className="card-body">{getBody()}</div>
    </div>
  );
}

export { VerifyEmail };
