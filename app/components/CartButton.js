import React, {PureComponent} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Animated, Easing, ScrollView, Alert} from 'react-native';
import Interactable from 'react-native-interactable';

import {THEME, w, h} from '../common/variables';
import CartProductItem from './CartProductItem';

import {connect} from 'react-redux';
import {toggleCartOpened, toggleNeedOpen, toggleNeedClose} from '../redux/catalogReducer';

const onDisableCheckoutPress = (cartTotal) => {
  Alert.alert(
    'Минимальный заказ',
    `Минимальный заказ составляет ${THEME.SETTINGS.MINIMAL_ORDER_PRICE} рублей, закажите еще на ${THEME.SETTINGS.MINIMAL_ORDER_PRICE - cartTotal} рублей`,
    [
      {
        text: 'ОК', onPress: () => {
          console.log('aaaa');
        },
      },
    ],
    {cancelable: false},
  );
};

const Screen = {
  width: w,
  height: h - 75,
};

class CartButton extends PureComponent {
  constructor(props) {
    super(props);
    // this._deltaY = new Animated.Value(Screen.height - 100);
  }
  _deltaY = new Animated.Value(Screen.height - 100);
  _bottomCartButton = new Animated.Value(200);

  render() {

    const {
      cartTotal, cartProducts, cartIsOpened, toggleCartOpened, cartNeedOpen,
      cartNeedClose, toggleNeedOpen, toggleNeedClose,
    } = this.props;
    const animatedStyle = {
      top: this._bottomCartButton,
    };

    if (cartNeedOpen) {
      Animated.timing(this._bottomCartButton, {
        toValue: 0,
        duration: 300,
      }).start();
      toggleNeedOpen();
    }
    if (cartNeedClose) {
      Animated.timing(this._bottomCartButton, {
        toValue: Screen.height - 0,
        duration: 500,
      }).start();

      toggleNeedClose();

      this.refs['cartButton'].changePosition({index: 0});
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
          toValue: -100,
          duration: 300,
        }).start();
        toggleCartOpened();
      }
    };

    const cartProductsList = cartProducts.map((item) => <CartProductItem
      key={item.id}
      item={item}
    />);
    return (<>
        <View style={styles.panelContainer} pointerEvents={'box-none'}>
          <Animated.View
            ref='cartButton'
            pointerEvents={'box-none'}
            style={[styles.panelContainer, {
              backgroundColor: 'black',
              opacity: this._deltaY.interpolate({
                inputRange: [0, Screen.height - 100],
                outputRange: [1, 0],
                extrapolateRight: 'clamp',
              }),
            }]}/>
          <Interactable.View
            // style={styles.container}
            verticalOnly={true}
            snapPoints={[{y: h * 0.3}, {y: Screen.height - 0}]}
            boundaries={{top: 0}}
            initialPosition={{y: Screen.height - 0}}
            animatedValueY={this._deltaY}>
            <Animated.View style={[styles.container, animatedStyle]}>

            <TouchableOpacity
              activeOpacity={THEME.SETTINGS.ACTIVE_OPACITY}
              style={styles.button}
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
                : <TouchableOpacity style={styles.checkoutButtonDisabled}
                                    onPress={() => onDisableCheckoutPress(cartTotal)}>
                  <Text style={styles.checkoutButtonTextDisabled}>Оплатить</Text>
                </TouchableOpacity>
              }
            </View>
            </Animated.View>

          </Interactable.View>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    paddingBottom: 400,
    width: '100%',
    height: 1000,
    backgroundColor: THEME.COLOR.ACCENT,
    // position: 'absolute',
    // bottom: -500,
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
  },


  panelContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  panel: {
    height: Screen.height + 100,
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 70,
    backgroundColor: THEME.COLOR.GRAY_BACKGROUND,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 5,
    shadowOpacity: 0.4,
    elevation: 8,
    borderWidth: 1,
    borderColor: THEME.COLOR.GRAY,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 4,
    borderRadius: 4,
    backgroundColor: THEME.COLOR.WHITE_BACKGROUND,
    marginBottom: 20,
  },
  cartTotalWrapper: {
    flexDirection: 'row',
    height: 50,
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  cartTotalSection: {
    width: '50%',
    alignItems: 'center',
  },
  cartCheckoutButton: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: THEME.COLOR.GRAY_BACKGROUND,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  pannelCost: {
    fontSize: THEME.FONT_SIZE.TITLE,
    color: THEME.COLOR.WHITE,
    fontFamily: THEME.FONT_FAMILY.REGULAR,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
  },
  panelButton: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: THEME.COLOR.GRAY_BACKGROUND,
    alignItems: 'center',
    marginVertical: 10,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  photo: {
    width: Screen.width - 40,
    height: 225,
    marginTop: 30,
  },
  map: {
    height: Screen.height,
    width: Screen.width,
  },


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

