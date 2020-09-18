import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import queryString from "query-string";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useStoreActions } from "easy-peasy";

function ResetPassword({ history }) {
  const validateResetToken = useStoreActions(
    (a) => a.aStore.validateResetToken
  );

  const alertSuccess = useStoreActions((a) => a.iStore.success);
  const alertError = useStoreActions((a) => a.iStore.error);
  const clearAlerts = useStoreActions((a) => a.iStore.clear);

  const resetPassword = useStoreActions((a) => a.aStore.resetPassword);
  const TokenStatus = {
    Validating: "Validating",
    Valid: "Valid",
    Invalid: "Invalid",
  };

  const [token, setToken] = useState(null);
  const [tokenStatus, setTokenStatus] = useState(TokenStatus.Validating);

  useEffect(() => {
    const { token } = queryString.parse(window.location.search);

    // remove token from url to prevent http referer leakage
    history.replace(window.location.pathname);

    validateResetToken(token)
      .then(() => {
        setToken(token);
        setTokenStatus(TokenStatus.Valid);
      })
      .catch(() => {
        setTokenStatus(TokenStatus.Invalid);
      });
    // eslint-disable-next-line
  }, []);

  function getForm() {
    const initialValues = {
      password: "",
      confirmPassword: "",
    };

    const validationSchema = Yup.object().shape({
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
    });

    function onSubmit({ password, confirmPassword }, { setSubmitting }) {
      clearAlerts();
      resetPassword({ token, password, confirmPassword })
        .then(() => {
          alertSuccess({
            message: "Password reset successful, you can now login",
            options: { keepAfterRouteChange: true },
          });
          history.push("login");
        })
        .catch((error) => {
          setSubmitting(false);
          alertError({ message: error });
        });
    }

    return (
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <div className="form-group">
              <label>Password</label>
              <Field
                name="password"
                type="password"
                className={
                  "form-control" +
                  (errors.password && touched.password ? " is-invalid" : "")
                }
              />
              <ErrorMessage
                name="password"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <Field
                name="confirmPassword"
                type="password"
                className={
                  "form-control" +
                  (errors.confirmPassword && touched.confirmPassword
                    ? " is-invalid"
                    : "")
                }
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <div className="form-row">
              <div className="form-group col">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary"
                >
                  {isSubmitting && (
                    <span className="spinner-border spinner-border-sm mr-1"></span>
                  )}
                  Reset Password
                </button>
                <Link to="/login" className="btn btn-link">
                  Cancel
                </Link>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    );
  }

  function getBody() {
    switch (tokenStatus) {
      case TokenStatus.Valid:
        return getForm();
      case TokenStatus.Invalid:
        return (
          <div>
            Token validation failed, if the token has expired you can get a new
            one at the <Link to="forgot-password">forgot password</Link> page.
          </div>
        );
      case TokenStatus.Validating:
        return <div>Validating token...</div>;
      default:
        return <></>;
    }
  }

  return (
    <div>
      <h3 className="card-header">Reset Password</h3>
      <div className="card-body">{getBody()}</div>
    </div>
  );
}

export { ResetPassword };
