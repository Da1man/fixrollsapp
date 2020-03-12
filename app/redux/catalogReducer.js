import * as _ from 'lodash';

const ADD_TO_CART = 'ADD_TO_CART';

let initialState = {
  products: [
    {
      id: 1,
      image: 'https://fixrolls.ru/wp-content/uploads/2019/10/Set-Love2-1-1-1.jpg',
      name: 'Сет Love',
      price: 666,
      discountPrice: 555,
      isHot: true,
      isVegetarian: false,
      count: 1,
    },
    {
      id: 2,
      image: 'https://fixrolls.ru/wp-content/uploads/2019/06/Apelsin-Roll-1.jpg',
      name: 'Апельсин ролл',
      price: 100,
      discountPrice: null,
      isHot: false,
      isVegetarian: true,
      count: 1,
    },
    {
      id: 3,
      image: 'https://fixrolls.ru/wp-content/uploads/2019/03/CHiken-Lava.jpg',
      name: 'Чикен лава ролл',
      price: 100,
      discountPrice: null,
      isHot: false,
      isVegetarian: false,
      count: 1,
    },
    {
      id: 4,
      image: 'https://fixrolls.ru/wp-content/uploads/2019/03/Filadelfiya-MIX.jpg',
      name: 'Филадельфия микс',
      price: 100,
      discountPrice: null,
      isHot: true,
      isVegetarian: true,
      count: 1,
    },
    {
      id: 5,
      image: 'https://fixrolls.ru/wp-content/uploads/2019/03/Filadelfiya-LITE.jpg',
      name: 'Филадельфия Лайт',
      price: 100,
      discountPrice: null,
      isHot: false,
      isVegetarian: false,
      count: 1,
    },
    {
      id: 6,
      image: 'https://fixrolls.ru/wp-content/uploads/2019/03/Taj-Hot.jpg',
      name: 'Тай хот',
      price: 100,
      discountPrice: null,
      isHot: false,
      isVegetarian: false,
      count: 1,
    },
    {
      id: 7,
      image: 'https://fixrolls.ru/wp-content/uploads/2019/10/Set-Love2-1-1-1.jpg',
      name: 'Сет Love',
      price: 444,
      discountPrice: 333,
      isHot: false,
      isVegetarian: true,
      count: 1,
    },
  ],
  cartProducts: [],
  cartTotal: 0,
  isFetching: false,
};

let updateTotal = (state) => {
  let total = 0;
  state.cartProducts.forEach((item) => total = total + item.price )
  return {
    ...state,
    cartTotal: total,
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
    default:
      return state;
  }
};

export const addToCart = (product) => ({type: ADD_TO_CART, product});
