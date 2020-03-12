import React, {PureComponent} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import Header from '../components/Header';
import {THEME} from '../common/variables';
import TagComponent from '../components/TagConponent';

class CatalogScreen extends PureComponent {
  render() {
    return (
      <View>
        <Header/>
        <ScrollView style={styles.container}>
          <View style={styles.titleSection}>
            <Text style={styles.titleText}>Роллы</Text>
          </View>
          <View style={styles.tagSection}>
            <TagComponent name={'Лосось'} checked={false}/>
            <TagComponent name={'Креветки'} checked={false}/>
            <TagComponent name={'Тунец'} checked={true}/>
            <TagComponent name={'Краб'} checked={false}/>
          </View>
          <View style={styles.productsSection}>
          </View>
        </ScrollView>
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
  tagSection: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    flexDirection: 'row',
  },
  productsSection: {

  },
});

export default CatalogScreen;
