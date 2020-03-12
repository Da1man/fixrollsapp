import React, {PureComponent} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import Header from '../components/Header';
import {THEME} from '../common/variables';
import TagComponent from '../components/TagConponent';
import ProductItem from '../components/ProductItem';
import CartButton from '../components/CartButton';
import {connect} from 'react-redux';
import {addToCart} from '../redux/catalogReducer';

class CatalogScreen extends PureComponent {
  render() {
    const {products, cartTotal, addToCart} = this.props
    console.log(cartTotal)
    const productsList = products.map((item) => <ProductItem
      key={item.id}
      item={item}
      addToCart={addToCart}
    />)
    return (
      <View style={{flex: 1}}>
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
        <CartButton cartTotal={cartTotal}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 0,
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
