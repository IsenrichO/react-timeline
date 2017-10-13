import Axios from 'axios';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import { cloneDeepWith, isEmpty, reduce } from 'lodash';
import { Photos } from '../routing/RoutePaths';
import { crudAsync2 } from '../actions/asyncActions';

/* ACTION TYPES */
export const FETCH_CLOUDINARY_IMAGES_SUCCESS = 'FETCH_CLOUDINARY_IMAGES_SUCCESS';
export const SET_BACKGROUND_IMAGE = 'SET_BACKGROUND_IMAGE';

/* ACTION CREATORS */
export const onFetchCloudinaryImagesSuccess = (payload) => ({
  payload,
  type: FETCH_CLOUDINARY_IMAGES_SUCCESS,
});

export const setNewBackgroundImage = (payload) => ({
  payload,
  type: SET_BACKGROUND_IMAGE,
});

/* ASYNC ACTION CREATORS */
// 
export const fetchAllCloudinary = () => (dispatch) =>
  crudAsync2(Axios.get, Photos, dispatch, onFetchCloudinaryImagesSuccess);

// 
export const fetchCloudinaryImageData = (list = 'Unsigned') => (dispatch) => Axios
  .get(`http://res.cloudinary.com/http-isenrich-io/image/list/${list}.json`)
  .then((resp) => {
    dispatch(onFetchCloudinaryImagesSuccess(resp.data));
  })
  .catch((err) => { console.error('ERROR ERROR:', err); });

// 
export const uploadToCloudinary = (evt, file, filePath) => (dispatch) =>
  crudAsync2(Axios.post, Photos, dispatch, null, { evt, title: file.name, url: filePath });

/* REDUCER */
const initialState = {};

export default (state = initialState, action = null) => {
  switch (action.type) {
    case FETCH_CLOUDINARY_IMAGES_SUCCESS: {
      const { subfolderNames = [], tlImages } = action.payload;
      const foldersObj = subfolderNames.reduce((memo, curr) => {
        const regTest = new RegExp(`^${curr.path}`);
        const images = tlImages.filter((img) => regTest.test(img.public_id));
        memo[curr.name] = Object.assign({}, curr, { images });
        return memo;
      }, {});

      return Object.assign({}, state, foldersObj);
    }

    case SET_BACKGROUND_IMAGE: {
      const { payload: imageUrl = '' } = action;

      const folderPath = imageUrl.replace(/^.+\/React-Timeline\/(.+)\/.+$/, '$1');
      const resetState = state[folderPath].images.map((img) => cloneDeepWith(img, ({ secure_url = '', ...evtImg }) => ({
        ...evtImg,
        isHeroImg: !isEmpty(secure_url) && (secure_url === imageUrl),
        secure_url,
      })));

      // const newFolderImages = state[folderPath].images.map((img) => img.secure_url === action.payload
      //     ? Object.assign({}, img, { isHeroImg: true })
      //     : img);
      // const newFolderPath = Object.assign({}, state[folderPath], { images: newFolderImages });

      return update(state, {
        [folderPath]: {
          $set: {
            ...(state[folderPath]),
            images: resetState,
          },
        },
      });
    }

    default:
      return state;
  }
};

/* EXPORTS */
const CloudinaryActionTypes = {
  FETCH_CLOUDINARY_IMAGES_SUCCESS,
  SET_BACKGROUND_IMAGE,
};
const CloudinaryActionCreators = {
  fetchAllCloudinary,
  fetchCloudinaryImageData,
  onFetchCloudinaryImagesSuccess,
  setNewBackgroundImage,
  uploadToCloudinary,
};
const CloudinaryActionCreatorPropTypes = PropTypes.shape({
  fetchAllCloudinary: PropTypes.func,
  fetchCloudinaryImageData: PropTypes.func,
  onFetchCloudinaryImagesSuccess: PropTypes.func,
  setNewBackgroundImage: PropTypes.func,
  uploadToCloudinary: PropTypes.func,
}).isRequired;
const CloudinaryStatePropTypes = PropTypes.objectOf(PropTypes.object);

export {
  CloudinaryActionCreators,
  CloudinaryActionCreatorPropTypes,
  CloudinaryActionTypes,
  CloudinaryStatePropTypes,
  initialState as CloudinaryStateInitializer,
};
