import React from "react";
import { ErrorMessage } from "@hookform/error-message";

export function Input({ name, label, formMethods, ...rest }) {
  const { register, errors } = formMethods;

  return (
    <div className="form-group">
      <label>{label ? label : name}</label>

      <input
        name={name}
        ref={register}
        {...rest}
        className={"form-control" + (errors[name] ? " is-invalid" : "")}
      />
      <ErrorMessage errors={errors} name={name} />
    </div>
  );
}

export function Select({ name, label, options, formMethods, ...rest }) {
  const { register, errors } = formMethods;
  return (
    <div className="form-group">
      <label>{label ? label : name}</label>
      <select
        name={name}
        ref={register}
        {...rest}
        className={"form-control" + (errors[name] ? " is-invalid" : "")}
      >
        {options.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
      <ErrorMessage errors={errors} name={name} />
    </div>
  );
}

export function Submit({ label, formMethods, children, ...rest }) {
  const { isSubmitting } = formMethods;
  console.log(children);

  let leftChildren;
  let rightChildren;

  if (Array.isArray(children)) {
    leftChildren = children.filter((c) => c.props.posright !== "true");
    rightChildren = children.filter((c) => c.props.posright === "true");
  } else {
    leftChildren = [children];
    rightChildren = [];
  }

  return (
    <div className="form-row">
      <div className="form-group col">
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary"
        >
          {isSubmitting && (
            <span className="spinner-border spinner-border-sm mr-1" />
          )}

          {label}
        </button>
        {React.Children.map(leftChildren, (child) => {
          return child;
        })}
      </div>

      <div className="form-group col text-right"></div>
      {React.Children.map(rightChildren, (child) => {
        return child;
      })}
    </div>
  );
}
