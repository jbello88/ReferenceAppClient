import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Command } from '../Command';
import { Commands } from '../Commands';

storiesOf('Building Blocks', module).add('Commands', () => {
  return (
    <>
      <Commands>
        <Command label="Left1" handleClick={action('button-click')}></Command>
        <Command label="Left2" handleClick={action('button-click')}></Command>
        <Command label="Right1" handleClick={action('button-click')} isRight={true}></Command>
      </Commands>
    </>
  );
});
