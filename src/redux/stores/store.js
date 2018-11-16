import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from '../reducers/reducers';
import initialState from '../stores/defaultState';

const createStoreWithMiddleWare = applyMiddleware(
  thunkMiddleware,
)(createStore);

const store = createStoreWithMiddleWare(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;
