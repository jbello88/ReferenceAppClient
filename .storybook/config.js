import { addParameters, configure, addDecorator } from '@storybook/react';
//import { withInfo } from '@storybook/addon-info';
//import { withKnobs } from '@storybook/addon-knobs';

// automatically import all files ending in *.stories.js
const req = require.context('../src', true, /\.stories\.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

/* addDecorator(
  withInfo({
    inline: true,
  })
); */

//addDecorator(withKnobs);

configure(loadStories, module);
