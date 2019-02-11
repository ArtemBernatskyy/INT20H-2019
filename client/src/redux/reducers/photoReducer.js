import {
  GET_PHOTOS_PENDING,
  GET_PHOTOS_FAIL,
  GET_PHOTOS_SUCCESS,
} from '../actions/photoActions';


const initialState = {
  photos: {
    loading: true,
    loaded: false,
    count: null,
    next: null,
    previous: null,
    results: [],
  },
};


// eslint-disable-next-line import/prefer-default-export
export const photosReducer = (state = initialState.photos, action) => {
  switch (action.type) {
    case GET_PHOTOS_PENDING:
      return {
        ...state,
        loading: true,
        loaded: false,
        ...action.payload,
      };
    case GET_PHOTOS_FAIL:
      return {
        loading: false,
        loaded: true,
        ...action.payload,
      };
    case GET_PHOTOS_SUCCESS:
      return {
        loading: false,
        loaded: true,
        ...action.payload,
      };
    default:
      return state;
  }
};
