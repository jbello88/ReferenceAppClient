import React from 'react';
import PropTypes from 'prop-types';
import { ErrorMessage } from '@hookform/error-message';

export function Input({ name, label, rows, formMethods, ...rest }) {
  const { register, errors } = formMethods;

  return (
    <div className="field">
      <label className="label">{label ? label : name}</label>
      {rows ? (
        <div>
          <textarea
            name={name}
            ref={register}
            rows={rows}
            {...rest}
            className={'textarea' + (errors[name] ? ' is-danger' : '')}
          />
        </div>
      ) : (
        <div className="control">
          <input name={name} ref={register} {...rest} className={'input' + (errors[name] ? ' is-danger' : '')} />
        </div>
      )}
      <ErrorMessage errors={errors} name={name} />
    </div>
  );
}

Input.propTypes = {
  /**
   * the unique name of the field
   */
  name: PropTypes.string.isRequired,
  /**
   * the label to be displayed for the field.
   * if no label is entered the name is used as the label
   */
  label: PropTypes.string,
  /**
   * The number of lines that the input field has
   * If this argument is passed the field is rendered as a textarea
   *
   */
  rows: PropTypes.number,
  /**
   * The formMethods of the parent form (hookform)
   */
  formMethods: PropTypes.object.isRequired,
};

Input.defaultProps = {
  name: 'name',
  label: 'label',
  rows: undefined,
  formMethods: {},
};
