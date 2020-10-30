import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Command } from '../Command';

import { timeout } from '../../_helpers';

const doAsync = async () => {
  console.log('doAsync started');
  action('button-click');
  await timeout(2000);
  action('button-click finished');
  console.log('doAsync ended');
};

storiesOf('Building Blocks', module)
  .add('Basic Command', () => <Command label="Command" handleClick={action('button-click')} />)
  .add('Basic CommandAsync', () => <Command label="Command Async" doOnAsync={doAsync} />)
  .add('Primary Command', () => (
    <Command label="Primary Command" handleClick={action('button-click')} colorClass="is-primary" />
  ));
