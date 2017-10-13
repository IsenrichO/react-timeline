import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ClassNamesPropType } from 'aesthetic';
import SingleEvent from '../SingleEvent';
import { fetchSeedData } from '../../../actions/asyncActions';
import { fetchAllCloudinary, fetchCloudinaryImageData } from '../../../state/cloudinaryImageStore';
import { updateSingleEvent } from '../../../state/sourceEventData';
import { getStarGlyphClass } from '../../../util/general';

// const SearchResults = ({
//   classNames,
//   eventsStore,
//   imageStore,
//   searchEvents,
//   updateSingleEvent,
// }) => {

@connect(
  ({ cloudinaryState, searchEvents, seedDataAggregator }) => ({
    cloudinaryImageStore: cloudinaryState,
    searchEvents,
    seedDataAggregator,
  }),
  (dispatch) => bindActionCreators({
    fetchAllCloudinary,
    fetchCloudinaryImageData,
    fetchSeedData,
    updateSingleEvent,
  }, dispatch),
)
export default class SearchResults extends Component {
  static displayName = 'SearchResults';

  static propTypes = {
    classNames: ClassNamesPropType.isRequired,
    eventsStore: PropTypes.arrayOf(PropTypes.object).isRequired,
    imageStore: PropTypes.arrayOf(PropTypes.object),
    searchEvents: PropTypes.arrayOf(PropTypes.object),
    updateSingleEvent: PropTypes.func.isRequired,
  };

  static defaultProps = {
    imageStore: [],
    searchEvents: [],
  };

  //
  renderStarredEvents() {
    const { cloudinaryImageStore, updateSingleEvent, seedDataAggregator } = this.props;

    return seedDataAggregator.map((evt, index) => (
      <SingleEvent
        key={`SearchEventCard${evt.uuid}`}
        addEventToFavorites={() => updateSingleEvent({ starred: !evt.starred, uuid: evt.uuid })}
        evt={evt}
        getStarGlyphClass={getStarGlyphClass(seedDataAggregator, evt.uuid)} // getStarGlyphClass(eventsStore, evt.uuid)}
        hasMultipleTags={false} // {hasMultipleTags(eventsStore, evt.uuid)}
        imageStore={cloudinaryImageStore[evt.uuid]}
      />
    ));
  }

  render() {
    const { classNames } = this.props;

    return (
      <ul className={classNames.searchResultsStarred}>
        {this.renderStarredEvents()}
      </ul>
    );
  }
}
