import { createStore, combineReducers } from 'redux';
import { loginReducer } from './LoginReducer';
import { username } from './UsernameReducer';
import { userid } from './UseridReducer';

const rootReducer = combineReducers({
  // Add more reducers when needed
  login: loginReducer,
  username: username,
  userid: userid,
});

const store = createStore(rootReducer);

export default store;
