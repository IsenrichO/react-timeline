import PropTypes from 'prop-types';

/* TYPE-CHECKING UTILS */
export const constructRoutePropTypesWithParams = (...paramKeys) => PropTypes.shape({
  isExact: PropTypes.bool.isRequired,
  params: PropTypes.shape(paramKeys.reduce((acc, curr) => ({
    [String(curr)]: PropTypes.string.isRequired,
  }), {})).isRequired,
  path: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
});

export const nullable = (...propTypes) => PropTypes.oneOfType([
  PropTypes.oneOf([null, undefined]),
  ...propTypes,
]);

/* PREDEFINED PROP-TYPE VALUES */
export const childrenPropTypes = nullable(
  PropTypes.element,
  PropTypes.node,
  PropTypes.string,
);

export const stylePropTypes = nullable(
  PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
  ),
);

/* IMAGE MEDIA PROP-TYPES */
export const cloudinaryImagePropTypes = PropTypes.shape({
  access_mode: PropTypes.oneOf([
    'private',
    'public',
  ]).isRequired,
  bytes: PropTypes.number,
  created_at: PropTypes.string.isRequired,
  format: PropTypes.oneOf([
    'bmp',
    'gif',
    'jpg',
    'png',
    'svg',
  ]).isRequired,
  height: PropTypes.number.isRequired,
  public_id: PropTypes.string.isRequired,
  resource_type: PropTypes.oneOf([
    'image',
    'video',
  ]).isRequired,
  secure_url: PropTypes.string.isRequired,
  type: PropTypes.string,
  url: PropTypes.string.isRequired,
  version: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
});

export const cloudinaryImageDataPropTypes = PropTypes.shape({
  images: PropTypes.arrayOf(nullable(cloudinaryImagePropTypes)),
  name: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
});

export const cloudinaryPropTypes = PropTypes.objectOf(cloudinaryImageDataPropTypes);

/* ROUTER PROP-TYPES */
export const browserLocationPropTypes = PropTypes.shape({
  hash: PropTypes.string.isRequired,
  key: PropTypes.string,
  pathname: PropTypes.string.isRequired,
  search: PropTypes.string.isRequired,
});

export const historyPropTypes = PropTypes.shape({
  action: PropTypes.oneOf([
    'POP',
    'PUSH',
    'REPLACE',
  ]),
  block: PropTypes.func.isRequired,
  createHref: PropTypes.func.isRequired,
  go: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
  goForward: PropTypes.func.isRequired,
  length: PropTypes.number.isRequired,
  listen: PropTypes.func.isRequired,
  location: browserLocationPropTypes.isRequired,
  push: PropTypes.func.isRequired,
  replace: PropTypes.func.isRequired,
});

export const routeMatchPropTypes = PropTypes.shape({
  isExact: PropTypes.bool.isRequired,
  params: PropTypes.objectOf(PropTypes.string),
  path: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
});

/* EVENT PROP-TYPES */
export const eventLayoutPropTypes = nullable(PropTypes.oneOf([
  'grid',
  'hybrid',
  'modern',
]));

export const tlEventPropTypes = PropTypes.shape({
  coverImageId: nullable(PropTypes.string),
  date: PropTypes.string,
  dateModified: nullable(PropTypes.string),
  description: nullable(PropTypes.arrayOf(PropTypes.string)),
  eventId: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  layout: eventLayoutPropTypes,
  links: PropTypes.arrayOf(PropTypes.object),
  location: nullable(PropTypes.string),
  name: PropTypes.string.isRequired,
  photoCount: PropTypes.number,
  photos: nullable(PropTypes.arrayOf(PropTypes.string)),
  starred: PropTypes.bool.isRequired,
  tags: nullable(PropTypes.arrayOf(PropTypes.string)),
  type: PropTypes.string,
  uuid: PropTypes.string.isRequired,
});

/* CATEGORIZED EXPORTS */
export const TypeCheckUtils = {
  constructRoutePropTypesWithParams,
  nullable,
};

export const SharedPropTypes = {
  browserLocationPropTypes,
  childrenPropTypes,
  cloudinaryImageDataPropTypes,
  cloudinaryImagePropTypes,
  cloudinaryPropTypes,
  eventLayoutPropTypes,
  historyPropTypes,
  routeMatchPropTypes,
  stylePropTypes,
  tlEventPropTypes,
};

/* COMPILED DEFAULT EXPORT */
export default {
  ...SharedPropTypes,
  ...TypeCheckUtils,
};
