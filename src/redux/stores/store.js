import { createStore } from 'redux';
import reducer from '../reducers/reducers';
import initialState from '../stores/defaultState';

const store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;
