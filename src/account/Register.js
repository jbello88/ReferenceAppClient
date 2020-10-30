import React from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers';
import { useStoreActions } from 'easy-peasy';
import { Input, Commands, Command, SubmitCommand } from '../_components';

const validationSchema = Yup.object().shape({
  userName: Yup.string().required('Username is required'),
  email: Yup.string().email('Email is invalid').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

function Register({ history }) {
  const registerUser = useStoreActions(a => a.aStore.register);
  const alertSuccess = useStoreActions(a => a.iStore.success);
  const alertError = useStoreActions(a => a.iStore.error);

  const formMethods = useForm({
    mode: 'onBlur',
    resolver: yupResolver(validationSchema),
  });

  const { handleSubmit, isSubmitting } = formMethods;

  function onSubmit(data) {
    registerUser(data)
      .then(() => {
        alertSuccess({
          message: 'Registration successful, please check your email for verification instructions',
          keepAfterRouteChange: true,
        });
        history.push('login');
      })
      .catch(error => {
        alertError({ message: error });
      });
  }

  return (
    <div className="message">
      <div className="message-header">Register</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="section">
          <Input name="userName" label="Username" formMethods={formMethods} />
          <Input name="email" label="Email" formMethods={formMethods} />

          <div className="columns">
            <div className="column">
              <Input name="password" label="Password" type="password" formMethods={formMethods} />
            </div>
            <div className="column">
              <Input name="confirmPassword" label="Confirm Password" type="password" formMethods={formMethods} />
            </div>
          </div>
          <Commands>
            <SubmitCommand label="Register" isBusy={isSubmitting} />
            <Command label="Cancel" type="link" to="login" />
          </Commands>
        </div>
      </form>
    </div>
  );
}

export { Register };
