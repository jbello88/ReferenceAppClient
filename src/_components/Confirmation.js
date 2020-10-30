import React from 'react';
import '../style.css';

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
        <section className="modal-card-body" style={stl}>
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
