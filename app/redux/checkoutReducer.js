import {
  SET_USER_NAME,
  SET_USER_TEL,
  SET_USER_MAIL,
  SET_USER_DELIVERY_ADRESS,
  SET_USER_DISTRICT,
  SET_USER_COMMENT,
  SET_USER_PAYMENT,
  SET_SENDING_ORDER,
} from './actionTypes';

let initialState = {
  userName: 'Дмитрий',
  userTel: '+74954443322',
  userMail: '',
  userDeliveryAdress: 'ул Мира 101',
  userDistrict: 'Кимры/Савелово. Мин заказ 500 ₽',
  userComment: '',
  userPayment: 'cod',
  sendingOrder: false,
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

    case SET_SENDING_ORDER: {
      console.log('Sending order is: ', action.isSending)
      return {
        ...state, sendingOrder: action.isSending
      }
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
export const setSendingOrder = (isSending) => ({type: SET_SENDING_ORDER, isSending});
