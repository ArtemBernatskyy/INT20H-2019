// object
export const EXAMPLE_PENDING = 'EXAMPLE_PENDING';
export const EXAMPLE_FAIL = 'EXAMPLE_FAIL';
export const EXAMPLE_SUCCESS = 'EXAMPLE_SUCCESS';


export const exampleAction = () => (dispatch) => {
  dispatch({
    type: 'SIMPLE_ACTION',
    payload: 'result_of_simple_action',
  });
};
