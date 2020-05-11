import React from 'react';
import axios from 'axios';
import WooCommerceAPI from 'react-native-woocommerce-api';
import store from '../redux/store';
import {setTagsFetching, setProducts, setTags, setProductsFetching} from '../redux/catalogReducer';
import {setSendingOrder} from '../redux/checkoutReducer';
import * as _ from 'lodash';


export const ApiConnect = new WooCommerceAPI({
  url: 'https://fixrolls.ru', // Your store URL
  ssl: true,
  consumerKey: 'ck_682e8df99b3b8c0906b5252521bfc762066a87cf', // Your consumer secret
  consumerSecret: 'cs_5fa872dda649995e52655bd445c517f3ac0e59e3', // Your consumer secret
  wpAPI: true, // Enable the WP REST API integration
  version: 'wc/v3', // WooCommerce WP REST API version
  queryStringAuth: true,
});

export const fetchTagsFromWP = () => {
  store.dispatch(setTagsFetching(true));

  const firstTag = {
    id: 1,
    name: 'Все',
    slug: 'products',
    count: 99,
    checked: true,
  };

  ApiConnect.get('products/tags', {
    per_page: 100,
    orderby: 'count',
    order: 'desc',
  })
    .then((response) => {
      let list = response.map(tag => ({
        id: tag.id,
        name: tag.name,
        slug: tag.slug,
        count: tag.count,
        checked: false,
      }));
      list.unshift(firstTag);
      store.dispatch(setTags(list));
      store.dispatch(setTagsFetching(false));
    });
};

export const fetchProductsFromWP = (tagId) => {
  store.dispatch(setProductsFetching(true));
  if (tagId !== 1) {
    ApiConnect.get(`products`, {
      per_page: 100,
      tag: tagId,
    })
      .then((response) => {
        let list = [];
        response.map(product => list.push({
          id: product.id,
          name: product.name,
          price: parseInt(product.regular_price),
          discountPrice: product.sale_price === '' ? 0 : parseInt(product.sale_price),
          count: 1,
          image: product.images[0].src,
          isX2: product.attributes.length === 0 ? false : product.attributes[0].name === 'x2' ? true : false,
          isVegetarian: product.attributes[_.findIndex(product.attributes, {name: 'Вегетерианский'})].options[0] === 'true' ? true : false,
          isHot: product.attributes[_.findIndex(product.attributes, {name: 'Острый'})].options[0] === 'true' ? true : false,
          composition: product.attributes[_.findIndex(product.attributes, {name: 'Состав'})].options[0],
          weight: parseInt(product.attributes[_.findIndex(product.attributes, {name: 'Вес'})].options[0]),
          quantity: parseInt(product.attributes[_.findIndex(product.attributes, {name: 'Количество'})].options[0]),

        }));
        store.dispatch(setProducts(list));
        store.dispatch(setProductsFetching(false));
      });
  } else {
    ApiConnect.get(`products`, {
      per_page: 100,
      category: '88',
    })
      .then((response) => {
        let list = [];
        response.map(product => list.push({
          id: product.id,
          name: product.name,
          price: parseInt(product.regular_price),
          discountPrice: product.sale_price === '' ? 0 : parseInt(product.sale_price),
          count: 1,
          image: product.images[0].src,
          isX2: product.attributes.length === 0 ? false : product.attributes[0].name === 'x2' ? true : false,
          isVegetarian: product.attributes[_.findIndex(product.attributes, {name: 'Вегетерианский'})].options[0] === 'true' ? true : false,
          isHot: product.attributes[_.findIndex(product.attributes, {name: 'Острый'})].options[0] === 'true' ? true : false,
          composition: product.attributes[_.findIndex(product.attributes, {name: 'Состав'})].options[0],
          weight: parseInt(product.attributes[_.findIndex(product.attributes, {name: 'Вес'})].options[0]),
          quantity: parseInt(product.attributes[_.findIndex(product.attributes, {name: 'Количество'})].options[0]),
        }));
        store.dispatch(setProducts(list));
        store.dispatch(setProductsFetching(false));
      });
  }
};

export const sendOrderWP = (cartItems) => {
  console.log('Create order start');
  console.log(store.getState().checkout);
  const newLineItems = [];
  cartItems.map((item) => newLineItems.push({product_id: item.id, quantity: item.count}));
  const newOrderObject = {
    payment_method: store.getState().checkout.userPayment,
    payment_method_title: store.getState().checkout.userPayment === 'cod' ? 'Оплата курьеру наличными' : 'Оплата курьеру через терминал',
    set_paid: true,
    billing: {
      first_name: store.getState().checkout.userName,
      last_name: '',
      address_1: store.getState().checkout.userDeliveryAdress,
      address_2: '',
      city: store.getState().checkout.userDistrict,
      state: '',
      postcode: '',
      country: '',
      email: store.getState().checkout.userMail,
      phone: store.getState().checkout.userTel,
    },
    shipping: {
      first_name: '',
      last_name: '',
      address_1: '',
      address_2: '',
      city: '',
      state: '',
      postcode: '',
      country: '',
    },
    line_items: newLineItems,
    shipping_lines: [],
  };

  console.log('newOrderObject', newOrderObject);


  store.dispatch(customTimeOut())

  // ОТПРАВКА ОФОРМЛЕНИЯ ЗАКАЗА НА СЕРВЕР




  // ApiConnect.post('orders', newOrderObject, {})
  //   .then((response) => {
  //     console.log('Create order SUCCESS', response);
  //     store.dispatch.setSendingOrder(false);
  //   });

  // store.dispatch(sendOrder(newOrderObject))

};

// const sendOrder = (newOrderObject) => {
//   return async dispatch => {
//     store.dispatch(setSendingOrder(true))
//     const response = await ApiConnect.post('orders', newOrderObject, {})
//     console.log(response)
//     store.dispatch(setSendingOrder(false))
//   }
// }


const customTimeOut = (dispatch) => {
  return async dispatch => {
    store.dispatch(setSendingOrder(true))
    const response = await ApiConnect.get(`products`, {
      per_page: 100,
      category: '88',
    })
    console.log(response)
    store.dispatch(setSendingOrder(false))
    };
  }


