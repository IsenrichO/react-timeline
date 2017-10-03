import React from 'react';
import PropTypes from 'prop-types';

const TimelineEventPage = ({
  history,
  location,
  match: { params: { uuid } },
}) => (
  <h1>Event UUID: { uuid }</h1>
);

TimelineEventPage.displayName = 'TimelineEventPage';

TimelineEventPage.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.shape({
    param: PropTypes.shape({
      uuid: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default TimelineEventPage;
