import { ON_FAILED_REQUEST } from 'redux/actions/errorsActions';


// eslint-disable-next-line import/prefer-default-export
export const handleErrors = (error, dispatch) => {
  if (error.response && error.response.status === 403) {
    dispatch({
      type: ON_FAILED_REQUEST,
      payload: error.response,
    });
  } else if (error.response && error.response.status === 400) {
    dispatch({
      type: ON_FAILED_REQUEST,
      payload: error.response,
    });
  } else if (error.response && error.response.status === 500) {
    dispatch({
      type: ON_FAILED_REQUEST,
      payload: error.response,
    });
  }
  // TODO parse errors here and return error text and status
  return error;
};
