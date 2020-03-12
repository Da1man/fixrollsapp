import React, {PureComponent} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {THEME} from '../common/variables';

export default class TagComponent extends PureComponent {
  render() {
    const {name, checked} = this.props;
    return (
      <TouchableOpacity
        activeOpacity={THEME.SETTINGS.ACTIVE_OPACITY}
        style={{...styles.tagItem, borderColor: checked ? THEME.COLOR.GRAY : THEME.COLOR.ACCENT}}
      >
        <Text style={{...styles.tagNameText, color: checked ? THEME.COLOR.GRAY : THEME.COLOR.ACCENT}}>{name}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  tagItem: {
    marginTop: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: THEME.COLOR.ACCENT,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 30,
  },
  tagNameText: {
    fontFamily: THEME.FONT_FAMILY.REGULAR,
    fontSize: THEME.FONT_SIZE.TAGS,
    color: THEME.COLOR.ACCENT,
  },
});
