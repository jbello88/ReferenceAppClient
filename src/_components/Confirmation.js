import React from 'react';
import classNames from 'classnames';
import '../style.css';

export function Confirmation({
  isShown,
  callback,
  title,
  children,
  width = 400,
  yes = 'Yes',
  no = 'No',
  defaultYes = true,
  ...rest
}) {
  const stl = {};
  stl.width = width;

  const classYes = classNames('button', 'level-item', { 'is-success': defaultYes });
  const classNo = classNames('button', 'level-item', { 'is-success': !defaultYes });

  return (
    <div className={'modal' + (isShown ? ' is-active' : '')}>
      <div className="modal-background"></div>
      <div className="modal-card" style={stl}>
        <header className="modal-card-head">
          <div className="modal-card-title">{title}</div>
          <button onClick={() => callback(false)} className="delete" aria-label="close"></button>
        </header>
        <section className="modal-card-body" style={stl}>
          {React.Children.map(children, child => {
            return child;
          })}

          <div className="pt-6">
            <div className="level">
              <div className="level-left">
                <button onClick={() => callback(true)} className={classYes}>
                  {yes}
                </button>
              </div>
              <div className="level-right">
                <button onClick={() => callback(false)} className={classNo}>
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
