import {NEW_PET} from '../actions/pet.action';

const INITIAL_STATE = {
  userId: null,
};

const PetReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NEW_PET:
      return {
        ...state,
        userId: action.user.userId,
      };
    default:
      return state;
  }
};

export default PetReducer;
