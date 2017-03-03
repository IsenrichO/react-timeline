'use strict';
import React, { Component, cloneElement } from 'react';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import SearchSidebar from './SearchSidebar';
import { updateSingleEvent, fetchStarredEvents } from '../../actions/asyncActions';
import Utils from '../../utilities/index';


@connect(
  ({ seedDataAggregator }) => ({ seedDataAggregator }),
  (dispatch) => bindActionCreators({
    updateSingleEvent,
    fetchStarredEvents,
    push
  }, dispatch)
)
export default class SearchWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      starredEvts: []
    };
  }

  fetchStarredEvents() {
    let starredEvts = this.props.seedDataAggregator.filter(evt => evt.starred === true);
    this.setState({ starredEvts });
  }

  render() {
    return (
      <div>
        <SearchSidebar
          reroute={ (path) => this.props.push(`${path}`) }
          fetchStarredEvents={ () => ::this.fetchStarredEvents() } />
        <main id="search-main">
          {
            cloneElement(this.props.children, {
              key: this.props.location.pathname,
              starredEvents: this.state.starredEvts,
              addEventToFavorites: (evt) => Utils.addEventToFavorites(this.props.updateSingleEvent, evt)
            })
          }
        </main>
      </div>
    );
  }
};
