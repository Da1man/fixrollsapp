import React, {PureComponent} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image, Alert} from 'react-native';
import {THEME, w} from '../common/variables';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMinus, faPlus} from '@fortawesome/pro-regular-svg-icons';

export default class CartProductItem extends PureComponent {

  render() {
    const {item} = this.props
    return (
      <View style={styles.container}>
        <TouchableOpacity activeOpacity={THEME.SETTINGS.ACTIVE_OPACITY} style={styles.decSection}>
          <FontAwesomeIcon icon={faMinus} size={THEME.FONT_SIZE.TITLE} color={THEME.COLOR.WHITE}/>
        </TouchableOpacity>
        <View style={styles.contentSection}>
          <View style={styles.nameSection}>
            <Text style={styles.nameText}>{item.name}</Text>
          </View>
          <View style={styles.countSection}>
            <Text style={styles.countText}>{`${item.price}x${item.count} ₽`}</Text>
          </View>
        </View>
        <TouchableOpacity activeOpacity={THEME.SETTINGS.ACTIVE_OPACITY} style={styles.incSection}>
          <FontAwesomeIcon icon={faPlus} size={THEME.FONT_SIZE.TITLE} color={THEME.COLOR.WHITE}/>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  decSection: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    width: 30,
  },
  contentSection: {
    width: w *0.75,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  nameSection: {
  },
  nameText: {
    fontFamily: THEME.FONT_FAMILY.REGULAR,
    fontSize: THEME.FONT_SIZE.TITLE,
    color: THEME.COLOR.WHITE,
  },
  countSection: {

  },
  countText: {
    fontFamily: THEME.FONT_FAMILY.REGULAR,
    fontSize: THEME.FONT_SIZE.TITLE,
    color: THEME.COLOR.WHITE,
  },
  incSection: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    width: 30,
  },
});
