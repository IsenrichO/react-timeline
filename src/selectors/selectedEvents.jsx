'use strict';
import { createSelector } from 'reselect';


// Create selection functions to identify and pick off those pieces of state
//  relevant to the intended derived calculation/state:
const eventsSelector = (state) => state.seedDataAggregator;
const batchEventsSelector = (state) => state.batchSelectionItems;

const getBatchEvents = (evts, selectedEvts) => evts.filter(evt => selectedEvts.includes(evt));

export default createSelector(
  eventsSelector,       // Retrieve some set of managed data (state)
  batchEventsSelector,  // Retrieve a subset of the previous data
  getBatchEvents        // Composable function holding select logic
);
