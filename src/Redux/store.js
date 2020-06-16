import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './RootReducer';

const middleware = applyMiddleware(thunk);

export default store = createStore(rootReducer, middleware);
