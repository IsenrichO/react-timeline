import { constructApiEndpoint } from '../../server/utils';

export const Events = '/api/events';
export const SingleEvent = '/api/events/:uuid';
export const EditEvent = '/api/events/edit/:uuid';
export const SearchAllEvents = '/api/search';
export const AllEvents = '/api/search/';
export const RecentlyModifiedEvents = '/api/search/recent';
export const StarredEvents = '/api/search/starred';
export const Photos = '/api/photos';
export const Tags = '/api/tags';

export const getSingleEvent = (uuid) => `/api/events/${uuid}`;
export const getEditEvent = (uuid) => `/api/events/edit/${uuid}`;

// export const Events = constructApiEndpoint('events');
// export const SingleEvent = constructApiEndpoint('events/:uuid');
// export const EditEvent = constructApiEndpoint('events/edit/:uuid');
// export const SearchAllEvents = constructApiEndpoint('search');
// export const AllEvents = constructApiEndpoint('search/');
// export const RecentlyModifiedEvents = constructApiEndpoint('search/recent');
// export const StarredEvents = constructApiEndpoint('search/starred');
// export const Photos = constructApiEndpoint('photos');
// export const Tags = constructApiEndpoint('tags');

// export const getSingleEvent = (uuid) => constructApiEndpoint(`events/${uuid}`);
// export const getEditEvent = (uuid) => constructApiEndpoint(`events/edit/${uuid}`);

export default {
  getEditEvent,
  getSingleEvent,
};
