import { intlReducer } from 'react-intl-redux';
import { combineReducers } from 'redux';

const reducer = combineReducers({
  ...reducers,
  intl: intlReducer,
});

export default reducer;
