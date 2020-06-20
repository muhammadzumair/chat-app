import {combineReducers} from 'redux';
import AuthReducer from './Reducer/AuthReducer';
import UserReducer from './Reducer/UserReducer';
import ActiveChatReducer from './Reducer/ActiveChatReducer';

export default combineReducers({
  AuthReducer,
  UserReducer,
  ActiveChatReducer,
});
