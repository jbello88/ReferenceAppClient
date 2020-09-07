import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useStoreState, useStoreActions } from "easy-peasy";

function Update({ history }) {
  const user = useStoreState((s) => s.aStore.account);
  const update = useStoreActions((a) => a.aStore.updateAccount);
  const deleteAccount = useStoreActions((a) => a.aStore.deleteAccount);
  const alertSuccess = useStoreActions((a) => a.iStore.success);
  const alertError = useStoreActions((a) => a.iStore.error);

  const initialValues = {
    userName: user.userName,
    email: user.email,
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object().shape({
    userName: Yup.string().required("Username is required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: Yup.string()
      .when("password", (password, schema) => {
        if (password) return schema.required("Confirm Password is required");
      })
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });

  function onSubmit(fields, { setStatus, setSubmitting }) {
    setStatus();
    update(user.id, fields)
      .then(() => {
        alertSuccess({
          message: "Update successful",
          options: { keepAfterRouteChange: true },
        });
        history.push(".");
      })
      .catch((error) => {
        setSubmitting(false);
        alertError({ message: error });
      });
  }

  const [isDeleting, setIsDeleting] = useState(false);
  function onDelete() {
    if (confirm("Are you sure?")) {
      setIsDeleting(true);

      deleteAccount(user.id).then(() =>
        alertSuccess("Account deleted successfully")
      );
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form>
          <h1>Update Profile</h1>
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
          <h3 className="pt-3">Change Password</h3>
          <p>Leave blank to keep the same password</p>
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
              className="btn btn-primary mr-2"
            >
              {isSubmitting && (
                <span className="spinner-border spinner-border-sm mr-1"></span>
              )}
              Update
            </button>
            <button
              type="button"
              onClick={() => onDelete()}
              className="btn btn-danger"
              style={{ width: "75px" }}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <span className="spinner-border spinner-border-sm"></span>
              ) : (
                <span>Delete</span>
              )}
            </button>
            <Link to="." className="btn btn-link">
              Cancel
            </Link>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export { Update };
