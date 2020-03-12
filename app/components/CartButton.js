import React, {PureComponent} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {THEME} from '../common/variables';

export default class CartButton extends PureComponent {
  render() {
    const {} = this.props;
    return (
      <View>
        <TouchableOpacity activeOpacity={THEME.SETTINGS.ACTIVE_OPACITY} style={styles.container}>
          <Text style={styles.priceText}>2 044 ₽</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 60,
    backgroundColor: THEME.COLOR.ACCENT,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  priceText: {
    fontFamily: THEME.FONT_FAMILY.BOLD,
    fontSize: THEME.FONT_SIZE.BUTTON_PLUS,
    color: THEME.COLOR.WHITE,
  },
});
