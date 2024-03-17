import { createStore, combineReducers } from 'redux';
import { loginReducer } from './LoginReducer';
import { username } from './UsernameReducer';

const rootReducer = combineReducers({
  // Add more reducers when needed
  login: loginReducer,
  username: username,
});

const store = createStore(rootReducer);

export default store;
