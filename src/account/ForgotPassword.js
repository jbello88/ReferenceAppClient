import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as Yup from 'yup';
import { useStoreActions } from 'easy-peasy';
import { Input, Commands, Command, SubmitCommand } from '../_components';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Email is invalid').required('Email is required'),
});

function ForgotPassword() {
  const forgotPassword = useStoreActions(a => a.aStore.forgotPassword);
  const alertSuccess = useStoreActions(a => a.iStore.success);
  const alertError = useStoreActions(a => a.iStore.error);
  const clearAlerts = useStoreActions(a => a.iStore.clear);

  const formMethods = useForm({
    mode: 'onBlur',
    resolver: yupResolver(validationSchema),
  });

  const { handleSubmit, isSubmitting } = formMethods;

  function onSubmit({ email }) {
    clearAlerts();
    forgotPassword(email)
      .then(() =>
        alertSuccess({
          message: 'Please check your email for password reset instructions',
        })
      )
      .catch(error => alertError({ message: error }));
    //.finally(() => setSubmitting(false));
  }

  return (
    <div className="message">
      <div className="message-header">Forgot Password</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="section">
          <Input name="email" label="Email" formMethods={formMethods} />
          <Commands>
            <SubmitCommand label="Forgot Password" isBusy={isSubmitting} />
            <Command label="Cancel" to="login" type="link" />
          </Commands>
        </div>
      </form>
    </div>
  );
}

export { ForgotPassword };
