export const Events = '/api/events';
export const SingleEvent = '/api/events/:uuid';
export const EditEvent = '/api/events/edit/:uuid';
export const SearchAllEvents = '/api/search';
export const AllEvents = '/api/search/';
export const RecentlyModifiedEvents = '/api/search/recent';
export const StarredEvents = '/api/search/starred';
export const Photos = '/api/photos';
export const Tags = '/api/tags';

const getSingleEvent = (uuid) => `/api/events/${uuid}`;
const getEditEvent = (uuid) => `/api/events/edit/${uuid}`;

export { getSingleEvent, getEditEvent };
