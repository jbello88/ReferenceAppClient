import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useStoreState } from "easy-peasy";

function PrivateRoute({ component: Component, roles, ...rest }) {
  const account = useStoreState((s) => s.aStore.account);
  return (
    <Route
      {...rest}
      render={(props) => {
        console.log("Private Route");
        if (!account) {
          // not logged in so redirect to login page with the return url
          return (
            <Redirect
              to={{
                pathname: "/account/login",
                state: { from: props.location },
              }}
            />
          );
          //return <Redirect to={{ pathname: "/" }} />;
        }

        // check if route is restricted by role
        if (roles && roles.indexOf(account.role) === -1) {
          // role not authorized so redirect to home page
          return <Redirect to={{ pathname: "/" }} />;
        }

        // authorized so return component
        return <Component {...props} />;
      }}
    />
  );
}

export { PrivateRoute };
