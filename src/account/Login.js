import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers";
import * as Yup from "yup";
import { useStoreActions } from "easy-peasy";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Email is invalid").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

function Login({ history, location }) {
  const login = useStoreActions((a) => a.aStore.login);
  const alertError = useStoreActions((a) => a.iStore.error);
  const clearAlerts = useStoreActions((a) => a.iStore.clear);

  const { handleSubmit, register, errors, formState } = useForm({
    mode: "onBlur",
    resolver: yupResolver(validationSchema),
  });
  const { isSubmitting } = formState;

  function onSubmit({ email, password }) {
    clearAlerts();
    login({ email, password })
      .then(() => {
        const { from } = location.state || { from: { pathname: "/" } };
        history.push(from);
      })
      .catch((error) => {
        alertError({ message: error });
      });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3 className="card-header">Login</h3>
      <div className="card-body">
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

        <div className="form-group">
          <label>Password</label>
          <input
            name="password"
            ref={register}
            type="password"
            className={"form-control" + (errors.password ? " is-invalid" : "")}
          />
          <ErrorMessage
            className="invalid-feedback"
            errors={errors}
            name="password"
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
    </form>
  );
}

export { Login };
