import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../style.css';

export function Command({
  label,
  busy = false,
  doOn = () => {},
  doOnAsync,
  type = 'button',
  to,
  isRight = false,
  handleClick,
  colorClass = 'is-light is-link',
  children,
}) {
  useEffect(() => {
    setIsBusy(busy);
  }, [busy]);

  let tmpChildren;
  const [isBusy, setIsBusy] = useState(false);

  const handleClk = async () => {
    if (doOnAsync) {
      setIsBusy(true);
      try {
        await doOnAsync();
      } catch {
      } finally {
        setIsBusy(false);
      }
    } else {
      doOn();
    }
  };

  if (children) {
    if (Array.isArray(children)) {
      tmpChildren = children;
    } else {
      tmpChildren = [children];
    }
  }

  let handle = handleClick;
  if (handle === undefined) handle = handleClk;

  if (tmpChildren && tmpChildren.length > 0) {
    return (
      <>
        {React.Children.map(tmpChildren, child => {
          return child;
        })}
      </>
    );
  }

  if (type === 'button') {
    return (
      <button
        type="button"
        onClick={handle}
        className={'button level-item ' + colorClass + ' ' + (isBusy ? 'is-loading' : ' ')}
      >
        {label}
      </button>
    );
  }

  if (type === 'link') {
    return (
      <Link to={to} className={'button level-item ' + colorClass + ' ' + (isBusy ? 'is-loading' : '')}>
        {label}
      </Link>
    );
  }

  return <></>;
}
