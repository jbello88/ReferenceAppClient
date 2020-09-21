import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import * as Yup from "yup";
import { useStoreActions } from "easy-peasy";
import { Input, Submit } from "../_components";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Email is invalid").required("Email is required"),
});

function ForgotPassword() {
  const forgotPassword = useStoreActions((a) => a.aStore.forgotPassword);
  const alertSuccess = useStoreActions((a) => a.iStore.success);
  const alertError = useStoreActions((a) => a.iStore.error);
  const clearAlerts = useStoreActions((a) => a.iStore.clear);

  const formMethods = useForm({
    mode: "onBlur",
    resolver: yupResolver(validationSchema),
  });

  const { handleSubmit } = formMethods;

  function onSubmit({ email }) {
    clearAlerts();
    forgotPassword(email)
      .then(() =>
        alertSuccess({
          message: "Please check your email for password reset instructions",
        })
      )
      .catch((error) => alertError({ message: error }));
    //.finally(() => setSubmitting(false));
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3 className="card-header">Forgot Password</h3>
      <div className="card-body">
        <Input name="email" label="Email" formMethods={formMethods} />
        <Submit label="Forgot Password" formMethods={formMethods}>
          <Link to="login" className="btn btn-link" posright="false">
            Cancel
          </Link>
        </Submit>
      </div>
    </form>
  );
}

export { ForgotPassword };
