'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import RouterConfig from './routing/RouterConfig';


// Inject router configuration into HTML insertion <div>:
ReactDOM.render(
  RouterConfig,
  document.getElementById('root')
);
