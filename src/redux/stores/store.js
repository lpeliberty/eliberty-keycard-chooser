import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

const createStoreWithMiddleWare = applyMiddleware(
  thunkMiddleware,
)(createStore);

const store = createStoreWithMiddleWare(
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;
