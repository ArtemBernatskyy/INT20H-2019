import {
  combineReducers, createStore, compose, applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';

import {
  photosReducer,
  errorsReducer,
  emotionsReducer,
} from 'redux/reducers';


const middlewares = [thunk];


// eslint-disable-next-line
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const reducer = combineReducers({
  errors: errorsReducer,
  photos: photosReducer,
  emotions: emotionsReducer,
});


const store = createStore(
  reducer,
  // compose(applyMiddleware(...middlewares)),
  composeEnhancer(applyMiddleware(...middlewares)),
);

export default store;
