import {
  SET_IS_SENDING,
} from './actionTypes';


let initialState = {
  isSending: false,
};


export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_SENDING: {
      console.log('IS_LOGGED is ', action.isSending)
      console.log('state is ', state)
      return {
        ...state, isSending: action.isSending
      }
    }

    default:
      return state;
  }
};


export const setIsSending = (isSending) => ({type: SET_IS_SENDING, isSending });

