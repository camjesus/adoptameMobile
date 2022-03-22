import {NEW_USER, SIGNUP, CHECK_USER_ID} from '../actions/auth.action';

const INITIAL_STATE = {
  userId: null,
};

const AuthReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NEW_USER:
      return {
        ...state,
        userId: action.user.userId,
      };
    case SIGNUP:
      return {
        ...state,
        userId: action.userId,
      };
    case CHECK_USERID:
      return {
        ...state,
        userId: action.userId,
      };
    default:
      return state;
  }
};

export default AuthReducer;
