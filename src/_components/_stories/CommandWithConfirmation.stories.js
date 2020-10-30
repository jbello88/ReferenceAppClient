import React from 'react';

import { storiesOf } from '@storybook/react';
//import { action } from '@storybook/addon-actions';
import { CommandWithConfirmation } from '../CommandWithConfirmation';
import { ConfirmationContent } from '../ConfirmationContent';
import { timeout } from '../../_helpers';

const doAsync = async () => {
  console.log('doAsync started');
  await timeout(2000);
  console.log('doAsync ended');
};

storiesOf('Building Blocks', module)
  .add('Command with Confirmation', () => (
    <CommandWithConfirmation label="Command with Confirmation" title="Please Confirm!">
      <ConfirmationContent>
        <div>Please confirm your input.</div>
      </ConfirmationContent>
    </CommandWithConfirmation>
  ))
  .add('Command with Confirmation Async Yes', () => (
    <CommandWithConfirmation label="Command with Confirmation Yes-Async" doOnAsync={doAsync} title="Please Confirm!">
      <ConfirmationContent>
        <div>Please confirm your input.</div>
      </ConfirmationContent>
    </CommandWithConfirmation>
  ))
  .add('Command with Confirmation Async No', () => (
    <CommandWithConfirmation
      label="Command with Confirmation No-Async"
      doOnCancelAsync={doAsync}
      title="Please Confirm!"
    >
      <ConfirmationContent>
        <div>Please confirm your input.</div>
      </ConfirmationContent>
    </CommandWithConfirmation>
  ))
  .add('Command with Confirmation Async Yes and No', () => (
    <CommandWithConfirmation
      label="Command with Confirmation Yes and No-Async"
      doOnAsync={doAsync}
      doOnCancelAsync={doAsync}
      title="Please Confirm!"
    >
      <ConfirmationContent>
        <div>Please confirm your input.</div>
      </ConfirmationContent>
    </CommandWithConfirmation>
  ));
