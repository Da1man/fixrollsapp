import * as _ from 'lodash';

const SET_USER_NAME = 'SET_NAME';
const SET_USER_TEL = 'SET_USER_TEL';
const SET_USER_MAIL = 'SET_USER_MAIL';
const SET_USER_DELIVERY_ADRESS = 'SET_USER_DELIVERY_ADRESS';
const SET_USER_DISTRICT = 'SET_USER_DISTRICT';
const SET_USER_COMMENT = 'SET_USER_COMMENT';
const SET_USER_PAYMENT = 'SET_USER_PAYMENT';

const CONFIRM_ORDER = 'CONFIRM_ORDER';


let initialState = {
  userName: '',
  userTel: '',
  userMail: '',
  userDeliveryAdress: '',
  userDistrict: 'Кимры/Савелово. Мин заказ 500 ₽',
  userComment: '',
  userPayment: 'nal',
};


export const checkoutReducer = (state = initialState, action) => {
  switch (action.type) {

    case SET_USER_NAME: {
      return {
        ...state, userName: action.inputValue
      }
    }

    case SET_USER_TEL: {
      return {
        ...state, userTel: action.inputValue
      }
    }

    case SET_USER_MAIL: {
      return {
        ...state, userMail: action.inputValue
      }
    }

    case SET_USER_DELIVERY_ADRESS: {
      return {
        ...state, userDeliveryAdress: action.inputValue
      }
    }

    case SET_USER_DISTRICT: {
      return {
        ...state, userDistrict: action.inputValue
      }
    }

    case SET_USER_COMMENT: {
      return {
        ...state, userComment: action.inputValue
      }
    }

    case SET_USER_PAYMENT: {
      return {
        ...state, userPayment: action.inputValue
      }
    }
    case CONFIRM_ORDER: {
      console.log(state)
      return state
    }

    default:
      return state;
  }
};


export const setUserName = (inputValue) => ({type: SET_USER_NAME, inputValue });
export const setUserTel = (inputValue) => ({type: SET_USER_TEL, inputValue });
export const setUserMail = (inputValue) => ({type: SET_USER_MAIL, inputValue });
export const setUserDeliveryAdress = (inputValue) => ({type: SET_USER_DELIVERY_ADRESS, inputValue });
export const setUserDistrict = (inputValue) => ({type: SET_USER_DISTRICT, inputValue });
export const setUserComment = (inputValue) => ({type: SET_USER_COMMENT, inputValue });
export const setUserPayment = (inputValue) => ({type: SET_USER_PAYMENT, inputValue });
export const confirmOrder = () => ({type: CONFIRM_ORDER });
