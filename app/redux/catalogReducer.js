import {Alert} from 'react-native';
import AlertAsync from "react-native-alert-async";
import * as _ from 'lodash';

const ADD_TO_CART = 'ADD_TO_CART';
const INC_COUNT_CART = 'INC_COUNT_CART';
const DEC_COUNT_CART = 'DEC_COUNT_CART';
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
    //   composition: 'Рис, водоросли нори, майонез, сливочный сыр, угорь, лосось, снежный краб, японский омлет, жареная кожа лосося, огурец',
    //   weight: 260,
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
      console.log('add to cart', action.product)
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

    case TOGGLE_NEED_OPEN_CART: {
      console.log('cartNeedOpen is', action.needOpen)
      const newState = {
        ...state, cartNeedOpen: action.needOpen,
      };
      return newState;
    }

    case TOGGLE_NEED_CLOSE_CART: {
      console.log('cartNeedClose is', action.needClose)
      const newState = {
        ...state,
        cartNeedClose: action.needClose,
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
export const toggleNeedOpen = (needOpen) => ({type: TOGGLE_NEED_OPEN_CART, needOpen});
export const toggleNeedClose = (needClose) => ({type: TOGGLE_NEED_CLOSE_CART, needClose});
export const setIsFetching = (isFetching) => ({type: SET_IS_FETCHING, isFetching: isFetching });
export const setProducts = (products) => ({type: SET_PRODUCTS, products });
export const setTags = (tags) => ({type: SET_TAGS, tags });
export const selectTag = (id) => ({type: SELECT_TAG, id });
