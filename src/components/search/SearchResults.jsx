import React from 'react';
import PropTypes from 'prop-types';
import { ClassNamesPropType } from 'aesthetic';
import Utils from '../../utilities/index';

const SearchResults = ({
  classNames,
  eventsStore,
  imageStore,
  searchEvents,
  updateSingleEvent,
}) => (
  <ul className="evt-search-starred">
    {Utils.renderStarredEvents(searchEvents, eventsStore, updateSingleEvent, imageStore)}
  </ul>
);

SearchResults.displayName = 'SearchResults';

SearchResults.propTypes = {
  classNames: ClassNamesPropType.isRequired,
  eventsStore: PropTypes.arrayOf(PropTypes.object).isRequired,
  imageStore: PropTypes.objectOf(PropTypes.object).isRequired,
  searchEvents: PropTypes.arrayOf(PropTypes.object).isRequired,
  updateSingleEvent: PropTypes.func.isRequired,
};

SearchResults.defaultProps = {};

export default SearchResults;
