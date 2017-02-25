'use strict';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { fetchSeedData } from '../../actions/index';
import Sidebar from './Sidebar';


@connect(
  (state) => ({ seedData: state.seedDataAggregator }),
  (dispatch) => bindActionCreators({
    fetchSeedData,
    push
  }, dispatch)
)
export default class SearchWrapper extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <main>
        <Sidebar
          reroute={ () => this.props.push('/') } />
        { this.props.children }
      </main>
    );
  }
};
