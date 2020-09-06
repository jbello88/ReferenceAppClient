import React from "react";
import { NavLink, Route } from "react-router-dom";
import { useStoreState, useStoreActions } from "easy-peasy";
import { history, Role } from "@/_helpers";

function Nav() {
  const user = useStoreState((s) => s.aStore.account);
  const logout = useStoreActions((a) => a.aStore.logout);

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="navbar-nav mr-auto">
          <NavLink exact to="/" className="nav-item nav-link">
            Home
          </NavLink>
          <NavLink exact to="/content" className="nav-item nav-link">
            Content
          </NavLink>
          <NavLink to="/profile" className="nav-item nav-link">
            Profile
          </NavLink>
          {user && user.role === Role.Admin && (
            <NavLink to="/admin" className="nav-item nav-link">
              Admin
            </NavLink>
          )}
        </div>
        <div className="navbar-nav ml-auto">
          {user && (
            <span className="navbar-text mr-4">User: {user.userName}</span>
          )}
          {user && (
            <a onClick={() => logout()} className="nav-item nav-link ">
              Logout
            </a>
          )}
          {!user && (
            <a
              className="nav-item nav-link"
              onClick={() => history.push("/account/login")}
              variant="outline-success"
            >
              Login
            </a>
          )}
        </div>
      </nav>

      <Route path="/admin" component={AdminNav} />
    </div>
  );
}

function AdminNav({ match }) {
  const { path } = match;

  return (
    <nav className="admin-nav navbar navbar-expand navbar-light">
      <div className="navbar-nav">
        <NavLink to={`${path}/users`} className="nav-item nav-link">
          Users
        </NavLink>
      </div>
    </nav>
  );
}

export { Nav };
