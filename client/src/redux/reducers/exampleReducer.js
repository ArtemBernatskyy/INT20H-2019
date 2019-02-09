import {
  EXAMPLE_PENDING,
  EXAMPLE_FAIL,
  EXAMPLE_SUCCESS,
} from 'redux/actions/exampleActions';


const initialState = {
  example: {
    loading: false,
    loaded: true,
  },
};


const exampleReducer = (state = initialState.example, action) => {
  switch (action.type) {
    case EXAMPLE_PENDING:
      return {
        loading: true,
        loaded: false,
      };
    case EXAMPLE_SUCCESS:
      return {
        loading: false,
        loaded: true,
        ...action.payload,
      };
    case EXAMPLE_FAIL:
      return {
        loading: false,
        loaded: true,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default exampleReducer;
