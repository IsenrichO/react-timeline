'use strict';
import React, { Component, cloneElement } from 'react';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import SearchSidebar from './SearchSidebar';
import { updateSingleEvent, fetchStarredEvents, fetchRecentlyModifiedEvents } from '../../actions/asyncActions';
import Utils from '../../utilities/index';


@connect(
  ({ seedDataAggregator, searchEvents }) => ({ seedDataAggregator, searchEvents }),
  (dispatch) => bindActionCreators({
    updateSingleEvent,
    fetchStarredEvents,
    fetchRecentlyModifiedEvents,
    push
  }, dispatch)
)
export default class SearchWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      starredEvts: [],
      recentEvts: []
    };
  }

  fetchStarredEvents() {
    let starredEvts = this.props.seedDataAggregator.filter(evt => evt.starred === true);
    this.setState({ starredEvts });
  }

  fetchRecentlyModifiedEvents() {
    console.log('fetched recent');
    this.props.fetchRecentlyModifiedEvents();
  }

  render() {
    console.log('SEARCH EVENTS:', this.props.searchEvents);
    return (
      <div>
        <SearchSidebar
          reroute={ (path) => this.props.push(`${path}`) }
          fetchStarredEvents={ () => ::this.fetchStarredEvents() }
          // fetchRecentlyModifiedEvents={ () => ::this.fetchRecentlyModifiedEvents() }
           />
        <main id="search-main">
          {
            cloneElement(this.props.children, {
              key: this.props.location.pathname,
              starredEvents: this.state.starredEvts,
              fetchRecentlyModifiedEvents: ::this.fetchRecentlyModifiedEvents,
              recentEvents: this.props.searchEvents,
              addEventToFavorites: (evt) => Utils.addEventToFavorites(this.props.updateSingleEvent, evt)
            })
          }
        </main>
      </div>
    );
  }
};
