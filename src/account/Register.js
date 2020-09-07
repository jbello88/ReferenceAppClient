import React from "react";
import { Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useStoreActions } from "easy-peasy";

function Register({ history }) {
  const register = useStoreActions((a) => a.aStore.register);
  const alertSuccess = useStoreActions((a) => a.iStore.success);
  const alertError = useStoreActions((a) => a.iStore.error);

  const initialValues = {
    title: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  };

  const validationSchema = Yup.object().shape({
    userName: Yup.string().required("Username is required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  function onSubmit(fields, { setStatus, setSubmitting }) {
    setStatus();
    register(fields)
      .then(() => {
        alertSuccess({
          message:
            "Registration successful, please check your email for verification instructions",
          keepAfterRouteChange: true,
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
          <h3 className="card-header">Register</h3>
          <div className="card-body">
            <div className="form-row">
              <div className="form-group col">
                <label>Username</label>
                <Field
                  name="userName"
                  type="text"
                  className={
                    "form-control" +
                    (errors.userName && touched.userName ? " is-invalid" : "")
                  }
                />
                <ErrorMessage
                  name="userName"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
            </div>
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
            <div className="form-row">
              <div className="form-group col">
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
              <div className="form-group col">
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
            </div>
            <div className="form-group">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary"
              >
                {isSubmitting && (
                  <span className="spinner-border spinner-border-sm mr-1"></span>
                )}
                Register
              </button>
              <Link to="login" className="btn btn-link">
                Cancel
              </Link>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export { Register };
