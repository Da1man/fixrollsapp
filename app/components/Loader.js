import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {THEME} from '../common/variables';

export const Loader = () => {
  return (
    <View style={styles.container}>
      <Text>Загрузка</Text>
    </View>
  )
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
    justifyContent: 'center',
    alignItems: 'center',
  },
});
