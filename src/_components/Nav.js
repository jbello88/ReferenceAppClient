import React from "react";
import { NavLink, Route } from "react-router-dom";
import { useStoreState, useStoreActions } from "easy-peasy";
import { history, Role } from "../_helpers";

function Nav() {
  const user = useStoreState((s) => s.aStore.account);
  const logout = useStoreActions((a) => a.aStore.logout);

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-info larger">
        <div className="navbar-nav mr-auto">
          <NavLink exact to="/" className="nav-item nav-link">
            Home
          </NavLink>
          <NavLink exact to="/content" className="nav-item nav-link">
            Documentation
          </NavLink>

          {user && user.role === Role.Admin && (
            <NavLink to="/admin" className="nav-item nav-link">
              Admin
            </NavLink>
          )}
        </div>
        <div className="navbar-nav ml-auto">
          {user && (
            <NavLink to="/profile" className="nav-item nav-link">
              User: {user.userName}
            </NavLink>
          )}
          {user && (
            <NavLink
              exact
              to="/account/login"
              onClick={() => logout()}
              className="nav-item nav-link "
            >
              Logout
            </NavLink>
          )}
          {!user && (
            <NavLink className="nav-item nav-link" to="/account/login">
              Login
            </NavLink>
          )}
        </div>
      </nav>
    </div>
  );
}

export { Nav };
