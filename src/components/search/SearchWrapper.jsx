'use strict';
import React, { Component, cloneElement } from 'react';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { fetchSeedData } from '../../actions/index';
import Sidebar from './Sidebar';
import { addNewEvent, deleteSingleEvt, updateSingleEvent, deleteBatchEvents, fetchStarredEvents } from '../../actions/asyncActions';
import Utils from '../../utilities/index';


@connect(
  (state) => ({ seedData: state.seedDataAggregator }),
  (dispatch) => bindActionCreators({
    fetchSeedData,
    updateSingleEvent,
    fetchStarredEvents,
    push
  }, dispatch)
)
export default class SearchWrapper extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Sidebar
          reroute={ (path) => this.props.push(`${path}`) } />
        <main id="search-main">
          {
            cloneElement(this.props.children, {
              key: this.props.location.pathname,
              addEventToFavorites: (evt) => Utils.addEventToFavorites(this.props.updateSingleEvent, evt)
            })
          }
        </main>
      </div>
    );
  }
};

          // { this.props.children }
