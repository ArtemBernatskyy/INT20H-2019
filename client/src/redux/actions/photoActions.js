import axios from 'axios';

import { API_CONFIG } from 'constants/config';
import { handleErrors } from 'utils/api';

// objects
export const GET_PHOTOS_PENDING = 'GET_PHOTOS_PENDING';
export const GET_PHOTOS_FAIL = 'GET_PHOTOS_FAIL';
export const GET_PHOTOS_SUCCESS = 'GET_PHOTOS_SUCCESS';


export const getPhotos = (
  params = {
    search: null,
    emotions: null,
  },
  seamless = false,
) => async (dispatch) => {
  dispatch({
    type: GET_PHOTOS_PENDING,
    // we've disabled loading if 'seamless' option is present because we need seamless ordering
    payload: seamless ? { ...params, loading: false, loaded: true } : params,
  });
  const fetchUrl = `${API_CONFIG.API_BASE}${API_CONFIG.API_VERSIONS.V1}core/photos/`;

  try {
    const response = await axios.get(`${fetchUrl}`, { params, withCredentials: true });
    dispatch({
      type: GET_PHOTOS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    handleErrors(error, dispatch);
  }
};
