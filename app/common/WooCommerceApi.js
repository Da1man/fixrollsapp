import React from 'react';
import WooCommerceAPI from 'react-native-woocommerce-api';
import store from '../redux/store';
import {setTagsFetching, setProducts, setTags, setProductsFetching} from '../redux/catalogReducer';
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

// export const fetchProductsFromApi = (tagId) => {
//   store.dispatch(setIsFetching(true));
//   if (tagId !== 1) {
//     // console.log(tagId)
//     ApiConnect.get(`products`, {
//       per_page: 100,
//       tag: tagId,
//     })
//       .then((response) => {
//
//         // console.log('fetchProductsFromApi response',response)
//         let list = [];
//         response.map(product => list.push({
//           id: product.id,
//           name: product.name,
//           price: parseInt(product.regular_price),
//           discountPrice: product.sale_price === '' ? 0 : parseInt(product.sale_price),
//           count: 1,
//           image: product.images[0].src,
//           isX2: product.attributes.length === 0 ? false : product.attributes[0].name === 'x2' ? true : false,
//           isVegetarian: product.attributes[_.findIndex(product.attributes, {name: 'Вегетерианский'})].options[0] === 'true' ? true : false,
//           isHot: product.attributes[_.findIndex(product.attributes, {name: 'Острый'})].options[0] === 'true' ? true : false,
//           composition: product.attributes[_.findIndex(product.attributes, {name: 'Состав'})].options[0],
//           weight: parseInt(product.attributes[_.findIndex(product.attributes, {name: 'Вес'})].options[0]),
//           quantity: parseInt(product.attributes[_.findIndex(product.attributes, {name: 'Количество'})].options[0]),
//
//         }));
//         store.dispatch(setProducts(list));
//         store.dispatch(setIsFetching(false));
//       });
//   } else {
//     // console.log(tagId)
//     ApiConnect.get(`products`, {
//       per_page: 100,
//       category: '88',
//     })
//       .then((response) => {
//
//         // console.log('fetchProductsFromApi response',response)
//         let list = [];
//         // response.forEach(product => console.log(product.attributes[_.findIndex(product.attributes, {name: 'Вегетерианский'})] ? 'aaaa' : 'bbbb'))
//         response.map(product => list.push({
//           id: product.id,
//           name: product.name,
//           price: product.regular_price,
//           discountPrice: product.sale_price === '' ? null : product.sale_price,
//           count: 1,
//           image: product.images[0].src,
//           isX2: product.attributes[_.findIndex(product.attributes, {name: 'x2'})] ? true : false,
//           isVegetarian: product.attributes[_.findIndex(product.attributes, {name: 'Вегетерианский'})].options[0] === 'true' && product.attributes[_.findIndex(product.attributes, {name: 'Вегетерианский'})] ? true : false,
//           isHot: product.attributes[_.findIndex(product.attributes, {name: 'Острый'})].options[0] === 'true' && product.attributes[_.findIndex(product.attributes, {name: 'Острый'})] ? true : false,
//           composition: product.attributes[_.findIndex(product.attributes, {name: 'Состав'})].options[0],
//           weight: parseInt(product.attributes[_.findIndex(product.attributes, {name: 'Вес'})].options[0]),
//           quantity: parseInt(product.attributes[_.findIndex(product.attributes, {name: 'Количество'})].options[0]),
//         }));
//         store.dispatch(setProducts(list));
//         store.dispatch(setIsFetching(false));
//       });
//   }
// };

export const fetchTagsFromWP = () => {
  store.dispatch(setTagsFetching(true))

  const firstTag = {
    id: 1,
    name: 'Все',
    slug: 'products',
    count: 99,
    checked: true,
  }

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
      list.unshift(firstTag)
      store.dispatch(setTags(list));
      store.dispatch(setTagsFetching(false))
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
          price: product.regular_price,
          discountPrice: product.sale_price === '' ? null : product.sale_price,
          count: 1,
          image: product.images[0].src,
          isX2: product.attributes[_.findIndex(product.attributes, {name: 'x2'})] ? true : false,
          isVegetarian: product.attributes[_.findIndex(product.attributes, {name: 'Вегетерианский'})].options[0] === 'true' && product.attributes[_.findIndex(product.attributes, {name: 'Вегетерианский'})] ? true : false,
          isHot: product.attributes[_.findIndex(product.attributes, {name: 'Острый'})].options[0] === 'true' && product.attributes[_.findIndex(product.attributes, {name: 'Острый'})] ? true : false,
          composition: product.attributes[_.findIndex(product.attributes, {name: 'Состав'})].options[0],
          weight: parseInt(product.attributes[_.findIndex(product.attributes, {name: 'Вес'})].options[0]),
          quantity: parseInt(product.attributes[_.findIndex(product.attributes, {name: 'Количество'})].options[0]),
        }));
        store.dispatch(setProducts(list));
        store.dispatch(setProductsFetching(false));
      });
  }
}

