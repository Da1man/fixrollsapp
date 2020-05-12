import React, {PureComponent} from 'react';
import {StyleSheet, Text, View, ScrollView, TouchableOpacity, RefreshControl, Button} from 'react-native';
import Header from '../components/Header';
import {THEME, w, h} from '../common/variables';
import TagComponent from '../components/TagComponent';
import ProductItem from '../components/ProductItem';
import CartButton from '../components/CartButton';
import Loader from '../components/Loader';
import {connect} from 'react-redux';
import {addToCart, setProducts, setTags} from '../redux/catalogReducer';
import {setCurrentUserData, setCurrentUser} from '../redux/profileReducer';
import * as _ from 'lodash';

import {fetchProductsFromWP, fetchTagsFromWP} from '../common/WooCommerceApi';

import auth from "@react-native-firebase/auth";
import database from '@react-native-firebase/database';
import axios from 'axios';


class CatalogScreen extends PureComponent {

  state = {
    loader: false,
  };

  componentDidMount() {
    this.checkUserLogin();
    fetchProductsFromWP(this.props.selectedTag)
    fetchTagsFromWP();
  }

  onRefresh = () => {
    fetchProductsFromWP(this.props.selectedTag)
    fetchTagsFromWP();
  };

  checkUserLogin = () => {
    auth().onAuthStateChanged(user => {
      if(user) {
        this.props.setCurrentUser(user.uid)
        database()
          .ref('/users/' + user.uid)
          .once('value')
          .then(snapshot => {
            console.log('User data: ', snapshot.val());
            this.props.setCurrentUserData({
              name: snapshot.val().name,
              email: snapshot.val().email,
              address: snapshot.val().address,
              image: snapshot.val().image,
              id: snapshot.val().id,
              tel: snapshot.val().tel,
            })
          });
      }
      console.log('AAAAAAAAuser', user)
    })
  }


  render() {
    const {
      products, cartTotal, addToCart, cartProducts,
      isProductsFetching, tags, selectedTag, navigation,
      isTagsFetching, currentUser, currentUserData
    } = this.props;

    const productsList = products.map((item) => <ProductItem
      key={item.id}
      item={item}
      addToCart={addToCart}
      navigation={navigation}
    />);

    const tagList = tags.map((tag) => <TagComponent
      key={tag.id}
      name={tag.name}
      slug={tag.slug}
      count={tag.count}
      checked={tag.checked}
      id={tag.id}
    />);

    if (isTagsFetching || isProductsFetching) {
      this.setState({loader: true})
    } else {
      this.setState({loader: false})
    }


    let userName = null
    if (currentUserData) {
      userName = this.props.currentUserData.name
    }
    console.log('this.props.currentUserData', this.props.currentUserData)

    return (
      <React.Fragment>
        {this.state.loader && <Loader/>}
        <View style={{flex: 1}}>
          <Header
            backButton={false}
            navigation={navigation}
            title={'Каталог'}
            loading={this.state.loader}
            // userName={userName}
          />
          <ScrollView
            style={styles.container}
            refreshControl={
              <RefreshControl
                refreshing={isProductsFetching}
                onRefresh={this.onRefresh}
                colors={[THEME.COLOR.ACCENT]}/>
            }
          >
            <View style={styles.titleSection}>
              <Text style={styles.titleText}>Роллы</Text>
            </View>
            <View style={styles.tagSection}>
              {tagList}
            </View>
            <View style={{...styles.productsSection, paddingBottom: cartTotal ? 70 : 0}}>
              {productsList}
            </View>
          </ScrollView>
          <CartButton cartTotal={cartTotal} cartProducts={cartProducts} navigation={navigation}/>
        </View>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 0,
  },
  blurView: {
    position: 'absolute',
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
    width: '100%',
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
    isProductsFetching: state.catalog.isProductsFetching,
    tags: state.catalog.tags,
    selectedTag: state.catalog.selectedTag,
    isTagsFetching: state.catalog.isTagsFetching,
    currentUser: state.profile.currentUser,
    currentUserData: state.profile.currentUserData
  };
};

export default connect(mapStateToProps, {
  addToCart,
  setProducts,
  setTags,
  setCurrentUser,
  setCurrentUserData,
})(CatalogScreen);
