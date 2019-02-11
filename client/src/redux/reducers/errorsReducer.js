import { ON_FAILED_REQUEST } from 'redux/actions/errorsActions';


const initialState = {
  message: null,
  status: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ON_FAILED_REQUEST:
      return {
        message: action.payload.data,
        status: action.payload.status,
      };
    default:
      return state;
  }
}
