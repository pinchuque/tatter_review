import { createStore,
  applyMiddleware,
  compose,
  Middleware } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';

import rootReducer from '../reducers';
import promiseMiddleware from 'redux-promise-middleware';
import logger from './logger';
declare const __DEV__: boolean; // from webpack

function configureStore(initialState) {
    const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(..._getMiddleware()))
    );
  return store;
}
function _getMiddleware() {
  let middleware = [
    routerMiddleware(browserHistory),
    thunk,
    promiseMiddleware()
  ];
  middleware = [...middleware, logger]; //this is for debug mode only 
  
  return middleware;
}
export default configureStore;