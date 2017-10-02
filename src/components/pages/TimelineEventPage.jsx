import React, { Component } from 'react';

const TimelineEventPage = ({ history, location, match: { params: { uuid }} }) => (
  <h1>Event UUID: { uuid }</h1>
);

export default TimelineEventPage;
