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
      starredEvts: []
    };
    this.props.fetchRecentlyModifiedEvents();
  }

  fetchStarredEvents() {
    let starredEvts = this.props.seedDataAggregator.filter(evt => evt.starred === true);
    this.setState({ starredEvts });
  }

  delegateAsyncCallback(path) {
    const pathRoute = path.replace(/^\/search\//, '');
    // const pathsObj = {
    //   '': null,
    //   'starred': () => this.props.fetchStarredEvents(),
    //   'recent': this.props.fetchRecentlyModifiedEvents
    // };
    // pathRoute in pathsObj ? pathsObj[pathRoute]() : null;
    return this.props.searchEvents;
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
              searchEvents: this.delegateAsyncCallback(this.props.location.pathname),
              addEventToFavorites: (evt) => Utils.addEventToFavorites(this.props.updateSingleEvent, evt)
            })
          }
        </main>
      </div>
    );
  }
};
