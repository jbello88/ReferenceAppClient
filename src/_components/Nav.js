import React from 'react';
import { NavLink } from 'react-router-dom';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { Role } from '../_helpers';

function Nav() {
  const user = useStoreState(s => s.aStore.account);
  const logout = useStoreActions(a => a.aStore.logout);

  return (
    <section className="container mb-0 pb-0">
      <div className="section  mb-0 pb-0">
        <nav className="navbar is-light">
          <div className="navbar-menu">
            <div className="navbar-start">
              <div className="navbar-item">
                <NavLink exact to="/">
                  Home
                </NavLink>
              </div>
              <div className="navbar-item">
                <NavLink exact to="/content">
                  Documentation
                </NavLink>
              </div>

              {user && user.role === Role.Admin && (
                <div className="navbar-item">
                  <NavLink to="/admin">Admin</NavLink>
                </div>
              )}
            </div>
            <div className="navbar-end">
              {user && (
                <div className="navbar-item">
                  <NavLink to="/profile">User: {user.userName}</NavLink>
                </div>
              )}
              {user && (
                <div className="navbar-item">
                  <NavLink exact to="/account/login" onClick={() => logout()}>
                    Logout
                  </NavLink>
                </div>
              )}
              {!user && (
                <div className="navbar-item mr-3">
                  <NavLink to="/account/login">Login</NavLink>
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>
    </section>
  );
}

export { Nav };
