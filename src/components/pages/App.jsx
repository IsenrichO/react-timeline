'use strict';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import '../../../assets/styles/master.scss';
import Timeline from '../../containers/Timeline';
import EditEventModal from '../EditEventModal';
import { fetchSeedData, fetchAllCloudinary } from '../../actions/asyncActions';


@connect(
  (state) => ({ seedData: state.seedDataAggregator, cloudinaryImageStore: state.cloudinaryImageStore }),
  (dispatch) => bindActionCreators({
    fetchSeedData,
    fetchAllCloudinary,
    push
  }, dispatch)
)
export default class App extends Component {
  constructor(props) {
    super(props);
    props.fetchSeedData();
    props.fetchAllCloudinary();
  }

  render() {
    return (
      <div id="tl-container">
        <i
          id="hamburger-ic"
          onClick={ () => this.props.push('/search') }>
          &#9776;
        </i>
        <Timeline
          seedData={ this.props.seedData }
          cIS={ this.props.cloudinaryImageStore } />
        { this.props.children }
      </div>
    );
  }
};


// <EditEventModal />
