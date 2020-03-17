import React, {PureComponent} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import Header from '../components/Header';
import {THEME} from '../common/variables';

import {connect} from 'react-redux';
import CartButton from '../components/CartButton';

class ProductScreen extends PureComponent {
  render() {
    const {navigation, cartTotal, cartProducts} = this.props
    return (
      <View style={{flex: 1}}>
        <Header backButton={true} navigation={navigation} />
        <Text>ProductScreen</Text>
        <CartButton cartTotal={cartTotal} cartProducts={cartProducts} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  },

});

let mapStateToProps = state => {
  return {
    cartTotal: state.catalog.cartTotal,
    cartProducts: state.catalog.cartProducts,
  };
};

export default connect(mapStateToProps, {

}) (ProductScreen);
