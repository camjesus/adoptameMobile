import {createStore, combineReducers, applyMiddleware} from 'redux';
import AuthReducer from './reducers/auth.reducer';
import thunk from 'redux-thunk';

const RootReducer = combineReducers({
  auth: AuthReducer,
});

export default createStore(RootReducer, applyMiddleware(thunk));
