import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers";
import { useStoreState, useStoreActions } from "easy-peasy";
import { Input, Submit } from "../_components";

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

  const formMethods = useForm({
    defaultValues: initialValues,
    mode: "onBlur",
    resolver: yupResolver(validationSchema),
  });

  const { handleSubmit } = formMethods;

  function onSubmit(fields, { setStatus, setSubmitting }) {
    setStatus();
    console.log(user.id);
    console.log(fields);
    update({ id: user.id, params: fields })
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
    if (window.confirm("Are you sure?")) {
      setIsDeleting(true);

      deleteAccount(user.id).then(() =>
        alertSuccess("Account deleted successfully")
      );
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Update Profile</h1>
      <Input name="userName" label="Username" formMethods={formMethods} />
      <Input name="email" label="Email" formMethods={formMethods} />

      <h3 className="pt-3">Change Password</h3>
      <p>Leave blank to keep the same password</p>
      <div className="form-row">
        <div className="col">
          <Input
            name="password"
            label="Password"
            type="password"
            formMethods={formMethods}
          />
        </div>
        <div className="col">
          <Input
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            formMethods={formMethods}
          />
        </div>
      </div>

      <Submit label="Update" formMethods={formMethods}>
        <button
          type="button"
          onClick={() => onDelete()}
          className="btn btn-danger ml-2"
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
      </Submit>
    </form>
  );
}

export { Update };
