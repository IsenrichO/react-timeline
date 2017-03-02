'use strict';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SingleEvent from './SingleEvent';
import { fetchSeedData } from '../../actions/index';


@connect(
  (state) => ({ seedData: state.seedDataAggregator }),
  (dispatch) => bindActionCreators({ fetchSeedData }, dispatch)
)
export default class AllEvents extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ul className="evt-search">
        { 
          this.props.seedData.map((evt, index) => (
            <SingleEvent
              key={ `EventCard_${index}` }
              { ...evt } />
          ))
        }
      </ul>
    );
  }
};
