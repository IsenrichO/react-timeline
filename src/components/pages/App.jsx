'use strict';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import '../../../assets/styles/master.scss';
import Timeline from '../Timeline';
import EditEventModal from '../EditEventModal';
import { fetchSeedData } from '../../actions/index';


@connect(
  (state) => ({ seedData: state.seedDataAggregator }),
  (dispatch) => bindActionCreators({ fetchSeedData }, dispatch)
)
export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="tl-container">
        <Timeline seedData={ this.props.seedData } />
        <EditEventModal />
        { this.props.children }
      </div>
    );
  }
};
