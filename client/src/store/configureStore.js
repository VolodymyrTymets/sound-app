import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import ReduxThunk from 'redux-thunk';

import rootReducer from '../reducers';

const createStoreWithMiddlware = applyMiddleware(ReduxPromise, ReduxThunk)(createStore);

export default function configureStore(initialState) {
  const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
  if (process.env.NODE_ENV === 'production') {
    return createStoreWithMiddlware(
      rootReducer,
      initialState,
    );
  }
  return createStoreWithMiddlware(
    rootReducer,
    initialState,
    devTools
  );
}
