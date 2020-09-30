import React, { useEffect } from 'react';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { Role } from '../_helpers';
import { Nav, PrivateRoute, Alert } from '../_components';
import { Home } from '../home';
import { Profile } from '../profile';
import { Admin } from '../admin';
import { Account } from '../account';
import Pages from '../page/Pages';
import Page from '../page/Page';
import CommentEdit from '../page/CommentEdit';

function App() {
  const { pathname } = useLocation();
  const loadPages = useStoreActions(a => a.pStore.loadPages);
  const refreshToken = useStoreState(s => s.aStore.refreshToken);
  const refreshTheToken = useStoreActions(a => a.aStore.refreshTheToken);

  useEffect(() => {
    let refreshTokenTimeout;
    if (refreshToken) {
      const jwtToken = JSON.parse(atob(refreshToken.split('.')[1]));

      const expires = new Date(jwtToken.exp * 1000);
      const timeout = expires.getTime() - Date.now() - 60 * 1000;

      refreshTokenTimeout = setTimeout(() => {
        refreshTheToken();
      }, timeout);
    }
    return () => clearTimeout(refreshTokenTimeout);
  }, [refreshToken, refreshTheToken]);

  useEffect(() => {
    refreshTheToken();
    loadPages();
    // eslint-disable-next-line
  }, []);

  return (
    <div className={'container'}>
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
