import React from "react";

export default function Input({ register, name, ...rest }) {
  return <input name={name} ref={register} {...rest} />;
}
