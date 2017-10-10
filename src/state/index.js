import { reducer as formReducer } from 'redux-form';
import batchSelectState, {
  BatchSelectActionCreators,
  BatchSelectActionCreatorPropTypes,
  BatchSelectActionTypes,
  BatchSelectStateInitializer,
  BatchSelectStatePropTypes,
} from './batchSelectionItems';
import cloudinaryState, {
  CloudinaryActionCreators,
  CloudinaryActionCreatorPropTypes,
  CloudinaryActionTypes,
  CloudinaryStateInitializer,
  CloudinaryStatePropTypes,
} from './cloudinaryImageStore';
import eventModalState, {
  EventModalActionCreators,
  EventModalActionCreatorPropTypes,
  EventModalActionTypes,
  EventModalStateInitializer,
  EventModalStatePropTypes,
} from './eventModal';
import eventTags, {
  EventTagsActionCreators,
  EventTagsActionCreatorPropTypes,
  EventTagsActionTypes,
  EventTagsStateInitializer,
  EventTagsStatePropTypes,
} from './eventTags';
import searchEvents, {
  SearchEventsActionCreators,
  SearchEventsActionCreatorPropTypes,
  SearchEventsActionTypes,
  SearchEventsStateInitializer,
  SearchEventsStatePropTypes,
} from './searchEvents';
import seedDataAggregator, {
  SourceEventDataActionCreators,
  SourceEventDataActionCreatorPropTypes,
  SourceEventDataActionTypes,
  SourceEventDataStateInitializer,
  SourceEventDataStatePropTypes,
} from './sourceEventData';

/* ROOT REDUCER */
export default {
  batchSelectState,
  cloudinaryState,
  eventModalState,
  eventTags,
  form: formReducer,
  searchEvents,
  seedDataAggregator,
};

/* AGGREGATE EXPORTS */
const AllActionCreators = {
  ...BatchSelectActionCreators,
  ...CloudinaryActionCreators,
  ...EventModalActionCreators,
  ...EventTagsActionCreators,
  ...SearchEventsActionCreators,
  ...SourceEventDataActionCreators,
};
const AllActionTypes = {
  ...BatchSelectActionTypes,
  ...CloudinaryActionTypes,
  ...EventModalActionTypes,
  ...EventTagsActionTypes,
  ...SearchEventsActionTypes,
  ...SourceEventDataActionTypes,
};
const AllActionCreatorPropTypes = {
  BatchSelectActionCreatorPropTypes,
  CloudinaryActionCreatorPropTypes,
  EventModalActionCreatorPropTypes,
  EventTagsActionCreatorPropTypes,
  SearchEventsActionCreatorPropTypes,
  SourceEventDataActionCreatorPropTypes,
};
const AllStateInitializers = {
  BatchSelectStateInitializer,
  CloudinaryStateInitializer,
  EventModalStateInitializer,
  EventTagsStateInitializer,
  SearchEventsStateInitializer,
  SourceEventDataStateInitializer,
};
const AllStatePropTypes = {
  BatchSelectStatePropTypes,
  CloudinaryStatePropTypes,
  EventModalStatePropTypes,
  EventTagsStatePropTypes,
  SearchEventsStatePropTypes,
  SourceEventDataStatePropTypes,
};

export {
  AllActionCreators,
  AllActionCreatorPropTypes,
  AllActionTypes,
  AllStateInitializers,
  AllStatePropTypes,
};
