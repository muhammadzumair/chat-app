import {combineReducers} from 'redux';
import AuthReducer from './Reducer/AuthReducer';
import UserReducer from './Reducer/UserReducer';

export default combineReducers({
  AuthReducer,
  UserReducer,
});
