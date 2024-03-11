import { createStore, combineReducers } from 'redux';
import { loginReducer } from './LoginReducer';

const rootReducer = combineReducers({
  // Add more reducers when needed
  login: loginReducer,
});

const store = createStore(rootReducer);

export default store;
