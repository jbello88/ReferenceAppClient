import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useStoreState } from 'easy-peasy';

import { Login } from './Login';
import { Register } from './Register';
import { VerifyEmail } from './VerifyEmail';
import { ForgotPassword } from './ForgotPassword';
import { ResetPassword } from './ResetPassword';

function Account({ history, match }) {
  const { path } = match;
  const account = useStoreState(s => s.aStore.account);

  useEffect(() => {
    // redirect to home if already logged in
    if (account) {
      history.push('/');
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container px-6 py-0">
      <div className="mx-6 px-6">
        <div className="section mx-6">
          <Switch>
            <Route path={`${path}/login`} component={Login} />
            <Route path={`${path}/register`} component={Register} />
            <Route path={`${path}/verify-email`} component={VerifyEmail} />
            <Route path={`${path}/forgot-password`} component={ForgotPassword} />
            <Route path={`${path}/reset-password`} component={ResetPassword} />
          </Switch>
        </div>
      </div>
    </div>
  );
}

export { Account };
