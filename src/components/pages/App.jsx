'use strict';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import '../../../assets/styles/master.scss';
import Timeline from '../../containers/Timeline';
import EditEventModal from '../EditEventModal';
import { fetchSeedData } from '../../actions/index';


@connect(
  (state) => ({ seedData: state.seedDataAggregator }),
  (dispatch) => bindActionCreators({
    fetchSeedData,
    push
  }, dispatch)
)
export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="tl-container">
        <i
          id="hamburger-ic"
          onClick={ () => this.props.push('/search') }>
          &#9776;
        </i>
        <Timeline seedData={ this.props.seedData } />
        <EditEventModal />
        { this.props.children }
      </div>
    );
  }
};
