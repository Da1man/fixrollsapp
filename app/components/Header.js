import React, {PureComponent} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {THEME} from '../common/variables';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBars} from '@fortawesome/pro-regular-svg-icons';
import {faUser} from '@fortawesome/pro-regular-svg-icons';
import {faArrowLeft} from '@fortawesome/pro-regular-svg-icons';

export default class Header extends PureComponent {

  render() {
    const {navigation, backButton, title, loading, userName} = this.props;
    let elevation = 8;
    if (loading) {
      elevation = 0
    }
    return (
      <View style={{...styles.container, elevation}}>
        {backButton
          ? <TouchableOpacity
            style={styles.leftButtonSection}
            activeOpacity={THEME.SETTINGS.ACTIVE_OPACITY}
            onPress={() => navigation.goBack()}
          >
            <FontAwesomeIcon icon={faArrowLeft} size={THEME.FONT_SIZE.TITLE} color={THEME.COLOR.GRAY_DARK}/>
          </TouchableOpacity>
          : null
        }
        <View style={styles.titleSection}>
          <Text style={styles.titleText}>{title}</Text>
        </View>
        <TouchableOpacity
          style={styles.rightButtonSection}
          activeOpacity={THEME.SETTINGS.ACTIVE_OPACITY}
          onPress={() => navigation.toggleDrawer()}
        >
          <FontAwesomeIcon icon={faBars} size={THEME.FONT_SIZE.TITLE} color={THEME.COLOR.GRAY_DARK}/>
        </TouchableOpacity>
      </View>
    );
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
    marginBottom: 0,
  },
  leftButtonSection: {
    width: 50,
  },
  titleSection: {},
  titleText: {
    fontFamily: THEME.FONT_FAMILY.BOLD,
    fontSize: THEME.FONT_SIZE.TITLE,
    color: THEME.COLOR.BLACK,
  },
  rightButtonSection: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    width: 50,
  },
  userNameText: {
    fontFamily: THEME.FONT_FAMILY.BOLD,
    fontSize: THEME.FONT_SIZE.MAIN,
    color: THEME.COLOR.BLACK,
  }
});
