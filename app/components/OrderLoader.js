import React, {Component} from 'react';
import {View, StyleSheet, Text, Animated, Easing} from 'react-native';
import {THEME, h, w} from '../common/variables';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faShoppingCart} from '@fortawesome/pro-regular-svg-icons';

class OrderLoader extends Component {

  _cartPosition = new Animated.Value(-THEME.SETTINGS.LOADER_SIZE);

  componentDidMount() {
    Animated.loop(
      Animated.sequence([
        Animated.timing(this._cartPosition, {
          toValue: -THEME.SETTINGS.LOADER_SIZE,
          duration: 1,
          easing: Easing.bounce,
        }),
        Animated.timing(this._cartPosition, {
          toValue: w / 2 - THEME.SETTINGS.LOADER_SIZE / 2,
          duration: 700,
          easing: Easing.bounce,
        }),
        Animated.timing(this._cartPosition, {
          toValue: w + THEME.SETTINGS.LOADER_SIZE,
          duration: 700,
        }),
      ]),
      {
        iterations: 10,
      },
    ).start();
  }

  render() {
    const animatedPosition = {
      left: this._cartPosition,
    };

    return (
      <View style={styles.container}>
        <View style={styles.loaderTextBlock}>
          <Text style={styles.loaderTextBlockText}>Отправка заказа...</Text>
        </View>
          <Animated.View style={[styles.loaderImageBlock, animatedPosition]}>
            <FontAwesomeIcon icon={faShoppingCart} size={THEME.SETTINGS.LOADER_SIZE} color={THEME.COLOR.ACCENT}/>
          </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: THEME.COLOR.WHITE_BACKGROUND,
    zIndex: 999,
    width: '100%',
  },
  loaderImageBlock: {
    position: 'absolute',
    top: h / 2 - THEME.SETTINGS.LOADER_SIZE / 2,
  },
  loaderTextBlock: {
    top:  h / 2 - (THEME.SETTINGS.LOADER_SIZE / 2) * 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderTextBlockText: {
    fontFamily: THEME.FONT_FAMILY.BOLD,
    fontSize: THEME.FONT_SIZE.BUTTON_PLUS,
    color: THEME.COLOR.ACCENT,
    textTransform: 'uppercase',
    fontStyle: 'italic',
  },
});

export default OrderLoader;
