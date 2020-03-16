import {Alert} from 'react-native';
import AlertAsync from "react-native-alert-async";
import * as _ from 'lodash';

const ADD_TO_CART = 'ADD_TO_CART';
const INC_COUNT_CART = 'INC_COUNT_CART';
const DEC_COUNT_CART = 'DEC_COUNT_CART';
const TOGGLE_CART_OPENED = 'TOGGLE_CART_OPENED';
const TOGGLE_NEED_OPEN_CART = 'TOGGLE_NEED_OPEN_CART';
const TOGGLE_NEED_CLOSE_CART = 'TOGGLE_NEED_CLOSE_CART';
const SET_IS_FETCHING = 'SET_IS_FETCHING';
const SET_PRODUCTS = 'SET_PRODUCTS';
const SET_TAGS = 'SET_TAGS';
const SELECT_TAG = 'SELECT_TAG'

let initialState = {
  products: [
    // {
    //   id: 1,
    //   image: 'https://fixrolls.ru/wp-content/uploads/2019/10/Set-Love2-1-1-1.jpg',
    //   name: 'Сет Love',
    //   price: 666,
    //   discountPrice: 555,
    //   isHot: true,
    //   isVegetarian: false,
    //   count: 1,
    // },
    // {
    //   id: 2,
    //   image: 'https://fixrolls.ru/wp-content/uploads/2019/06/Apelsin-Roll-1.jpg',
    //   name: 'Апельсин ролл',
    //   price: 100,
    //   discountPrice: null,
    //   isHot: false,
    //   isVegetarian: true,
    //   count: 1,
    // },
    // {
    //   id: 3,
    //   image: 'https://fixrolls.ru/wp-content/uploads/2019/03/CHiken-Lava.jpg',
    //   name: 'Чикен лава ролл',
    //   price: 100,
    //   discountPrice: null,
    //   isHot: false,
    //   isVegetarian: false,
    //   count: 1,
    // },
    // {
    //   id: 4,
    //   image: 'https://fixrolls.ru/wp-content/uploads/2019/03/Filadelfiya-MIX.jpg',
    //   name: 'Филадельфия микс',
    //   price: 100,
    //   discountPrice: null,
    //   isHot: true,
    //   isVegetarian: true,
    //   count: 1,
    // },
    // {
    //   id: 5,
    //   image: 'https://fixrolls.ru/wp-content/uploads/2019/03/Filadelfiya-LITE.jpg',
    //   name: 'Филадельфия Лайт',
    //   price: 100,
    //   discountPrice: null,
    //   isHot: false,
    //   isVegetarian: false,
    //   count: 1,
    // },
    // {
    //   id: 6,
    //   image: 'https://fixrolls.ru/wp-content/uploads/2019/03/Taj-Hot.jpg',
    //   name: 'Тай хот',
    //   price: 100,
    //   discountPrice: null,
    //   isHot: false,
    //   isVegetarian: false,
    //   count: 1,
    // },
    // {
    //   id: 7,
    //   image: 'https://fixrolls.ru/wp-content/uploads/2019/10/Set-Love2-1-1-1.jpg',
    //   name: 'Сет Love',
    //   price: 444,
    //   discountPrice: 333,
    //   isHot: false,
    //   isVegetarian: true,
    //   count: 1,
    // },
  ],
  tags: [
    // {id: 1, name: 'Все', slug: 'products', checked: true, count: 0},
    // {id: 2, name: 'Теплые', slug: null, checked: false, count: 0},
    // {id: 3, name: 'Острые', slug: null, checked: false, count: 0},
    // {id: 4, name: 'Вегетерианские', slug: null, checked: false, count: 0},
    // {id: 5, name: 'Лосось', slug: null, checked: false, count: 0},
    // {id: 6, name: 'Краб', slug: null, checked: false, count: 0},
    // {id: 7, name: 'Курица', slug: null, checked: false, count: 0},
    // {id: 8, name: 'Мидии', slug: null, checked: false, count: 0},
  ],
  selectedTag: 1,
  cartProducts: [],
  cartTotal: 0,
  cartIsOpened: false,
  cartNeedOpen: false,
  cartNeedClose: false,
  isFetching: false,
};

