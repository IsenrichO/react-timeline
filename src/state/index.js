import { reducer as formReducer } from 'redux-form';
import appState, {
  AppActionCreators,
  AppActionCreatorPropTypes,
  AppActionTypes,
  AppStateInitializer,
  AppStatePropTypes,
} from './app';
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
import eventEditorState, {
  EventEditorActionCreators,
  EventEditorActionCreatorPropTypes,
  EventEditorActionTypes,
  EventEditorStatePropTypes,
  EventEditorStateInitializer,
} from './eventEditor';
import eventModalState, {
  EventModalActionCreators,
  EventModalActionCreatorPropTypes,
  EventModalActionTypes,
  EventModalStateInitializer,
  EventModalStatePropTypes,
} from './eventModal';
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
import tags, {
  TagsActionCreators,
  TagsActionCreatorPropTypes,
  TagsActionTypes,
  TagsStateInitializer,
  TagsStatePropTypes,
} from './tags';

/* ROOT REDUCER */
export default {
  appState,
  batchSelectState,
  cloudinaryState,
  eventEditorState,
  eventModalState,
  form: formReducer,
  searchEvents,
  seedDataAggregator,
  tags,
};

/* AGGREGATE EXPORTS */
const AllActionCreators = {
  ...AppActionCreators,
  ...BatchSelectActionCreators,
  ...CloudinaryActionCreators,
  ...EventEditorActionCreators,
  ...EventModalActionCreators,
  ...SearchEventsActionCreators,
  ...SourceEventDataActionCreators,
  ...TagsActionCreators,
};

const AllActionTypes = {
  ...AppActionTypes,
  ...BatchSelectActionTypes,
  ...CloudinaryActionTypes,
  ...EventEditorActionTypes,
  ...EventModalActionTypes,
  ...SearchEventsActionTypes,
  ...SourceEventDataActionTypes,
  ...TagsActionTypes,
};

const AllActionCreatorPropTypes = {
  AppActionCreatorPropTypes,
  BatchSelectActionCreatorPropTypes,
  CloudinaryActionCreatorPropTypes,
  EventEditorActionCreatorPropTypes,
  EventModalActionCreatorPropTypes,
  SearchEventsActionCreatorPropTypes,
  SourceEventDataActionCreatorPropTypes,
  TagsActionCreatorPropTypes,
};

const AllStateInitializers = {
  AppStateInitializer,
  BatchSelectStateInitializer,
  CloudinaryStateInitializer,
  EventEditorStateInitializer,
  EventModalStateInitializer,
  SearchEventsStateInitializer,
  SourceEventDataStateInitializer,
  TagsStateInitializer,
};

const AllStatePropTypes = {
  AppStatePropTypes,
  BatchSelectStatePropTypes,
  CloudinaryStatePropTypes,
  EventEditorStatePropTypes,
  EventModalStatePropTypes,
  SearchEventsStatePropTypes,
  SourceEventDataStatePropTypes,
  TagsStatePropTypes,
};

export {
  AllActionCreators,
  AllActionCreatorPropTypes,
  AllActionTypes,
  AllStateInitializers,
  AllStatePropTypes,
};
