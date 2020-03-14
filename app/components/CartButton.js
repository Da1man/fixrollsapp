import React, {PureComponent} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Animated, Easing} from 'react-native';
import {THEME} from '../common/variables';
import CartProductItem from './CartProductItem';

import {connect} from 'react-redux';
import {toggleCartOpened, toggleNeedOpen, toggleNeedClose} from '../redux/catalogReducer';

class CartButton extends PureComponent {
  _bottomCartButton = new Animated.Value(-500);

  render() {
    const {
      cartTotal, cartProducts, cartIsOpened, toggleCartOpened, cartNeedOpen,
      cartNeedClose, toggleNeedOpen, toggleNeedClose} = this.props;
    const animatedStyle = {
      bottom: this._bottomCartButton,
    };

    if (cartNeedOpen) {
      Animated.timing(this._bottomCartButton, {
        toValue: -430,
        duration: 300,
      }).start();
      toggleNeedOpen();
    }
    if (cartNeedClose) {
      Animated.timing(this._bottomCartButton, {
        toValue: -500,
        duration: 300,
      }).start();
      toggleNeedClose();
    }

    const openCartHandler = () => {
      if (!cartIsOpened) {
        Animated.timing(this._bottomCartButton, {
          toValue: -0,
          duration: 300,
        }).start();
        toggleCartOpened()
      } else {
        Animated.timing(this._bottomCartButton, {
          toValue: -430,
          duration: 300,
        }).start();
        toggleCartOpened()
      }
      // console.log(cartIsOpened)
    };

    const cartProductsList = cartProducts.map((item) => <CartProductItem
      key={item.id}
      item={item}
    />);
    return (
      <Animated.View style={[styles.container, animatedStyle]}>

        <TouchableOpacity
          activeOpacity={THEME.SETTINGS.ACTIVE_OPACITY}
          style={styles.button}
          onPress={() => openCartHandler()}
        >
          <Text style={styles.priceText}>{cartTotal.toLocaleString()} ₽</Text>
        </TouchableOpacity>
        <View style={styles.orderTitle}>
          <Text style={styles.orderTitleText}>Ваш заказ:</Text>
        </View>
        <View style={styles.orderSection}>
          {cartProductsList}
        </View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 500,
    backgroundColor: THEME.COLOR.ACCENT,

    position: 'absolute',
    bottom: -500,
    left: 0,
  },
  button: {
    // justifyContent: 'center',
    paddingVertical: 20,
    alignItems: 'center',
    width: '100%',
  },
  priceText: {
    fontFamily: THEME.FONT_FAMILY.BOLD,
    fontSize: THEME.FONT_SIZE.BUTTON_PLUS,
    color: THEME.COLOR.WHITE,
  },
  orderTitle: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 30,
  },
  orderTitleText: {
    fontFamily: THEME.FONT_FAMILY.BOLD,
    fontSize: THEME.FONT_SIZE.BUTTON_PLUS,
    color: THEME.COLOR.WHITE,
  },
  orderSection: {
    paddingHorizontal: 20,
  },
});

let mapStateToProps = state => {
  return {
    cartIsOpened: state.catalog.cartIsOpened,
    cartNeedOpen: state.catalog.cartNeedOpen,
    cartNeedClose: state.catalog.cartNeedClose,
  };
};

export default connect(mapStateToProps, {
  toggleCartOpened,
  toggleNeedOpen,
  toggleNeedClose,
}) (CartButton);

