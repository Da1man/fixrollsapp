import React, {PureComponent} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {THEME} from '../common/variables';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBars} from '@fortawesome/pro-regular-svg-icons';
import {faSlidersV} from '@fortawesome/pro-regular-svg-icons';

export default class Header extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.leftButtonSection} activeOpacity={THEME.SETTINGS.ACTIVE_OPACITY}>
          <FontAwesomeIcon icon={faBars} size={THEME.FONT_SIZE.TITLE} color={THEME.COLOR.GRAY_DARK}/>
        </TouchableOpacity>
        <View style={styles.titleSection}>
          <Text style={styles.titleText}>Каталог</Text>
        </View>
        <TouchableOpacity style={styles.rightButtonSection} activeOpacity={THEME.SETTINGS.ACTIVE_OPACITY}>
          <FontAwesomeIcon icon={faSlidersV} size={THEME.FONT_SIZE.TITLE} color={THEME.COLOR.GRAY_DARK}/>
        </TouchableOpacity>
      </View>
      )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    backgroundColor: THEME.COLOR.WHITE_BACKGROUND,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 8,
  },
  leftButtonSection: {

  },
  titleSection: {

  },
  titleText: {
    fontFamily: THEME.FONT_FAMILY.BOLD,
    fontSize: THEME.FONT_SIZE.TITLE,
    color: THEME.COLOR.BLACK,
  },
  rightButtonSection: {

  },
})
