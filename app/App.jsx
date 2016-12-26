'use strict';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import '../assets/styles/master.scss';
import Timeline from './Timeline';
import SEED_DATA from './constants/json/SeedData.json';


const App = () => (
  <div id="tl-container">
    <Timeline
      data={ SEED_DATA} />
  </div>
);

// Inject top-level React component into #root HTML element:
ReactDOM.render(<App />, document.getElementById('root'));