let updateTotal = (state) => {
  let total = 0;
  state.cartProducts.forEach((item) => total = total + item.price * item.count )
  return {
    ...state,
    cartTotal: total,
    cartNeedClose: total ? false : true,
  };
};

export const catalogReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      if (_.findIndex(state.cartProducts, {id: action.product.id}) != -1) {

        const newState = {
          ...state, cartProducts: state.cartProducts.map(p => {
            if (p.id === action.product.id) {
              return {...p, count: p.count + action.product.count};
            }
            return p;
          }),
        };
        return updateTotal(newState);
      } else {
        const newState = {
          ...state, cartProducts: [...state.cartProducts, action.product],
        };
        return updateTotal(newState);
      }
    }
    case INC_COUNT_CART: {
      const newState = {
        ...state,
        cartProducts: state.cartProducts.map (p => {
          if (p.id === action.product.id) {
            return {...p, count: p.count + 1}
          }
          return p
        })
      }
      return updateTotal(newState)
    }

    case DEC_COUNT_CART: {
      if (action.product.count === 1) {

        // Alert.alert(
        //   'Удалить из корзины?',
        //   `Удалить ${action.product.name} из корзины?`,
        //   [
        //     {
        //       text: 'Отменить',
        //       onPress: () => console.log('Cancel Pressed'),
        //       style: 'cancel',
        //     },
        //     {text: 'Удалить', onPress: () => {
        //         const deleteIndex = _.findIndex(state.cartProducts, {id: action.product.id});
        //         const newCartProducts = [...state.cartProducts];
        //         newCartProducts.splice(deleteIndex, 1);
        //         const newState = {
        //           ...state,
        //           cartProducts: newCartProducts,
        //         };
        //         return updateTotal(newState)
        //       }},
        //   ],
        //   {cancelable: false},
        // );

        const deleteIndex = _.findIndex(state.cartProducts, {id: action.product.id});
        const newCartProducts = [...state.cartProducts];
        newCartProducts.splice(deleteIndex, 1);
        const newState = {
          ...state,
          cartProducts: newCartProducts,
        };
        return updateTotal(newState)

      } else {
        const newState = {
          ...state,
          cartProducts: state.cartProducts.map (p => {
            if (p.id === action.product.id) {
              return {...p, count: p.count - 1}
            }
            return p
          })
        }
        return updateTotal(newState)
      }
    }



    case TOGGLE_CART_OPENED: {
      const newState = {
        ...state, cartIsOpened: !state.cartIsOpened
      };
      return newState;
    }
    case TOGGLE_NEED_OPEN_CART: {
      const newState = {
        ...state, cartNeedOpen: !state.cartNeedOpen
      };
      return newState;
    }
    case TOGGLE_NEED_CLOSE_CART: {
      const newState = {
        ...state,
        cartNeedClose: !state.cartNeedClose,
        cartIsOpened: false,
      };
      return newState;
    }
    case SET_IS_FETCHING: {
      console.log('Fetching data is ', action.isFetching)
      return {
        ...state, isFetching: action.isFetching,
      };
    }
    case SET_PRODUCTS: {
      console.log(action.products)
      return {
        ...state, products: action.products
      }
    }
    case SET_TAGS: {
      return {
        ...state, tags: action.tags
      }
    }
    case SELECT_TAG: {
      console.log(action.id)
      return {
        ...state,
        selectedTag: action.id,
      }
    }
    default:
      return state;
  }
};

export const addToCart = (product) => ({type: ADD_TO_CART, product});
export const incCountCart = (product) => ({type: INC_COUNT_CART, product})
export const decCountCart = (product) => ({type: DEC_COUNT_CART, product})
export const toggleCartOpened = () => ({type: TOGGLE_CART_OPENED});
export const toggleNeedOpen = () => ({type: TOGGLE_NEED_OPEN_CART});
export const toggleNeedClose = () => ({type: TOGGLE_NEED_CLOSE_CART});
export const setIsFetching = (isFetching) => ({type: SET_IS_FETCHING, isFetching: isFetching });
export const setProducts = (products) => ({type: SET_PRODUCTS, products });
export const setTags = (tags) => ({type: SET_TAGS, tags });
export const selectTag = (id) => ({type: SELECT_TAG, id });
