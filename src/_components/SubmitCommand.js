import React from 'react';

export function SubmitCommand({ label, isBusy, isPrimary = true, isRight = false }) {
  return (
    <button
      type="submit"
      disabled={isBusy}
      className={'button level-item' + (isPrimary ? ' is-primary ' : ' ' + (isBusy ? 'is-loading' : ''))}
    >
      {label}
    </button>
  );
}
