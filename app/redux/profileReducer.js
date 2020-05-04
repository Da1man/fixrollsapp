import {
  SET_REGISTRATION_EMAIL,
  SET_REGISTRATION_PASSWORD,
  SET_IS_LOGGED
} from './actionTypes';


let initialState = {
  registrationEmail: '',
  registrationPassword: '',
  isSending: false,
};


export const profileReducer = (state = initialState, action) => {
  switch (action.type) {

    case SET_REGISTRATION_EMAIL: {
      return {
        ...state, registrationEmail: action.value
      }
    }

    case SET_REGISTRATION_PASSWORD: {
      return {
        ...state, registrationPassword: action.value
      }
    }

    case SET_IS_LOGGED: {
      console.log('IS_LOGGED is ', action.isSending)
      return {
        ...state, isSending: action.isSending
      }
    }

    default:
      return state;
  }
};


export const setRegistrationEmail = (value) => ({type: SET_REGISTRATION_EMAIL, value });
export const setRegistrationPassword = (value) => ({type: SET_REGISTRATION_PASSWORD, value });
export const setIsSending = (isSending) => ({type: SET_IS_LOGGED, isSending });

