import React, {PureComponent} from 'react';
import {StyleSheet, Text, View, ScrollView, TouchableOpacity, RefreshControl} from 'react-native';
import Header from '../components/Header';
import {THEME, w, h} from '../common/variables';
import TagComponent from '../components/TagConponent';
import ProductItem from '../components/ProductItem';
import CartButton from '../components/CartButton';
import {connect} from 'react-redux';
import {addToCart, setIsFetching, setProducts, setTags} from '../redux/catalogReducer';
import * as _ from 'lodash';

import {ApiConnect, fetchProductsFromApi} from '../common/WooCommerceApi';

class CatalogScreen extends PureComponent {

  componentDidMount() {
    fetchProductsFromApi(this.props.selectedTag)
    this.fetchTags()
  }

  fetchTags = () => {
    console.log('tag is fetching')
    ApiConnect.get('products/tags', {
      per_page: 100,
      orderby: 'count',
      order: 'desc',
    })
      .then((response) => {
        // console.log('tags response', response)
        let list = response.map(tag => ({
          id: tag.id,
          name: tag.name,
          slug: tag.slug,
          count: tag.count,
          checked: false,
        }));
        // console.log('tags list', list)
        this.props.setTags(list);
        console.log('tag is fetching done')
        //console.log(this.props.products)
      });
  }

  onRefresh = () => {
    fetchProductsFromApi(this.props.selectedTag)
  }


  render() {
    const {products, cartTotal, addToCart, cartProducts,
      isFetching, tags, selectedTag, navigation} = this.props
    const productsList = products.map((item) => <ProductItem
      key={item.id}
      item={item}
      addToCart={addToCart}
      navigation={navigation}
    />)
    const tagList = tags.map((tag) => <TagComponent
      key={tag.id}
      name={tag.name}
      slug={tag.slug}
      count={tag.count}
      checked={tag.checked}
      id={tag.id}
    />)
    return (

      <View style={{flex: 1}}>
        <Header backButton={false} navigation={navigation} title={'Каталог'}/>
        <ScrollView
          style={styles.container}
          refreshControl={
            <RefreshControl
              refreshing={isFetching}
              onRefresh={this.onRefresh}
              colors={[THEME.COLOR.ACCENT]}/>
          }
        >
          <View style={styles.titleSection}>
            <Text style={styles.titleText}>Роллы</Text>
          </View>
          <View style={styles.tagSection}>
            <TagComponent
              key={0}
              name={'Все'}
              checked={true}
              count={99}
              slug={'products'}
              id={1}
            />
            {tagList}
          </View>
          <View style={{...styles.productsSection, paddingBottom: cartTotal ? 70 : 0,}}>
            {productsList}
          </View>
        </ScrollView>
        <CartButton cartTotal={cartTotal} cartProducts={cartProducts}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 0,
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
    isFetching: state.catalog.isFetching,
    tags: state.catalog.tags,
    selectedTag: state.catalog.selectedTag,
  };
};

export default connect(mapStateToProps, {
  addToCart,
  setIsFetching,
  setProducts,
  setTags,
}) (CatalogScreen);
