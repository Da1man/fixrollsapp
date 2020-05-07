import {
  SET_IS_SENDING,
  SET_CURRENT_USER_ID,
} from './actionTypes';


let initialState = {
  isSending: false,
  currentUserId: null,
  currentUserData: {
    name: '',
    email: '',
    address: '',
    image: '',
  },
};


export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_SENDING: {
      console.log('IS_LOGGED is ', action.isSending)
      return {
        ...state, isSending: action.isSending
      }
    }

    case SET_CURRENT_USER_ID: {
      // console.log('SET_CURRENT_USER_ID', action.userId)
      return {
        ...state, currentUserId: action.userId
      }
    }

    default:
      return state;
  }
};


export const setIsSending = (isSending) => ({type: SET_IS_SENDING, isSending });
export const setCurrentUserId = (userId) => ({type: SET_CURRENT_USER_ID, userId });

