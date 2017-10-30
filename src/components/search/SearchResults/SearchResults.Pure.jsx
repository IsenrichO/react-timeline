import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { ClassNamesPropType } from 'aesthetic';
import { get, isUndefined, size } from 'lodash';
import TLEvent from '../../TLEvent';
// import SingleEvent from '../SingleEvent';
import { fetchSeedData } from '../../../actions/asyncActions';
// import { fetchAllCloudinary, fetchCloudinaryImageData } from '../../../state/cloudinaryImageStore';
import { CloudinaryActionCreators, CloudinaryActionCreatorPropTypes, CloudinaryStateInitializer, CloudinaryStatePropTypes } from '../../../state/cloudinaryImageStore';
import { EventModalActionCreators, EventModalActionCreatorPropTypes, EventModalStateInitializer, EventModalStatePropTypes } from '../../../state/eventModal';
import { SearchEventsActionCreators, SearchEventsActionCreatorPropTypes, SearchEventsStateInitializer, SearchEventsStatePropTypes } from '../../../state/searchEvents';
import { SourceEventDataActionCreators, SourceEventDataActionCreatorPropTypes, SourceEventDataStateInitializer, SourceEventDataStatePropTypes } from '../../../state/sourceEventData';
import { TagsActionCreators, TagsActionCreatorPropTypes, TagsStateInitializer, TagsStatePropTypes } from '../../../state/tags';

import { getStarGlyphClass } from '../../../util/general';

@connect(
  ({ cloudinaryState, eventModalState, form, searchEvents, seedDataAggregator }) => ({
    cloudinaryState,
    eventModalState,
    form,
    searchEvents,
    seedDataAggregator,
  }),
  (dispatch) => ({
    cloudinaryActions: bindActionCreators(CloudinaryActionCreators, dispatch),
    eventModalActions: bindActionCreators(EventModalActionCreators, dispatch),
    searchEventsActions: bindActionCreators(SearchEventsActionCreators, dispatch),
    sourceEventDataActions: bindActionCreators(SourceEventDataActionCreators, dispatch),
    //   bindActionCreators({
    //   fetchAllCloudinary,
    //   fetchCloudinaryImageData,
    //   fetchSeedData,
    //   updateSingleEvent,
    // }, dispatch),
  }),
)
export default class SearchResults extends Component {
  static displayName = 'SearchResults';

  static propTypes = {
    classNames: ClassNamesPropType.isRequired,
    cloudinaryActions: CloudinaryActionCreatorPropTypes,
    cloudinaryState: CloudinaryStatePropTypes,
    eventModalActions: EventModalActionCreatorPropTypes,
    eventModalState: EventModalStatePropTypes,
    searchEvents: SearchEventsStatePropTypes,
    searchEventsActions: SearchEventsActionCreatorPropTypes,
    seedDataAggregator: PropTypes.arrayOf(PropTypes.object).isRequired,
    sourceEventDataActions: SourceEventDataActionCreatorPropTypes,
    sourceEventDataState: SourceEventDataStatePropTypes,
    tagsActions: TagsActionCreatorPropTypes,
    tagsState: TagsStatePropTypes,
    // imageStore: PropTypes.arrayOf(PropTypes.object),
    // searchEvents: PropTypes.arrayOf(PropTypes.object),
    // updateSingleEvent: PropTypes.func.isRequired,
  };

  static defaultProps = {
    cloudinaryActions: CloudinaryActionCreators,
    cloudinaryState: CloudinaryStateInitializer,
    eventModalActions: EventModalActionCreators,
    eventModalState: EventModalStateInitializer,
    searchEvents: SearchEventsStateInitializer,
    searchEventsActions: SearchEventsActionCreators,
    seedDataAggregator: [],
    sourceEventDataActions: SourceEventDataActionCreators,
    sourceEventDataState: SourceEventDataStateInitializer,
    tagsActions: TagsActionCreators,
    tagsState: TagsStateInitializer,
    // imageStore: [],
    // searchEvents: [],
  };

  constructor(props) {
    super(props);

    this.changeEventBackgroundImage = ::this.changeEventBackgroundImage;
    this.getMyImgs = ::this.getMyImgs;
  }

  componentWillMount() {
    const { fetchRecentlyModifiedEvents, fetchStarredEvents } = this.props.searchEventsActions;

    return fetchStarredEvents()
      && fetchRecentlyModifiedEvents();
  }

  getMyImgs(uuid) {
    const { cloudinaryState } = this.props;
    return !!cloudinaryState.hasOwnProperty(uuid) && !!cloudinaryState[uuid].images.length
      ? cloudinaryState[uuid].images
      : null;
  }

  changeEventBackgroundImage(imgUrl) {
    const { setNewBackgroundImage } = this.props.cloudinaryActions;
    setNewBackgroundImage(imgUrl);
  }

  //
  renderFilteredEvents() {
    const {
      classNames,
      cloudinaryState,
      match: { params: { filter } },
      searchEvents, // : { all, recent, starred },
      sourceEventDataActions: { updateSingleEvent },
      seedDataAggregator,
    } = this.props;

    return (!isUndefined(filter) ? searchEvents[filter.toLowerCase()] : seedDataAggregator)
      .map(({ starred, uuid, ...evt }, index) => (
        <TLEvent
          key={`SearchEventCard${uuid}`}
          withNumeral
          addEventToFavorites={() => updateSingleEvent({ starred: !starred, uuid })}
          cloudinaryImageStore={cloudinaryState}
          evt={{ starred, uuid, ...evt }}
          evtClassName={classNames.searchResultEvent}
          getMyImgs={this.getMyImgs}
          getStarGlyphClass={getStarGlyphClass(seedDataAggregator, uuid)} // getStarGlyphClass(eventsStore, uuid)}
          hasMultipleTags={false} // {hasMultipleTags(eventsStore, uuid)}
          imageData={get(cloudinaryState, uuid, {})}
          imageStore={cloudinaryState[uuid]}
          index={index}
          setNewBackgroundImage={this.changeEventBackgroundImage}
        />
      ));
  }

  render() {
    const { classNames, seedDataAggregator } = this.props;
    const MAX_CARD_HEIGHT = 450;

    return (
      <ul
        className={classNames.searchResultsContainer}
        style={{
          maxHeight: MAX_CARD_HEIGHT * Math.ceil(size(seedDataAggregator) / 2),
        }}
      >
        {this.renderFilteredEvents()}
      </ul>
    );
  }
}
