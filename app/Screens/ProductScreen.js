import React, {PureComponent} from 'react';
import {StyleSheet, Text, View, ScrollView, TouchableOpacity, Image} from 'react-native';
import Header from '../components/Header';
import {THEME, w} from '../common/variables';
import axios from 'axios';


import {connect} from 'react-redux';
import CartButton from '../components/CartButton';


import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faFire, faLeaf, faPlusCircle} from '@fortawesome/pro-light-svg-icons';
import {faMinus, faPlus} from '@fortawesome/pro-regular-svg-icons';
import {toggleNeedOpen, addToCart} from '../redux/catalogReducer';

class ProductScreen extends PureComponent {
  UNSAFE_componentWillMount() {
    this.setState(
      {
        counter: this.props.route.params.item.count,
      },
    );
  }

  componentDidMount() {
    console.log(this.props.route.params.item);
    // this.getUsers()
  }

  // getUsers = () => {
  //   axios
  //     .get(`${this.cnst_wp_rest_api_link}users/`)
  //     .then((response) => {
  //       // get some logs to see how data is coming in
  //       // const data = JSON.stringify(response.data)
  //       console.log('RESPONSE', response.data);
  //       // console.log("RESPONSE: " + response.data);
  //       // this.setState({ posts: response.data });
  //     })
  //     .catch(error => alert("ERROR: " + error));
  //
  // }
  cnst_wp_rest_api_link = 'https://fixrolls.ru/wp-json/wp/v2/';


