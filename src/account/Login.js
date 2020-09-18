import React from "react";
import { Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useStoreActions } from "easy-peasy";

function Login({ history, location }) {
  const login = useStoreActions((a) => a.aStore.login);
  const alertError = useStoreActions((a) => a.iStore.error);
  const clearAlerts = useStoreActions((a) => a.iStore.clear);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  function onSubmit({ email, password }, { setSubmitting }) {
    clearAlerts();
    console.log(email);
    login({ email, password })
      .then(() => {
        const { from } = location.state || { from: { pathname: "/" } };
        history.push(from);
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
          <h3 className="card-header">Login</h3>
          <div className="card-body">
            <div className="form-group">
              <label>Email</label>
              <Field
                name="email"
                type="text"
                className={
                  "form-control" +
                  (errors.email && touched.email ? " is-invalid" : "")
                }
              />
              <ErrorMessage
                name="email"
                component="div"
                className="invalid-feedback"
              />
            </div>
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
                  Login
                </button>
                <Link to="register" className="btn btn-link">
                  Register
                </Link>
              </div>
              <div className="form-group col text-right">
                <Link to="forgot-password" className="btn btn-link pr-0">
                  Forgot Password?
                </Link>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export { Login };
