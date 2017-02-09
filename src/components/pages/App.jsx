'use strict';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import '../../../assets/styles/master.scss';
import Timeline from '../Timeline';
import EditEventModal from '../EditEventModal';
import { fetchSeedData } from '../../actions/index';


class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="tl-container">
        <Timeline
          data={ this.props.seedData } />
        <EditEventModal />
      </div>
    );
  }
};


let mapStateToProps = (state) => ({
  seedData: state.seedDataAggregator
});

let mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchSeedData
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
