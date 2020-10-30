import React from 'react';
import PropTypes from 'prop-types';
import { ErrorMessage } from '@hookform/error-message';

export function Select({ name, label, options, formMethods, ...rest }) {
  const { register, errors } = formMethods;
  return (
    <div className="field">
      <label className="label">{label ? label : name}</label>
      <div className="control">
        <div className="select">
          <select name={name} ref={register} {...rest} className={errors[name] ? ' is-danger' : ''}>
            {options.map(value => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
      </div>
      <ErrorMessage errors={errors} name={name} />
    </div>
  );
}

Select.propTypes = {
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
   * the array of options to be displayed for selection
   *
   */
  options: PropTypes.array,
  /**
   * The formMethods of the parent form (hookform)
   */
  formMethods: PropTypes.object,
};

Select.defaultProps = {
  name: 'name',
  label: 'label',
  options: ['one', 'two', 'three'],
  formMethods: {},
};
