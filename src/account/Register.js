import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers";
import { useStoreActions } from "easy-peasy";

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

function Register({ history }) {
  const registerUser = useStoreActions((a) => a.aStore.register);
  const alertSuccess = useStoreActions((a) => a.iStore.success);
  const alertError = useStoreActions((a) => a.iStore.error);

  const { handleSubmit, register, errors, formState } = useForm({
    mode: "onBlur",
    resolver: yupResolver(validationSchema),
  });
  const { isSubmitting } = formState;

  function onSubmit(data) {
    registerUser(data)
      .then(() => {
        alertSuccess({
          message:
            "Registration successful, please check your email for verification instructions",
          keepAfterRouteChange: true,
        });
        history.push("login");
      })
      .catch((error) => {
        alertError({ message: error });
      });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3 className="card-header">Register</h3>
      <div className="card-body">
        <div className="form-row">
          <div className="form-group col">
            <label>Username</label>
            <input
              name="userName"
              ref={register}
              type="text"
              className={
                "form-control" + (errors.userName ? " is-invalid" : "")
              }
            />
            <ErrorMessage
              className="invalid-feedback"
              errors={errors}
              name="userName"
            />
          </div>
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            name="email"
            ref={register}
            type="text"
            className={"form-control" + (errors.email ? " is-invalid" : "")}
          />
          <ErrorMessage
            className="invalid-feedback"
            errors={errors}
            name="email"
          />
        </div>

        <div className="form-row">
          <div className="form-group col">
            <label>Password</label>
            <input
              name="password"
              ref={register}
              type="password"
              className={
                "form-control" + (errors.password ? " is-invalid" : "")
              }
            />
            <ErrorMessage
              className="invalid-feedback"
              errors={errors}
              name="password"
            />
          </div>

          <div className="form-group col">
            <label>Confirm Password</label>
            <input
              name="confirmPassword"
              ref={register}
              type="password"
              className={
                "form-control" + (errors.confirmPassword ? " is-invalid" : "")
              }
            />
            <ErrorMessage
              className="invalid-feedback"
              errors={errors}
              name="confirmPassword"
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
    </form>
  );
}

export { Register };
