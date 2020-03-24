import React, {PureComponent} from 'react';
import {StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, Picker, Keyboard} from 'react-native';
import RadioForm from 'react-native-simple-radio-button';

import Header from '../components/Header';
import {THEME, w} from '../common/variables';

import {connect} from 'react-redux';

class CheckoutScreen extends PureComponent {

  componentDidMount() {
  }

  render() {
    const {navigation, cartProducts, cartTotal} = this.props;
    const orderCartItems = cartProducts.map((item) => <View key={item.id} style={styles.cartOrderItem}>
      <View>
        <Text style={styles.orderItemsText}>{`${item.name} X ${item.count}`}</Text>
      </View>
      <View>
        <Text style={styles.orderItemsText}>{`${item.discountPrice
          ? item.discountPrice * item.count
          : item.price * item.count} ₽`}</Text>
      </View>
    </View>);

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
              placeholder={'Ваше имя'}
              placeholderTextColor={THEME.COLOR.GRAY}
            />
            <TextInput
              style={styles.inputText}
              multiline={false}
              maxLength={50}
              placeholder={'Ваш телефон'}
              placeholderTextColor={THEME.COLOR.GRAY}
            />
            <TextInput
              style={styles.inputText}
              multiline={false}
              maxLength={50}
              placeholder={'Ваш e-mail'}
              placeholderTextColor={THEME.COLOR.GRAY}
            />
          </View>
          <View style={styles.titleSection}>
            <Text style={styles.titleText}>ДЕТАЛИ ДОСТАВКИ</Text>
          </View>
          <View style={styles.deliveryDetailsSection}>
            <TextInput
              style={styles.inputText}
              multiline={false}
              maxLength={200}
              placeholder={'Адрес доставки'}
              placeholderTextColor={THEME.COLOR.GRAY}
            />
            <View style={styles.inputDropdown}>
              <Picker
                selectedValue={'Кимры/Савелово. Мин заказ 500 ₽'}
                style={{}}
                itemStyle={{
                  backgroundColor: 'red',
                  padding: 10,
                }}
                itemTextStyle={{
                  padding: 10,
                  fontSize: THEME.FONT_SIZE.MAIN,
                  fontFamily: THEME.FONT_FAMILY.REGULAR,
                  backgroundColor: 'red',
                }}
                onValueChange={(itemValue) =>
                  console.log(itemValue)
                }>
                <Picker.Item
                  label={`Кимры/Савелово. Мин заказ 500 ₽`}
                  value={`Кимры/Савелово. Мин заказ 500 ₽`}
                />
                <Picker.Item
                  label={`Деревни/Сад. тов./Док. Мин заказ 1000 ₽`}
                  value={`Деревни/Сад. тов./Док. Мин заказ 1000 ₽`}
                />
              </Picker>
            </View>
            <TextInput
              style={styles.commentInput}
              multiline={true}
              maxLength={1000}
              placeholder={`Примечания к вашему заказу, например, особые пожелания отделу доставки.`}
              placeholderTextColor={THEME.COLOR.GRAY}
            />
          </View>
          <View style={styles.titleSection}>
            <Text style={styles.titleText}>ВАШ ЗАКАЗ</Text>
          </View>
          <View style={styles.cartSection}>
            {orderCartItems}
            <View style={styles.totalSection}>
              <Text style={styles.totalText}>{`Итого: ${cartTotal} ₽`}</Text>
            </View>
          </View>
          <View style={styles.paymentMethodSection}>
            <RadioForm
              radio_props={[
                {label: 'Оплата курьеру наличными', value: 'nal'},
                {label: 'Оплата курьеру через терминал', value: 'terminal'},
              ]}
              initial={-1}
              onPress={(value) => {
                console.log(value);
              }}
              buttonColor={THEME.COLOR.GRAY}
              labelColor={THEME.COLOR.BLACK}
              selectedButtonColor={THEME.COLOR.ACCENT}
              labelStyle={{fontFamily: THEME.FONT_FAMILY.REGULAR, fontSize: THEME.FONT_SIZE.MAIN}}
            >

            </RadioForm>
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
  inputDropdown: {
    borderWidth: 1,
    borderColor: THEME.COLOR.GRAY_DARK,
    borderRadius: 50,
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: THEME.COLOR.GRAY_DARK,
    borderRadius: 20,
    marginBottom: 20,
    fontFamily: THEME.FONT_FAMILY.REGULAR,
    fontSize: THEME.FONT_SIZE.MAIN,
    paddingHorizontal: 15,
    height: 150,
    textAlign: 'left',
    textAlignVertical: 'top',
  },
  deliveryDetailsSection: {
    paddingHorizontal: 15,
  },
  cartSection: {
    marginBottom: 40,
    paddingHorizontal: 30,
  },
  cartOrderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  orderItemsSection: {},
  orderItemsText: {
    fontFamily: THEME.FONT_FAMILY.REGULAR,
    fontSize: THEME.FONT_SIZE.MAIN,
    color: THEME.COLOR.BLACK,
  },
  totalSection: {
    alignItems: 'flex-end',
  },
  totalText: {
    fontFamily: THEME.FONT_FAMILY.BOLD,
    fontSize: THEME.FONT_SIZE.TITLE,
    color: THEME.COLOR.BLACK,
  },
  paymentMethodSection: {
    marginBottom: 40,
    paddingHorizontal: 30,
  },
});

let mapStateToProps = state => {
  return {
    cartTotal: state.catalog.cartTotal,
    cartProducts: state.catalog.cartProducts,
  };
};

export default connect(mapStateToProps, {})(CheckoutScreen);
