import React from 'react';
import WooCommerceAPI from 'react-native-woocommerce-api';

export const ApiConnect = new WooCommerceAPI({
  url: 'https://fixrolls.ru', // Your store URL
  ssl: true,
  consumerKey: 'ck_682e8df99b3b8c0906b5252521bfc762066a87cf', // Your consumer secret
  consumerSecret: 'cs_5fa872dda649995e52655bd445c517f3ac0e59e3', // Your consumer secret
  wpAPI: true, // Enable the WP REST API integration
  version: 'wc/v3', // WooCommerce WP REST API version
  queryStringAuth: true,
});

