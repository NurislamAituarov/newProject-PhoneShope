import { createStore, combineReducers } from 'redux';
import reducer from './reducers/reducer';
import phoneChange from './reducers/phone-change';

const store = createStore(
  combineReducers({ reducer, phoneChange }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
export default store;
