import axios from 'axios';

import { API_CONFIG } from 'constants/config';
import { handleErrors } from 'utils/api';

// objects
export const GET_EMOTIONS_PENDING = 'GET_EMOTIONS_PENDING';
export const GET_EMOTIONS_FAIL = 'GET_EMOTIONS_FAIL';
export const GET_EMOTIONS_SUCCESS = 'GET_EMOTIONS_SUCCESS';


export const getEmotions = (
  params = {
    search: null,
  },
  seamless = false,
) => async (dispatch) => {
  dispatch({
    type: GET_EMOTIONS_PENDING,
    // we've disabled loading if 'seamless' option is present because we need seamless ordering
    payload: seamless ? { ...params, loading: false, loaded: true } : params,
  });
  const fetchUrl = `${API_CONFIG.API_BASE}${API_CONFIG.API_VERSIONS.V1}core/emotions/`;

  try {
    const response = await axios.get(`${fetchUrl}`, { params, withCredentials: true });
    dispatch({
      type: GET_EMOTIONS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    handleErrors(error, dispatch);
  }
};
