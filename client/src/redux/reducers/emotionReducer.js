import {
  GET_EMOTIONS_PENDING,
  GET_EMOTIONS_FAIL,
  GET_EMOTIONS_SUCCESS,
} from '../actions/emotionActions';


const initialState = {
  emotions: {
    loading: true,
    loaded: false,
    count: null,
    next: null,
    previous: null,
    results: [],
  },
};


// eslint-disable-next-line import/prefer-default-export
export const emotionsReducer = (state = initialState.emotions, action) => {
  switch (action.type) {
    case GET_EMOTIONS_PENDING:
      return {
        ...state,
        loading: true,
        loaded: false,
        ...action.payload,
      };
    case GET_EMOTIONS_FAIL:
      return {
        loading: false,
        loaded: true,
        ...action.payload,
      };
    case GET_EMOTIONS_SUCCESS:
      return {
        loading: false,
        loaded: true,
        ...action.payload,
      };
    default:
      return state;
  }
};
