import React, { useEffect } from "react";
import { Route, Switch, Redirect, useLocation } from "react-router-dom";
import { useStoreActions } from "easy-peasy";
import { Role } from "../_helpers";
import { Nav, PrivateRoute, Alert } from "../_components";
import { Home } from "../home";
import { Profile } from "../profile";
import { Admin } from "../admin";
import { Account } from "../account";
import Pages from "../page/Pages";
import Page from "../page/Page";
import CommentEdit from "../page/CommentEdit";

function App() {
  const { pathname } = useLocation();
  const loadPages = useStoreActions((actions) => actions.pStore.loadPages);
  const setAccount = useStoreActions((actions) => actions.aStore.setAccount);
  const refreshToken = useStoreActions(
    (actions) => actions.aStore.refreshToken
  );

  /*   useEffect(() => {
    const subscription = accountXXXXService.user.subscribe((x) => {
      setUser(x);
      addAccount(x);
    });
    return subscription.unsubscribe;
  }, []);
 */
  useEffect(() => {
    refreshToken();
    loadPages();
  }, []);

  return (
    <div className={"app-container bg-light"}>
      <Nav />
      <Alert />
      <Switch>
        <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
        <Route exact path="/" component={Home} />
        <Route exact path="/content" component={Pages} />
        <Route path="/topic/:slug" component={Page} />

        <PrivateRoute path="/profile" component={Profile} />
        <PrivateRoute path="/admin" roles={[Role.Admin]} component={Admin} />
        <Route path="/account" component={Account} />
        <Route path="/comment" component={CommentEdit} />
      </Switch>
    </div>
  );
}

export { App };
