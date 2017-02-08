'use strict';
import React, { Component } from 'react';

import '../../../assets/styles/master.scss';
import Timeline from '../Timeline';
import EditEventModal from '../EditEventModal';
import { getTlData } from '../../api_calls';
// import SeedData from '../../constants/json/SeedData.json';

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {data: []}
    this.updateData = this._onDataChange.bind(this);
  }

  _onDataChange(newData){
    this.setState({ data: newData });
  }

  componentDidMount(){
    getTlData(this.updateData.bind(this));
  }

  render(){
    if(!this.state.data.length){
      return <div />;
    }
    return(
      <div id="tl-container">
        <Timeline
          data={ this.state.data } />
        <EditEventModal />
      </div>
    )
  }
}
