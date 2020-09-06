import React from "react";
import { Link } from "react-router-dom";
import { useStoreState, useStoreActions } from "easy-peasy";

function Details({ match }) {
  const user = useStoreState((s) => s.aStore.account);
  const { path } = match;

  return (
    <div>
      <h1>My Profile</h1>
      <p>
        <strong>Name: </strong> {user.userName}
        <br />
        <strong>Email: </strong> {user.email}
      </p>
      <p>
        <Link to={`${path}/update`}>Update Profile</Link>
      </p>
    </div>
  );
}

export { Details };
