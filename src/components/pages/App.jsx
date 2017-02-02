'use strict';
import React from 'react';

import '../../../assets/styles/master.scss';
import Timeline from '../Timeline';
import EditEventModal from '../EditEventModal';
import SeedData from '../../constants/json/SeedData.json';


const App = () => (
  <div id="tl-container">
    <Timeline
      data={ SeedData } />
    <EditEventModal />
  </div>
);

export default App;
