import React, { useState } from 'react';
import { Confirmation } from './Confirmation';
import { Command } from './Command';

export function CommandWithConfirmation({
  label,
  doOn = () => {},
  doOnAsync,
  doOnCancel = () => {},
  doOnCancelAsync,
  showWhen = () => true,
  type = 'button',
  to,
  isRight = false,
  colorClass,
  children,
  title,
}) {
  let tmpChildren;

  if (children) {
    if (Array.isArray(children)) {
      tmpChildren = children;
    } else {
      tmpChildren = [children];
    }
  }

  const [show, setShow] = useState(false);
  const [isBusy, setIsBusy] = useState(false);

  const confirmationContent = tmpChildren.find(x => x.type.name === 'ConfirmationContent');

  const handleConfirmationResponse = async resp => {
    try {
      setShow(false);

      if (resp) {
        if (doOnAsync) {
          setIsBusy(true);
          await doOnAsync();
        } else {
          doOn();
        }
      } else {
        if (doOnCancelAsync) {
          setIsBusy(true);
          await doOnCancelAsync();
        } else {
          doOnCancel();
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsBusy(false);
    }
  };

  const handleClick = async () => {
    if (show) return;
    setShow(true);
  };

  return (
    <>
      <Command label={label} handleClick={handleClick} isRight={isRight} busy={isBusy} />

      <Confirmation isShown={show} callback={handleConfirmationResponse} title={title}>
        {confirmationContent}
      </Confirmation>
    </>
  );
}
