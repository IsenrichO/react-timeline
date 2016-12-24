'use strict';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';


const App = () => (
  <p>Hello, World!</p>
);

// Inject top-level React component into #root HTML element:
ReactDOM.render(<App />, document.getElementById('root'));
