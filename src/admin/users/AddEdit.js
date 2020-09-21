import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useStoreState, useStoreActions } from "easy-peasy";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers";

import { Input, Submit, Select } from "../../_components";

function AddEdit({ history, match }) {
  const user = useStoreState((s) => s.aStore.editAccount);
  const create = useStoreActions((a) => a.aStore.createAccount);
  const update = useStoreActions((a) => a.aStore.updateAccount);
  const getById = useStoreActions((a) => a.aStore.getAccountById);
  const alertSuccess = useStoreActions((a) => a.iStore.success);
  const alertError = useStoreActions((a) => a.iStore.error);

  const id = match.params.id;
  const isAddMode = !id;

  useEffect(() => {
    if (!isAddMode) {
      getById(id);
    }
    // eslint-disable-next-line
  }, []);

  const options = ["", "User", "Admin"];

  const emptyValues = {
    userName: "",
    email: "",
    role: "",
    password: "",
    confirmPassword: "",
  };

  const userValues = {
    userName: user?.userName,
    email: user?.email,
    role: user?.role,
    password: "",
    confirmPassword: "",
  };

  const initialValues = isAddMode ? emptyValues : userValues;

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
        alertSuccess({
          message: "User added successfully",
          keepAfterRouteChange: true,
        });
        history.push(".");
      })
      .catch((error) => {
        setSubmitting(false);
        alertError({ message: error });
      });
  }

  function updateUser(id, fields, setSubmitting) {
    update({ id: id, params: fields })
      .then(() => {
        alertSuccess({
          message: "Update successful",
          keepAfterRouteChange: true,
        });
        history.push("..");
      })
      .catch((error) => {
        setSubmitting(false);
        alertError({ message: error });
      });
  }

  const formMethods = useForm({
    defaultValues: initialValues,
    mode: "onBlur",
    resolver: yupResolver(validationSchema),
  });

  const { handleSubmit } = formMethods;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>{isAddMode ? "Add User" : "Edit User"}</h1>

      <Input name="userName" label="Username" formMethods={formMethods} />

      <div className="form-row">
        <div className="col-7">
          <Input name="email" label="Email" formMethods={formMethods} />
        </div>
        <div className="col">
          <Select
            name="role"
            label="Role"
            options={options}
            formMethods={formMethods}
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

      <Submit label="Save" formMethods={formMethods}>
        <Link to={isAddMode ? "." : ".."} className="btn btn-link">
          Cancel
        </Link>
      </Submit>
    </form>
  );
}

export { AddEdit };
