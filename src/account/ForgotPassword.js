import React from "react";
import { Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useStoreActions } from "easy-peasy";

function ForgotPassword() {
  const forgotPassword = useStoreActions((a) => a.aStore.forgotPassword);
  const alertSuccess = useStoreActions((a) => a.iStore.success);
  const alertError = useStoreActions((a) => a.iStore.error);
  const clearAlerts = useStoreActions((a) => a.iStore.clear);

  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Email is invalid").required("Email is required"),
  });

  function onSubmit({ email }, { setSubmitting }) {
    clearAlerts();
    forgotPassword(email)
      .then(() =>
        alertSuccess({
          message: "Please check your email for password reset instructions",
        })
      )
      .catch((error) => alertError({ message: error }))
      .finally(() => setSubmitting(false));
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form>
          <h3 className="card-header">Forgot Password</h3>
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
                  Submit
                </button>
                <Link to="login" className="btn btn-link">
                  Cancel
                </Link>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export { ForgotPassword };
