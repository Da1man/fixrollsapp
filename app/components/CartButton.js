import React, {PureComponent} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Animated, Easing} from 'react-native';
import {THEME} from '../common/variables';

export default class CartButton extends PureComponent {
  _bottomCartButton = new Animated.Value(-60)

  render() {
    const {cartTotal} = this.props;
    const animatedStyle = {
      bottom: this._bottomCartButton,
    };
    if (cartTotal) {
      Animated.timing(this._bottomCartButton, {
        toValue: 0,
        duration: 300,
      }).start();
    } else {
      Animated.timing(this._bottomCartButton, {
        toValue: -60,
        duration: 300,
      }).start();
    }
    return (
      <Animated.View style={[styles.container, animatedStyle]}>
        <TouchableOpacity
          activeOpacity={THEME.SETTINGS.ACTIVE_OPACITY}
          style={styles.button}
        >
          <Text style={styles.priceText}>{cartTotal.toLocaleString()} ₽</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 60,
    backgroundColor: THEME.COLOR.ACCENT,

    position: 'absolute',
    bottom: -0,
    left: 0,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  priceText: {
    fontFamily: THEME.FONT_FAMILY.BOLD,
    fontSize: THEME.FONT_SIZE.BUTTON_PLUS,
    color: THEME.COLOR.WHITE,
  },
});
