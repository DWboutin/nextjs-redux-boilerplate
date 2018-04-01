import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import application from '../reducers/application-reducer';
import example from '../reducers/example-reducer';

const reducers = combineReducers({
  form: formReducer,
  // add other reducers here
  application,
  example,
});

export default reducers;
