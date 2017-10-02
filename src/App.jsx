import a11y from 'react-a11y';
import React from 'react';
import ReactDOM from 'react-dom';

import RouterConfig from './routing/RouterConfig';

const predicateFunc = (componentName, elementId, failureMsg) => { // eslint-disable-next-line no-console
  console.log(`\
    • Component/React Element:\t${componentName}\n\
    • Element ID:\t${elementId}\n\
    • Failure Report:\t${failureMsg}\n\
  `);
  return true;
};

const a11yConfig = {
  ReactDOM,     // Necessary for compatibility with React >= 0.14
  device: [],   // OPTIONS: 'mobile'
  exclude: ['REDUNDANT_ALT'],
  filterFn: predicateFunc,
  includeSrcNode: true,
  throw: false,
};

// if (process.env.NODE_ENV === 'dev') a11y(React, a11yConfig);

// if (module.hot) {
//   module.hot.accept();
// }

// Inject router configuration into HTML insertion <div>:
ReactDOM.render(
  RouterConfig,
  document.getElementById('root'),
);
