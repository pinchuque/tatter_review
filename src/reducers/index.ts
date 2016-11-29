import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
const ReduxForm = require('redux-form');
import createProject from './create-project';
const rootReducer = combineReducers({
  createProject,
  routing: routerReducer,
  form : ReduxForm.reducer
});

export default rootReducer;