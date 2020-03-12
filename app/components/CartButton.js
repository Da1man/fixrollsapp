import React, {PureComponent} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {THEME} from '../common/variables';

export default class CartButton extends PureComponent {
  render() {
    const {} = this.props;
    return (
      <TouchableOpacity activeOpacity={THEME.SETTINGS.ACTIVE_OPACITY} style={styles.container} >
        <Text style={styles.priceText}>2 044 ₽</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: THEME.COLOR.ACCENT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  priceText: {
    fontFamily: THEME.FONT_FAMILY.BOLD,
    fontSize: THEME.FONT_SIZE.BUTTON_PLUS,
    color: THEME.COLOR.WHITE,
  },
});
