import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as Yup from 'yup';
import { useStoreActions } from 'easy-peasy';
import { Input, Submit } from '../_components';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Email is invalid').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

function Login({ history, location }) {
  const login = useStoreActions(a => a.aStore.login);
  const alertError = useStoreActions(a => a.iStore.error);
  const clearAlerts = useStoreActions(a => a.iStore.clear);

  const formMethods = useForm({
    mode: 'onBlur',
    resolver: yupResolver(validationSchema),
  });

  const { handleSubmit } = formMethods;

  function onSubmit({ email, password }) {
    clearAlerts();
    login({ email, password })
      .then(() => {
        const { from } = location.state || { from: { pathname: '/' } };
        history.push(from);
      })
      .catch(error => {
        alertError({ message: error });
      });
  }

  return (
    <div className="message">
      <div className="message-header">Login</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="section">
          <Input name="email" label="Email" formMethods={formMethods} />
          <Input name="password" label="Password" formMethods={formMethods} type="password" />
          <Submit label="Login" formMethods={formMethods}>
            <Link to="register" className="button is-link is-light level-item">
              Register
            </Link>
            <Link to="forgot-password" className="button is-link is-light level-item" posright="true">
              Forgot Password?
            </Link>
          </Submit>
        </div>
      </form>
    </div>
  );
}

export { Login };
