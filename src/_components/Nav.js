import React, { useState, useEffect } from "react";
import { NavLink, Route } from "react-router-dom";
import { useStoreState, useStoreActions } from "easy-peasy";
import { history } from "@/_helpers";

import { Role } from "@/_helpers";
import { accountService } from "@/_services";

function Nav() {
  const [user, setUser] = useState({});
  const account = useStoreState((s) => s.aStore.account);
  const logout = useStoreActions((a) => a.aStore.removeAccount);

  useEffect(() => {
    const subscription = accountService.user.subscribe((x) => setUser(x));
    return subscription.unsubscribe;
  }, []);

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="navbar-nav">
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

          {user && (
            <a onClick={accountService.logout} className="nav-item nav-link ">
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
