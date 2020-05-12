import {
  SET_IS_SENDING,
  SET_CURRENT_USER,
  SET_CURRENT_USER_DATA,
} from './actionTypes';


let initialState = {
  isSending: false,
  currentUser: null,
  currentUserData: null,
  editUserData: {
    name: '',
    email: '',
    address: '',
    tel: '',
    image: '',
  }
};


export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_SENDING: {
      console.log('isSending ', action.isSending)
      return {
        ...state, isSending: action.isSending
      }
    }

    case SET_CURRENT_USER: {
      console.log('SET_CURRENT_USER', action.user)
      return {
        ...state, currentUser: action.user
      }
    }

    case SET_CURRENT_USER_DATA: {
      console.log('SET_CURRENT_USER_DATA', action.userData)
      return {
        ...state, currentUserData: action.userData
      }
    }


    default:
      return state;
  }
};


export const setIsSending = (isSending) => ({type: SET_IS_SENDING, isSending });
export const setCurrentUser = (user) => ({type: SET_CURRENT_USER, user});
export const setCurrentUserData = (userData) => ({type: SET_CURRENT_USER_DATA, userData});

