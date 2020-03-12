import React, {PureComponent} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import Header from '../components/Header';
import {THEME} from '../common/variables';

class ProductScreen extends PureComponent {
  render() {
    return (
      <View style={{flex: 1}}>
        <Header />
        <Text>ProductScreen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  },
  titleSection: {
    marginTop: 20,
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
  tagSection: {
    // paddingVertical: 15,
    paddingHorizontal: 10,
    marginBottom: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  productsSection: {
    width: "100%",
    paddingHorizontal: 10,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ProductScreen;
