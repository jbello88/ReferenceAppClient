import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers';
import { useStoreActions } from 'easy-peasy';
import { Input, Submit } from '../_components';

const validationSchema = Yup.object().shape({
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

function ResetPassword({ history }) {
  const validateResetToken = useStoreActions(a => a.aStore.validateResetToken);

  const alertSuccess = useStoreActions(a => a.iStore.success);
  const alertError = useStoreActions(a => a.iStore.error);
  const clearAlerts = useStoreActions(a => a.iStore.clear);

  const resetPassword = useStoreActions(a => a.aStore.resetPassword);

  const TokenStatus = {
    Validating: 'Validating',
    Valid: 'Valid',
    Invalid: 'Invalid',
  };

  const [token, setToken] = useState(null);
  const [tokenStatus, setTokenStatus] = useState(TokenStatus.Validating);

  useEffect(() => {
    const { token } = queryString.parse(window.location.search);

    // remove token from url to prevent http referer leakage
    history.replace(window.location.pathname);

    validateResetToken(token)
      .then(() => {
        setToken(token);
        setTokenStatus(TokenStatus.Valid);
      })
      .catch(() => {
        setTokenStatus(TokenStatus.Invalid);
      });
    // eslint-disable-next-line
  }, []);

  const formMethods = useForm({
    mode: 'onBlur',
    resolver: yupResolver(validationSchema),
  });

  function getForm(formMethods) {
    const { handleSubmit } = formMethods;

    function onSubmit({ password, confirmPassword }, { setSubmitting }) {
      clearAlerts();
      resetPassword({ token, password, confirmPassword })
        .then(() => {
          alertSuccess({
            message: 'Password reset successful, you can now login',
            options: { keepAfterRouteChange: true },
          });
          history.push('login');
        })
        .catch(error => {
          setSubmitting(false);
          alertError({ message: error });
        });
    }

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input name="password" label="Password" type="password" formMethods={formMethods} />
        <Input name="confirmPassword" label="Confirm Password" type="password" formMethods={formMethods} />

        <Submit label="Reset Password" formMethods={formMethods}>
          <Link to="login" className="button is-link is-light level-item">
            Cancel
          </Link>
        </Submit>
      </form>
    );
  }

  function getBody(formMethods) {
    switch (tokenStatus) {
      case TokenStatus.Valid:
        return getForm(formMethods);
      case TokenStatus.Invalid:
        return (
          <div>
            Token validation failed, if the token has expired you can get a new one at the{' '}
            <Link to="forgot-password">forgot password</Link> page.
          </div>
        );
      case TokenStatus.Validating:
        return <div>Validating token...</div>;
      default:
        return <></>;
    }
  }

  return (
    <div className="message">
      <div className="message-header">Reset Password</div>
      <div className="section">{getBody(formMethods)}</div>
    </div>
  );
}

export { ResetPassword };
