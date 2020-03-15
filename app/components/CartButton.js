import React, {PureComponent} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Animated, Easing, ScrollView, Alert} from 'react-native';

import BlurOverlay,{closeOverlay,openOverlay} from 'react-native-blur-overlay';

import {THEME, w} from '../common/variables';
import CartProductItem from './CartProductItem';

import {connect} from 'react-redux';
import {toggleCartOpened, toggleNeedOpen, toggleNeedClose} from '../redux/catalogReducer';

const onDisableCheckoutPress = (cartTotal) => {
  Alert.alert(
    'Минимальный заказ',
    `Минимальный заказ составляет ${THEME.SETTINGS.MINIMAL_ORDER_PRICE} рублей, закажите еще на ${THEME.SETTINGS.MINIMAL_ORDER_PRICE - cartTotal} рублей`,
    [
      {text: 'ОК', onPress: () => {
        console.log('aaaa')
        }},
    ],
    {cancelable: false},
  );
}

class CartButton extends PureComponent {
  _bottomCartButton = new Animated.Value(-600);

  render() {
    const {
      cartTotal, cartProducts, cartIsOpened, toggleCartOpened, cartNeedOpen,
      cartNeedClose, toggleNeedOpen, toggleNeedClose,
    } = this.props;
    const animatedStyle = {
      bottom: this._bottomCartButton,
    };

    if (cartNeedOpen) {
      Animated.timing(this._bottomCartButton, {
        toValue: -530,
        duration: 300,
      }).start();
      toggleNeedOpen();
    }
    if (cartNeedClose) {
      Animated.timing(this._bottomCartButton, {
        toValue: -600,
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
        openOverlay();
        toggleCartOpened();
      } else {
        Animated.timing(this._bottomCartButton, {
          toValue: -530,
          duration: 300,
        }).start();
        toggleCartOpened();
      }
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
          <Text style={styles.priceText}>{cartTotal.toLocaleString('ru-RU')} ₽</Text>
        </TouchableOpacity>
        <View style={styles.orderTitle}>
          <Text style={styles.orderTitleText}>Ваш заказ:</Text>
        </View>
        <ScrollView style={styles.orderSection}>
          {cartProductsList}
        </ScrollView>
        <View style={styles.totalSection}>
          <Text style={styles.totalTitleText}>Итого:</Text>
          <Text style={styles.totalText}>{`${cartTotal.toLocaleString('ru-RU')} ₽`}</Text>
        </View>
        <View style={styles.checkoutButtonSection}>
          {cartTotal >= THEME.SETTINGS.MINIMAL_ORDER_PRICE
            ? <TouchableOpacity style={styles.checkoutButton}>
              <Text style={styles.checkoutButtonText}>Оплатить</Text>
            </TouchableOpacity>
            : <TouchableOpacity style={styles.checkoutButtonDisabled} onPress={() => onDisableCheckoutPress(cartTotal)}>
              <Text style={styles.checkoutButtonTextDisabled}>Оплатить</Text>
            </TouchableOpacity>
          }
        </View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 600,
    backgroundColor: THEME.COLOR.ACCENT,
    position: 'absolute',
    bottom: -600,
    left: 0,
    borderRadius: 30,
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
    marginBottom: 30,
  },
  totalSection: {
    paddingHorizontal: 30,
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginBottom: 30,
  },
  totalTitleText: {
    fontFamily: THEME.FONT_FAMILY.REGULAR,
    fontSize: THEME.FONT_SIZE.TITLE,
    color: THEME.COLOR.WHITE,
    marginBottom: 10,
  },
  totalText: {
    fontFamily: THEME.FONT_FAMILY.BOLD,
    fontSize: THEME.FONT_SIZE.BUTTON_PLUS,
    color: THEME.COLOR.WHITE,
  },
  checkoutButtonSection: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
  },
  checkoutButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    width: w * 0.6,
    borderRadius: 50,
    backgroundColor: THEME.COLOR.WHITE,
  },
  checkoutButtonText: {
    fontFamily: THEME.FONT_FAMILY.REGULAR,
    fontSize: THEME.FONT_SIZE.TITLE,
    color: THEME.COLOR.ACCENT,
  },
  checkoutButtonDisabled: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    width: w * 0.6,
    borderRadius: 50,
    backgroundColor: THEME.COLOR.GRAY,
  },
  checkoutButtonTextDisabled: {
    fontFamily: THEME.FONT_FAMILY.REGULAR,
    fontSize: THEME.FONT_SIZE.TITLE,
    color: THEME.COLOR.GRAY_DARK,
  }
});

let mapStateToProps = state => {
  return {
    cartTotal: state.catalog.cartTotal,
    cartIsOpened: state.catalog.cartIsOpened,
    cartNeedOpen: state.catalog.cartNeedOpen,
    cartNeedClose: state.catalog.cartNeedClose,
  };
};

export default connect(mapStateToProps, {
  toggleCartOpened,
  toggleNeedOpen,
  toggleNeedClose,
})(CartButton);

