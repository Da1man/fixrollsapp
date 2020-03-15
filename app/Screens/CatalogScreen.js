import React, {PureComponent} from 'react';
import {StyleSheet, Text, View, ScrollView, TouchableOpacity} from 'react-native';
import Header from '../components/Header';
import {THEME, w, h} from '../common/variables';
import TagComponent from '../components/TagConponent';
import ProductItem from '../components/ProductItem';
import CartButton from '../components/CartButton';
import {connect} from 'react-redux';
import {addToCart} from '../redux/catalogReducer';

import BlurOverlay,{closeOverlay,openOverlay} from 'react-native-blur-overlay';


class CatalogScreen extends PureComponent {
  render() {

    const {products, cartTotal, addToCart, cartProducts, isOpened} = this.props
    const productsList = products.map((item) => <ProductItem
      key={item.id}
      item={item}
      addToCart={addToCart}
    />)
    return (

      <View style={{flex: 1}} >
        <Header/>
        <ScrollView style={styles.container}>
          <View style={styles.titleSection}>
            <Text style={styles.titleText}>Роллы</Text>
          </View>
          <View style={styles.tagSection}>
            <TagComponent name={'Лосось'} checked={false}/>
            <TagComponent name={'Креветки'} checked={false}/>
            <TagComponent name={'Тунец'} checked={true}/>
            <TagComponent name={'Краб'} checked={false}/>
          </View>
          <View style={styles.productsSection}>
            {productsList}
          </View>
        </ScrollView>
        {/*<BlurOverlay*/}
        {/*  radius={14}*/}
        {/*  downsampling={2}*/}
        {/*  brightness={-200}*/}
        {/*  onPress={() => {*/}
        {/*    closeOverlay();*/}
        {/*  }}*/}
        {/*  customStyles={{alignItems: 'center', justifyContent: 'center'}}*/}
        {/*  blurStyle="dark"*/}
        {/*/>*/}
        <CartButton cartTotal={cartTotal} cartProducts={cartProducts}/>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 0,
  },
  blurView: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: w,
    height: h,
  },
  titleSection: {
    marginTop: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderLeftWidth: 5,
    borderLeftColor: THEME.COLOR.ACCENT,
  },
  titleText: {
    fontFamily: THEME.FONT_FAMILY.BOLD,
    fontSize: THEME.FONT_SIZE.TITLE,
    color: THEME.COLOR.BLACK,
  },
  tagSection: {
    // paddingVertical: 15,
    paddingHorizontal: 10,
    marginBottom: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  productsSection: {
    width: "100%",
    paddingHorizontal: 10,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

let mapStateToProps = state => {
  return {
    products: state.catalog.products,
    cartTotal: state.catalog.cartTotal,
    cartProducts: state.catalog.cartProducts,
  };
};

export default connect(mapStateToProps, {
  addToCart,
}) (CatalogScreen);
