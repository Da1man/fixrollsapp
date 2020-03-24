import React, {PureComponent, Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Animated, Easing, ScrollView, Alert} from 'react-native';
import Interactable from 'react-native-interactable';

import {THEME, w, h} from '../common/variables';
import CartProductItem from './CartProductItem';

import {connect} from 'react-redux';
import {toggleNeedOpen, toggleNeedClose} from '../redux/catalogReducer';

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

class CartButton extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  componentDidUpdate(prevProps, prevState) {
    this.checkCloseOpen();
  }

  checkCloseOpen() {
    if (this.props.cartNeedOpen) {
      this.props.toggleNeedOpen(false);
      this.cart.snapTo({index: 1});
    }
    if (this.props.cartNeedClose) {
      this.props.toggleNeedClose(true);
      this.cart.snapTo({index: 2});
    }
  }

  _deltaY = new Animated.Value(Screen.height - 100);
  _bottomCartButton = new Animated.Value(200);

  onCartSnap = (event) => {
    const snapPointId = event.nativeEvent.id;
    if (this.props.cartTotal && snapPointId === 'closed') {
      this.cart.snapTo({index: 1});
    }
  };


  render() {
    const {
      cartTotal, cartProducts, cartNeedOpen,
      cartNeedClose, toggleNeedOpen, toggleNeedClose, initialPos,
      navigation,
    } = this.props;
    const animatedStyle = {
      top: this._bottomCartButton,
    };

    const cartProductsList = cartProducts.map((item) => <CartProductItem
      key={item.id}
      item={item}
    />);

    const stateView = [
      {y: Screen.height * 0.3, id: 'full'},
      {y: Screen.height, id: 'opened'},
      {y: Screen.height * 1.1, id: 'closed'},
    ];

    return (<>
        <View style={styles.panelContainer} pointerEvents={'box-none'}>
          <Animated.View
            pointerEvents={'box-none'}
            style={[styles.panelContainer, {
              backgroundColor: 'black',
              opacity: this._deltaY.interpolate({
                inputRange: [0, Screen.height - 100],
                outputRange: [1, 0],
                extrapolateRight: 'clamp',
              }),
            }]}
          />
          <Interactable.View
            style={styles.container}
            ref={ref => this.cart = ref}
            verticalOnly={true}
            snapPoints={stateView}
            initialPosition={stateView[cartTotal ? 1 : 2]}
            boundaries={{top: 60, bounce: 0.5}}
            onSnap={this.onCartSnap}
            animatedValueY={this._deltaY}
          >

            <View
              style={styles.button}
            >
              <Text style={styles.priceText}>{cartTotal.toLocaleString('ru-RU')} ₽</Text>
            </View>
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
                ? <TouchableOpacity style={styles.checkoutButton} onPress={() => navigation.navigate('Checkout')}>
                  <Text style={styles.checkoutButtonText}>Оплатить</Text>
                </TouchableOpacity>
                : <TouchableOpacity style={styles.checkoutButtonDisabled}
                                    onPress={() => onDisableCheckoutPress(cartTotal)}>
                  <Text style={styles.checkoutButtonTextDisabled}>Оплатить</Text>
                </TouchableOpacity>
              }
            </View>
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
    left: 0,
    borderRadius: 30,
    borderTopColor: THEME.COLOR.WHITE,
    borderTopWidth: 1,
    elevation: 8,
  },
  button: {
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
    cartNeedOpen: state.catalog.cartNeedOpen,
    cartNeedClose: state.catalog.cartNeedClose,
  };
};

export default connect(mapStateToProps, {
  toggleNeedOpen,
  toggleNeedClose,
})(CartButton);

