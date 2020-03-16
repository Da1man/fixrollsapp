import React from 'react';
import WooCommerceAPI from 'react-native-woocommerce-api';
import store from '../redux/store';
import {setIsFetching, setProducts} from '../redux/catalogReducer'
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

export const fetchProductsFromApi = (tagId) => {
  store.dispatch(setIsFetching(true));
  if (tagId !== 1) {
    console.log(tagId)
    ApiConnect.get(`products`, {
      per_page: 100,
      tag: tagId,
    })
      .then((response) => {

        // console.log('fetchProductsFromApi response',response)
        let list = [];
        response.map(product => list.push({
          id: product.id,
          name: product.name,
          price: product.regular_price,
          discountPrice: product.sale_price === '' ? null : product.sale_price,
          count: 1,
          image: product.images[0].src,
          isX2: product.attributes.length === 0 ? false : product.attributes[0].name === 'x2' ? true : false,
          isVegetarian: product.attributes[_.findIndex(response[0].attributes, {name: 'Вегетерианский'})].options[0] === 'true' ? true : false,
          isHot: product.attributes[_.findIndex(response[0].attributes, {name: 'Острый'})].options[0] === 'true' ? true : false,
        }));
        store.dispatch(setProducts(list))
        store.dispatch(setIsFetching(false))
      });
  } else {
    console.log(tagId)
    ApiConnect.get(`products`, {
      per_page: 100,
      category: '88',
    })
      .then((response) => {

        // console.log('fetchProductsFromApi response',response)
        let list = [];
        response.map(product => list.push({
          id: product.id,
          name: product.name,
          price: product.regular_price,
          discountPrice: product.sale_price === '' ? null : product.sale_price,
          count: 1,
          image: product.images[0].src,
          isX2: product.attributes.length === 0 ? false : product.attributes[0].name === 'x2' ? true : false,
          isVegetarian: product.attributes[_.findIndex(response[0].attributes, {name: 'Вегетерианский'})].options[0] === 'true' ? true : false,
          isHot: product.attributes[_.findIndex(response[0].attributes, {name: 'Острый'})].options[0] === 'true' ? true : false,
        }));
        store.dispatch(setProducts(list))
        store.dispatch(setIsFetching(false))
      });
  }
}

