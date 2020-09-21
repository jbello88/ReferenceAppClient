import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import * as Yup from "yup";
import { useStoreActions } from "easy-peasy";
import { Input, Submit } from "../_components";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Email is invalid").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

function Login({ history, location }) {
  const login = useStoreActions((a) => a.aStore.login);
  const alertError = useStoreActions((a) => a.iStore.error);
  const clearAlerts = useStoreActions((a) => a.iStore.clear);

  const formMethods = useForm({
    mode: "onBlur",
    resolver: yupResolver(validationSchema),
  });

  const { handleSubmit } = formMethods;

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
        <Input name="email" label="Email" formMethods={formMethods} />
        <Input
          name="password"
          label="Password"
          formMethods={formMethods}
          type="password"
        />
        <Submit label="Login" formMethods={formMethods}>
          <Link to="register" className="btn btn-link">
            Register
          </Link>
          <Link
            to="forgot-password"
            className="btn btn-link pr-0"
            posright="true"
          >
            Forgot Password?
          </Link>
        </Submit>
      </div>
    </form>
  );
}

export { Login };
