'use strict';
import React from 'react';

import '../../../assets/styles/master.scss';
import Timeline from '../Timeline';
import EditEventModal from '../EditEventModal';
import SEED_DATA from '../../constants/json/SeedData.json';


const App = () => (
  <div id="tl-container">
    <Timeline
      data={ SEED_DATA} />
    <EditEventModal />
  </div>
);

export default App;
