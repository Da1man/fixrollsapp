import React, {PureComponent} from 'react';
import {StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, Keyboard} from 'react-native';
import Header from '../components/Header';
import {THEME, w} from '../common/variables';

import {connect} from 'react-redux';

class CheckoutScreen extends PureComponent {

  componentDidMount() {
  }

  render() {
    const {navigation} = this.props;

    return (
      <View style={{flex: 1}}>
        <Header backButton={true} navigation={navigation} title={'Оформление заказа'}/>
        <ScrollView
          style={styles.container}
        >
          <View style={styles.titleSection}>
            <Text style={styles.titleText}>ДЕТАЛИ ОПЛАТЫ</Text>
          </View>
          <View style={styles.payDetailsSection}>
            <TextInput
              style={styles.inputText}
              multiline={false}
              maxLength={50}
              placeholder={'Ваше имя ...'}
              placeholderTextColor={THEME.COLOR.GRAY}
            />
            <TextInput
              style={styles.inputText}
              multiline={false}
              maxLength={50}
              placeholder={'Ваш телефон ...'}
              placeholderTextColor={THEME.COLOR.GRAY}
            />
            <TextInput
              style={styles.inputText}
              multiline={false}
              maxLength={50}
              placeholder={'Ваш e-mail ...'}
              placeholderTextColor={THEME.COLOR.GRAY}
            />
          </View>
          <View style={styles.titleSection}>
            <Text style={styles.titleText}>ДЕТАЛИ ДОСТАВКИ</Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: THEME.COLOR.WHITE_BACKGROUND,
    flex: 1,
    // height: '100%',
  },
  titleSection: {
    marginTop: 20,
    marginBottom: 40,
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
  payDetailsSection: {
    paddingHorizontal: 15,
  },
  inputText: {
    // backgroundColor: 'red',
    borderWidth: 1,
    borderColor: THEME.COLOR.GRAY_DARK,
    borderRadius: 50,
    marginBottom: 20,
    fontFamily: THEME.FONT_FAMILY.REGULAR,
    fontSize: THEME.FONT_SIZE.MAIN,
    paddingHorizontal: 15,
  },
});

let mapStateToProps = state => {
  return {
    cartTotal: state.catalog.cartTotal,
    cartProducts: state.catalog.cartProducts,
  };
};

export default connect(mapStateToProps, {

})(CheckoutScreen);