  render() {
    const {navigation, cartTotal, cartProducts, addToCart, toggleNeedOpen} = this.props;
    const {item} = this.props.route.params;

    const onIncHendler = () => {
      this.setState({counter: this.state.counter + 1});
    };
    const onDecHendler = () => {
      if (this.state.counter > 1) {
        this.setState({counter: this.state.counter - 1});
      }
    };
    const addToCartHandler = () => {
      addToCart({...item, count: this.state.counter});
      this.setState({counter: 1})
      if (!cartTotal) {
        toggleNeedOpen(true);
      }
    };
    return (
      <View style={styles.container}>
        <Header backButton={true} navigation={navigation} title={item.name}/>
        <ScrollView>
          <View>
            <Image style={styles.productImage}
                   source={{uri: item.image}}
                   resizeMode={'cover'}
            />
            <View style={styles.iconSection}>
              {item.isHot &&
              <TouchableOpacity style={styles.iconHot} activeOpacity={THEME.SETTINGS.ACTIVE_OPACITY}>
                <FontAwesomeIcon icon={faFire} size={THEME.FONT_SIZE.TITLE} color={THEME.COLOR.WHITE}/>
              </TouchableOpacity>
              }
              {item.isVegetarian &&
              <TouchableOpacity style={styles.iconVegetarian} activeOpacity={THEME.SETTINGS.ACTIVE_OPACITY}>
                <FontAwesomeIcon icon={faLeaf} size={THEME.FONT_SIZE.TITLE} color={THEME.COLOR.WHITE}/>
              </TouchableOpacity>
              }
              {item.isX2 &&
              <TouchableOpacity style={styles.iconX2} activeOpacity={THEME.SETTINGS.ACTIVE_OPACITY}>
                <Text style={styles.iconX2Text}>x2</Text>
              </TouchableOpacity>
              }
            </View>
          </View>

          <View style={styles.infoSection}>
            <View style={styles.infoNameSection}>
              <Text style={styles.productNameText}>{item.name}</Text>
            </View>
            <View style={styles.infoSubSection}>

              <Text style={styles.infoSubText}>{item.weight} г.</Text>
              <Text style={styles.infoSubText}> | </Text>
              <Text style={styles.infoSubText}>{item.quantity} шт.</Text>

            </View>
            <View style={styles.infoDescriptionSection}>
              <Text style={styles.infoDescriptionText}>Состав: {item.composition}</Text>
            </View>

          </View>

          <View style={styles.counterSection}>
            <TouchableOpacity
              activeOpacity={THEME.SETTINGS.ACTIVE_OPACITY}
              style={styles.decSection}
              onPress={() => onDecHendler()}
            >
              <FontAwesomeIcon icon={faMinus} size={THEME.FONT_SIZE.TITLE}
                               color={this.state.counter > 1 ? THEME.COLOR.GRAY_DARK : THEME.COLOR.GRAY_DISABLED}/>
            </TouchableOpacity>
            <View style={styles.counterTextSection}>
              <Text style={styles.counterText}>
                {this.state.counter}
              </Text>
            </View>
            <TouchableOpacity
              activeOpacity={THEME.SETTINGS.ACTIVE_OPACITY}
              style={styles.incSection}
              onPress={() => onIncHendler()}
            >
              <FontAwesomeIcon icon={faPlus} size={THEME.FONT_SIZE.TITLE}
                               color={THEME.COLOR.GRAY_DARK}/>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonSection}>
            <View style={styles.priceSection}>
              <Text style={styles.priceText}>
                {`${item.discountPrice
                ? item.discountPrice * this.state.counter
                  : item.price * this.state.counter} ₽`}</Text>
              {
                item.discountPrice
                  ? <Text style={styles.discountPriceText}>{item.price} ₽</Text>
                  : null
              }
            </View>
            <TouchableOpacity
              style={styles.addToCartButton}
              activeOpacity={THEME.SETTINGS.ACTIVE_OPACITY}
              onPress={() => addToCartHandler()}
            >
              <Text style={styles.addToCartButtonText}>В корзину</Text>
              <FontAwesomeIcon icon={faPlusCircle} size={THEME.FONT_SIZE.BUTTON_PLUS} color={THEME.COLOR.WHITE}/>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <CartButton cartTotal={cartTotal} cartProducts={cartProducts} initialPos={cartTotal ? 1 : 2}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: THEME.COLOR.WHITE_BACKGROUND,
    // flex: 1,
    height: '100%',
  },
  productImage: {
    width: '100%',
    height: w / 1.2,
    // borderRadius: 20,
  },
  iconSection: {
    position: 'absolute',
    top: 10,
    left: 10,
    flexDirection: 'row',
  },
  iconHot: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    marginRight: 10,
    backgroundColor: THEME.COLOR.RED_ICON,
    width: 50,
    height: 50,
    elevation: 6,
  },
  iconVegetarian: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    marginRight: 10,
    backgroundColor: THEME.COLOR.GREEN_ICON,
    width: 50,
    height: 50,
    elevation: 6,
  },
  iconX2: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    marginRight: 10,
    backgroundColor: THEME.COLOR.BLACK,
    width: 50,
    height: 50,
    elevation: 6,
  },
  iconX2Text: {
    color: THEME.COLOR.WHITE,
    fontFamily: THEME.FONT_FAMILY.REGULAR,
    fontSize: THEME.FONT_SIZE.TITLE,
  },
  infoSection: {
    paddingHorizontal: w * 0.1,
    paddingVertical: w * 0.05,
    backgroundColor: THEME.COLOR.WHITE_BACKGROUND,
  },
  infoNameSection: {
    marginBottom: 5,
  },
  productNameText: {
    fontFamily: THEME.FONT_FAMILY.BOLD,
    fontSize: THEME.FONT_SIZE.BUTTON_PLUS,
    color: THEME.COLOR.BLACK,
  },
  infoSubSection: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoSubText: {
    fontFamily: THEME.FONT_FAMILY.REGULAR,
    fontSize: THEME.FONT_SIZE.INFO,
    color: THEME.COLOR.GRAY,
  },
  infoDescriptionSection: {
    marginBottom: 10,
  },
  infoDescriptionText: {
    fontFamily: THEME.FONT_FAMILY.REGULAR,
    fontSize: THEME.FONT_SIZE.MAIN,
    color: THEME.COLOR.BLACK,
  },
  counterSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  decSection: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 40,
  },
  counterTextSection: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 40,
  },
  counterText: {
    fontFamily: THEME.FONT_FAMILY.BOLD,
    fontSize: THEME.FONT_SIZE.BUTTON_PLUS,
    color: THEME.COLOR.GRAY_DARK,
  },
  incSection: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 40,
  },
  buttonSection: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: w * 0.1,
    marginBottom: 30,
  },
  priceSection: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  priceText: {
    fontFamily: THEME.FONT_FAMILY.REGULAR,
    fontSize: THEME.FONT_SIZE.BUTTON_PLUS,
    color: THEME.COLOR.BLACK,
    marginRight: 10,
  },
  discountPriceText: {
    fontSize: THEME.FONT_SIZE.TITLE,
    fontFamily: THEME.FONT_FAMILY.REGULAR,
    color: THEME.COLOR.GRAY,
    textDecorationLine: 'line-through',
  },
  addToCartButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: w * 0.4,
    backgroundColor: THEME.COLOR.ACCENT,
    borderRadius: 40,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 6,
  },
  addToCartButtonText: {
    fontFamily: THEME.FONT_FAMILY.REGULAR,
    fontSize: THEME.FONT_SIZE.MAIN,
    color: THEME.COLOR.WHITE,
  },


});

let mapStateToProps = state => {
  return {
    cartTotal: state.catalog.cartTotal,
    cartProducts: state.catalog.cartProducts,
  };
};

export default connect(mapStateToProps, {
  toggleNeedOpen,
  addToCart,
})(ProductScreen);
