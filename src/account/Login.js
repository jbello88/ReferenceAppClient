import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as Yup from 'yup';
import { useStoreActions } from 'easy-peasy';
import {
  Input,
  Commands,
  Command,
  SubmitCommand,
  CommandWithConfirmation,
  ConfirmationContent,
} from '../_components';

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

  const { handleSubmit, isSubmitting } = formMethods;

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

  const doGood = async () => {
    console.log('good');
  };

  const doCancel = async () => {
    console.log('cancel');
  };

  return (
    <div className="message">
      <div className="message-header">Login</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="section">
          <Input name="email" label="Email" formMethods={formMethods} />
          <Input name="password" label="Password" formMethods={formMethods} type="password" />
          <Commands>
            <SubmitCommand label="Login" isBusy={isSubmitting} />
            <Command label="Register" type="link" to="register" />
            <Command label="Forgot Password????" type="link" to="forgot-password" isRight={true} />
            <CommandWithConfirmation label="Miau" doOn={doGood} doOnCancel={doCancel}>
              <ConfirmationContent>
                <div>
                  You have made changes to this page. <br />
                  These changes have not been saved yet. <br />
                  Do you want to discard them?
                </div>
              </ConfirmationContent>
            </CommandWithConfirmation>
          </Commands>
        </div>
      </form>
    </div>
  );
}

export { Login };
