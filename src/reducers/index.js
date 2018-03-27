import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import example from '../reducers/example-reducer';

const reducers = combineReducers({
  form: formReducer,
  // add other reducers here
  example,
});

export default reducers;
