import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect, useLocation } from "react-router-dom";

import { Role } from "@/_helpers";
import { accountService } from "@/_services";
import { Nav, PrivateRoute, Alert } from "@/_components";
import { Home } from "@/home";
import { Profile } from "@/profile";
import { Admin } from "@/admin";
import { Account } from "@/account";
import Pages from "../page/Pages";
import Page from "../page/Page";
import About from "../about/About";
import Modal from "react-bootstrap/Modal";

function App() {
  const { pathname } = useLocation();
  const [user, setUser] = useState({});
  const [show, setShow] = useState(false);

  useEffect(() => {
    const subscription = accountService.user.subscribe((x) => setUser(x));
    return subscription.unsubscribe;
  }, []);

  return (
    <div className={"app-container bg-light"}>
      <h1>this is app</h1>
      <Nav />
      <Alert />
      <Switch>
        <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
        <Route exact path="/" component={Home} />
        <Route path="/profile" component={Profile} />
        <Route path="/admin" roles={[Role.Admin]} component={Admin} />
        <Route path="/account" component={Account} />
        <Route path="/about">
          <About />
        </Route>
        <Route path="/content">
          <Pages />
        </Route>
        <Route path="/topic/:slug">
          <Page />
        </Route>
        <Redirect from="*" to="/" />
      </Switch>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body>
          <Account setShow={setShow}></Account>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export { App };
