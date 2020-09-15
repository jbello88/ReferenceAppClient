import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useStoreState, useStoreActions } from "easy-peasy";

function AddEdit({ history, match }) {
  const user = useStoreState((s) => s.aStore.editAccount);
  const create = useStoreActions((a) => a.aStore.createAccount);
  const update = useStoreActions((a) => a.aStore.updateAccount);
  const getById = useStoreActions((a) => a.aStore.getAccountById);
  const alertSuccess = useStoreActions((a) => a.iStore.success);
  const alertError = useStoreActions((a) => a.iStore.error);

  const { id } = match.params;
  const isAddMode = !id;

  useEffect(() => {
    if (!isAddMode) {
      getById(id);
    }
  }, []);

  const initialValues = {
    userName: user ? user.userName : "",
    email: user ? user.email : "",
    role: user ? user.role : "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object().shape({
    userName: Yup.string().required("Username is required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    role: Yup.string().required("Role is required"),
    password: Yup.string()
      .concat(isAddMode ? Yup.string().required("Password is required") : null)
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: Yup.string()
      .when("password", (password, schema) => {
        if (password) return schema.required("Confirm Password is required");
      })
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });

  function onSubmit(fields, { setStatus, setSubmitting }) {
    setStatus();
    if (isAddMode) {
      createUser(fields, setSubmitting);
    } else {
      updateUser(id, fields, setSubmitting);
    }
  }

  function createUser(fields, setSubmitting) {
    create(fields)
      .then(() => {
        alertSuccess("User added successfully", {
          keepAfterRouteChange: true,
        });
        history.push(".");
      })
      .catch((error) => {
        setSubmitting(false);
        alertError(error);
      });
  }

  function updateUser(id, fields, setSubmitting) {
    update(id, fields)
      .then(() => {
        alertSuccess("Update successful", {
          keepAfterRouteChange: true,
        });
        history.push("..");
      })
      .catch((error) => {
        setSubmitting(false);
        alertError(error);
      });
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched, isSubmitting, setFieldValue }) => {
        return (
          <Form>
            <h1>{isAddMode ? "Add User" : "Edit User"}</h1>
            <div className="form-row">
              <div className="form-group col">
                <label>Last Name</label>
                <Field
                  name="userName"
                  type="text"
                  className={
                    "form-control" +
                    (errors.userName && touched.userName ? " is-invalid" : "")
                  }
                />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-7">
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
              <div className="form-group col">
                <label>Role</label>
                <Field
                  name="role"
                  as="select"
                  className={
                    "form-control" +
                    (errors.role && touched.role ? " is-invalid" : "")
                  }
                >
                  <option value=""></option>
                  <option value="User">User</option>
                  <option value="Admin">Admin</option>
                </Field>
                <ErrorMessage
                  name="role"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
            </div>
            {!isAddMode && (
              <div>
                <h3 className="pt-3">Change Password</h3>
                <p>Leave blank to keep the same password</p>
              </div>
            )}
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
                Save
              </button>
              <Link to={isAddMode ? "." : ".."} className="btn btn-link">
                Cancel
              </Link>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}

export { AddEdit };
