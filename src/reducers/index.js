'use strict';
import { reducer as formReducer } from 'redux-form';
import eventEditingModalData from './logEventModalData';
import eventEditingModalState from './editEventModal';
import seedDataAggregator from './seedDataAggregator';
import batchSelectionState from './batchSelectionState';
import batchSelectionItems from './batchSelectionItems';
import searchEvents from './searchEvents';
import cloudinaryImageStore from './cloudinaryImageStore';
import eventTags from './eventTags';


export default {
  form: formReducer,
  eventEditingModalData,
  eventEditingModalState,
  seedDataAggregator,
  batchSelectionState,
  batchSelectionItems,
  searchEvents,
  cloudinaryImageStore,
  eventTags
};
