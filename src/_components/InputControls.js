import React from 'react';
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

export function Submit({ label, formMethods, children, ...rest }) {
  const { isSubmitting } = formMethods;
  console.log(children);

  let leftChildren;
  let rightChildren;

  if (Array.isArray(children)) {
    leftChildren = children.filter(c => c.props.posright !== 'true');
    rightChildren = children.filter(c => c.props.posright === 'true');
  } else {
    leftChildren = [children];
    rightChildren = [];
  }

  return (
    <>
      <div className="field level">
        <div className="level-left">
          <button type="submit" disabled={isSubmitting} className="button level-item is-primary">
            {isSubmitting && <span className="spinner-border spinner-border-sm mr-1" />}

            {label}
          </button>
          {React.Children.map(leftChildren, child => {
            return child;
          })}
        </div>

        <div className="level-right">
          {React.Children.map(rightChildren, child => {
            return child;
          })}
        </div>
      </div>
    </>
  );
}

export function Confirmation({ isShown, callback, title, children, width = 400, yes = 'Yes', no = 'No', ...rest }) {
  const stl = {};
  stl.width = width;

  return (
    <div className={'modal' + (isShown ? ' is-active' : '')}>
      <div className="modal-background"></div>
      <div className="modal-card" style={stl}>
        <header className="modal-card-head">
          <p className="modal-card-title">{title}</p>
          <button onClick={() => callback(false)} className="delete" aria-label="close"></button>
        </header>
        <section className="modal-card-body">
          {React.Children.map(children, child => {
            return child;
          })}

          <div className="pt-6">
            <div className="level">
              <div className="level-left">
                <button onClick={() => callback(true)} className="button is-success level-item">
                  {yes}
                </button>
              </div>
              <div className="level-right">
                <button onClick={() => callback(false)} className="button level-item">
                  {no}
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export function UserMatchOrAdmin({ user, id, children }) {
  if (!user) return null;
  if (user?.role === 'Admin' || user?.id === id)
    return (
      <>
        {React.Children.map(children, child => {
          return child;
        })}
      </>
    );
  return null;
}
