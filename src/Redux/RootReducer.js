import {combineReducers} from 'redux';
import AuthReducer from './Reducer/AuthReducer';
import FbLoginReducer from './Reducer/FbLoginReducer';

export default combineReducers({
  AuthReducer,
  FbLoginReducer,
});
