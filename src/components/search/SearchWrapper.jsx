'use strict';
import React, { Component, cloneElement } from 'react';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import SearchSidebar from './SearchSidebar';
import { updateSingleEvent, fetchCloudinaryImageData } from '../../actions/asyncActions';
import Utils from '../../utilities/index';


@connect(
  ({ seedDataAggregator, searchEvents, cloudinaryImageStore }) => ({ seedDataAggregator, searchEvents, cloudinaryImageStore }),
  (dispatch) => bindActionCreators({
    updateSingleEvent,
    fetchCloudinaryImageData,
    push
  }, dispatch)
)
export default class SearchWrapper extends Component {
  constructor(props) {
    super(props);
  }

  delegateAsyncCallback(path) {
    const pathRoute = path.replace(/^\/search\//, '');
    return this.props.searchEvents;
  }

  componentDidMount() {
    // this.props.fetchCloudinaryImageData('Unsigned');
  }

  render() {
    return (
      <div>
        <SearchSidebar reroute={ (path) => this.props.push(`${path}`) } />
        <main id="search-main">
          {
            cloneElement(this.props.children, {
              key: this.props.location.pathname,
              eventsStore: this.props.seedDataAggregator,
              searchEvents: this.delegateAsyncCallback(this.props.location.pathname),
              updateSingleEvent: ::this.props.updateSingleEvent,
              addEventToFavorites: (evt) => Utils.addEventToFavorites(this.props.updateSingleEvent, evt),
              imageData: this.props.cloudinaryImageStore
            })
          }
        </main>
      </div>
    );
  }
};
