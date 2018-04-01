import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import reducers from '../reducers';

export default (initialState) => {
  const store = createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware)),
  );

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      // noinspection Eslint
      console.log('Replacing reducer');
      store.replaceReducer(require('../reducers').default);
    });
  }

  return store;
};
