import {createStore, combineReducers, applyMiddleware} from 'redux';
import AuthReducer from './reducers/auth.reducer';
import PetReducer from './reducers/pet.reducer';
import thunk from 'redux-thunk';

const RootReducer = combineReducers({
  auth: AuthReducer,
  pet: PetReducer,
});

export default createStore(RootReducer, applyMiddleware(thunk));
