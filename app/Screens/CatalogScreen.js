import React, {PureComponent} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Header from '../components/Header';
import {THEME} from '../common/variables';

class CatalogScreen extends PureComponent {
  render() {
    return (
      <View>
        <Header/>
        <View style={styles.container}>
          <View style={styles.titleSection}>
            <Text style={styles.titleText}>Роллы</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  },
  titleSection: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderLeftWidth: 5,
    borderLeftColor: THEME.COLOR.ACCENT,
  },
  titleText: {
    fontFamily: THEME.FONT_FAMILY.BOLD,
    fontSize: THEME.FONT_SIZE.TITLE,
    color: THEME.COLOR.BLACK,
  },
});

export default CatalogScreen;
