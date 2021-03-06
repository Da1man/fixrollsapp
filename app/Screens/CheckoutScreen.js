import React, {PureComponent} from 'react';
import {StyleSheet, Text, View, ScrollView,
  TouchableOpacity, TextInput, Picker, Keyboard,
  KeyboardAvoidingView,
  Platform} from 'react-native';
import RadioForm from 'react-native-simple-radio-button';

import Header from '../components/Header';
import {THEME, w} from '../common/variables';

import {connect} from 'react-redux';
import {
  setUserName, setUserTel, setUserMail, setUserDeliveryAdress, setUserDistrict, setUserComment, setUserPayment,
} from '../redux/checkoutReducer'
import {sendOrderWP} from '../common/WooCommerceApi';
import OrderLoader from '../components/OrderLoader';

class CheckoutScreen extends PureComponent {

  componentDidMount() {
  }

  state = {
    isCorrectName: true,
    isCorrectTel: true,
    isCorrectEmail: true,
    isCorrectDeliveryAdress: true,
    showMainError: false,
    isSending: false,
  }

  render() {
    const {
      navigation, cartProducts, cartTotal,
      userName, userTel, userMail, userDeliveryAdress, userDistrict, userComment, userPayment,
      setUserName, setUserTel, setUserMail, setUserDeliveryAdress, setUserDistrict, setUserComment, setUserPayment,
      sendingOrder,
    } = this.props;

    console.log(sendingOrder)

    if (sendingOrder) {
      this.setState({isSending: true})
    } else this.setState({isSending: false})

    const validateName = () => {
      const validate = userName ? true : false;
      this.setState({isCorrectName: validate})
      return validate
    }

    const validateTel = () => {
      const validate = userTel.length > 9 ? true : false
      this.setState({isCorrectTel: validate})
      return validate
    }

    const validateEmail = () => {
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      const validate = userMail ? reg.test(userMail) : false
      this.setState({isCorrectEmail: validate})
      return validate
    }

    const validateDeliveryAdress = () => {
      const validate = userDeliveryAdress ? true : false
      this.setState({isCorrectDeliveryAdress: validate})
      return validate
    }

    const onConfirmHandler = () => {
      validateName();
      validateTel();
      validateEmail();
      validateDeliveryAdress();
      if (validateName() && validateTel() && validateEmail() && validateDeliveryAdress()) {
        this.setState({showMainError: false})
        sendOrderWP(cartProducts)
      } else {
        this.setState({showMainError: true})
        console.log('Не верно заполнены поля')
      }
    }

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

    const showConfirmButton = () => {

      if (userDistrict === 'Кимры/Савелово. Мин заказ 500 ₽') {
        if (cartTotal >= THEME.SETTINGS.MINIMAL_ORDER_PRICE_KIMRY) {
          return (
            <View style={styles.confirmButtonSection}>
              <TouchableOpacity
                style={styles.confirmButton}
                activeOpacity={THEME.SETTINGS.ACTIVE_OPACITY}
                onPress={() => onConfirmHandler()}
              >
                <Text style={styles.confirmButtonText}>
                  ПОДТВЕРДИТЬ ЗАКАЗ
                </Text>
              </TouchableOpacity>
            </View>
          )
        } else {
          return (
            <View style={styles.minimumWarningSection}>
              <View style={styles.minimumWarning}>
                <Text style={styles.minimumWarningText}>Минимальная сумма заказа 500 ₽</Text>
              </View>
            </View>
          )
        }
      } else {
        if (cartTotal >= THEME.SETTINGS.MINIMAL_ORDER_PRICE_OTHER) {
          return (
            <View style={styles.confirmButtonSection}>
              <TouchableOpacity
                style={styles.confirmButton}
                activeOpacity={THEME.SETTINGS.ACTIVE_OPACITY}
                onPress={() => onConfirmHandler()}
              >
                <Text style={styles.confirmButtonText}>
                  ПОДТВЕРДИТЬ ЗАКАЗ
                </Text>
              </TouchableOpacity>
            </View>
          )
        } else {
          return (
            <View style={styles.minimumWarningSection}>
              <View style={styles.minimumWarning}>
                <Text style={styles.minimumWarningText}>Минимальная сумма заказа 1000 ₽</Text>
              </View>
            </View>
          )
        }
      }
    }

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={{flex: 1}}
        keyboardVerticalOffset={-500}
      >
      <View style={{flex: 1}}>
        {this.state.isSending && <OrderLoader />}
        <Header backButton={true} navigation={navigation} title={'Оформление заказа'} loading={this.state.isSending}/>
        <ScrollView
          style={styles.container}
        >

          <View style={styles.titleSection}>
            <Text style={styles.titleText}>ДЕТАЛИ ОПЛАТЫ</Text>
          </View>

          <View style={styles.payDetailsSection}>
            <TextInput
              style={{...styles.inputText, borderColor: this.state.isCorrectName ? THEME.COLOR.GRAY_DARK : THEME.COLOR.RED_ICON}}
              multiline={false}
              maxLength={50}
              placeholder={'Ваше имя (обязательно)'}
              placeholderTextColor={THEME.COLOR.GRAY}
              value={userName}
              onChangeText={(value) => setUserName(value)}
            />
            {
              this.state.isCorrectName
              ? null
              : <Text style={styles.validateText}>Обязательное поле</Text>
            }
            <TextInput
              style={{...styles.inputText, borderColor: this.state.isCorrectTel ? THEME.COLOR.GRAY_DARK : THEME.COLOR.RED_ICON}}
              multiline={false}
              maxLength={20}
              keyboardType={"numeric"}
              placeholder={'Ваш телефон (обязательно)'}
              placeholderTextColor={THEME.COLOR.GRAY}
              value={userTel}
              onChangeText={(value) => {
                let num = value.replace(".", '');
                setUserTel(num)
              }}
            />
            {this.state.isCorrectTel
              ? null
              : <Text style={styles.validateText}>Некорректно введен телефон</Text>
            }
            <TextInput
              style={{...styles.inputText, borderColor: this.state.isCorrectEmail ? THEME.COLOR.GRAY_DARK : THEME.COLOR.RED_ICON}}
              multiline={false}
              autoCapitalize={"none"}
              autoCorrect={false}
              maxLength={50}
              keyboardType={"email-address"}
              placeholder={'Ваш e-mail (обязательно)'}
              placeholderTextColor={THEME.COLOR.GRAY}
              value={userMail}
              onChangeText={(value) => setUserMail(value)}
            />
            {this.state.isCorrectEmail
              ? null
              : <Text style={styles.validateText}>Некорректно введен e-mail адрес</Text>
            }
          </View>

          <View style={styles.titleSection}>
            <Text style={styles.titleText}>ДЕТАЛИ ДОСТАВКИ</Text>
          </View>

          <View style={styles.deliveryDetailsSection}>
            <TextInput
              style={{...styles.inputText, borderColor: this.state.isCorrectDeliveryAdress ? THEME.COLOR.GRAY_DARK : THEME.COLOR.RED_ICON}}
              multiline={false}
              maxLength={200}
              placeholder={'Адрес доставки (обязательно)'}
              placeholderTextColor={THEME.COLOR.GRAY}
              value={userDeliveryAdress}
              onChangeText={(value) => setUserDeliveryAdress(value)}
            />
            {this.state.isCorrectDeliveryAdress
              ? null
              : <Text style={styles.validateText}>Обязательное поле</Text>
            }
            <View style={styles.inputDropdown}>
              <Picker
                selectedValue={userDistrict}
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
                  setUserDistrict(itemValue)
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
              placeholder={`Примечания к вашему заказу, например, особые пожелания отделу доставки (не обязательно)`}
              placeholderTextColor={THEME.COLOR.GRAY}
              value={userComment}
              onChangeText={(value) => setUserComment(value)}
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
                {label: 'Оплата курьеру наличными', value: 'cod'},
                {label: 'Оплата курьеру через терминал', value: 'cheque'},
              ]}
              initial={0}
              onPress={(value) => {
                setUserPayment(value);
              }}
              buttonColor={THEME.COLOR.GRAY_DISABLED}
              labelColor={THEME.COLOR.BLACK}
              selectedButtonColor={THEME.COLOR.ACCENT}
              labelStyle={{fontFamily: THEME.FONT_FAMILY.REGULAR, fontSize: THEME.FONT_SIZE.MAIN}}
            >
            </RadioForm>
          </View>

          {showConfirmButton()}

          {
            this.state.showMainError && <View style={styles.mainErrorSection}>
              <Text style={styles.mainErrorSectionText}>
                Некорректно заполнены данные
              </Text>
            </View>
          }

          <View style={styles.policySection}>
            <TouchableOpacity
              activeOpacity={THEME.SETTINGS.ACTIVE_OPACITY}
              onPress={() => navigation.navigate('Policy')}
            >
              <Text style={styles.policyText}>
                Оформляя заказ вы соглашаетесь с политикой безопасности и конфиденциальности сайта
              </Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </View>
      </KeyboardAvoidingView>
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
    marginBottom: 20,
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
    marginBottom: 10,
    marginTop: 10,
    fontFamily: THEME.FONT_FAMILY.REGULAR,
    fontSize: THEME.FONT_SIZE.MAIN,
    paddingHorizontal: 15,
  },
  inputDropdown: {
    borderWidth: 1,
    borderColor: THEME.COLOR.GRAY_DARK,
    borderRadius: 50,
    marginBottom: 10,
    marginTop: 10,
    paddingHorizontal: 15,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: THEME.COLOR.GRAY_DARK,
    borderRadius: 20,
    marginBottom: 10,
    marginTop: 10,
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
  minimumWarningSection: {
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  minimumWarning: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 50,
    borderColor: THEME.COLOR.RED_ICON,
    borderWidth: 1,
  },
  minimumWarningText: {
    fontFamily: THEME.FONT_FAMILY.REGULAR,
    fontSize: THEME.FONT_SIZE.MAIN,
    color: THEME.COLOR.RED_ICON,
  },
  policySection: {
    paddingHorizontal: 30,
    marginBottom: 20,
    flexDirection: 'row',
  },
  policyText: {
    fontFamily: THEME.FONT_FAMILY.REGULAR,
    fontSize: THEME.FONT_SIZE.MAIN,
    color: THEME.COLOR.BLACK,
    fontStyle: 'italic',
  },
  mainErrorSection: {
    paddingHorizontal: 30,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainErrorSectionText: {
    fontFamily: THEME.FONT_FAMILY.REGULAR,
    fontSize: THEME.FONT_SIZE.MAIN,
    color: THEME.COLOR.RED_ICON,
  },

  confirmButtonSection: {
    paddingHorizontal: 30,
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmButton: {
    height: 60,
    width: w * 0.8,
    backgroundColor: THEME.COLOR.ACCENT,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmButtonText: {
    fontFamily: THEME.FONT_FAMILY.REGULAR,
    fontSize: THEME.FONT_SIZE.TITLE,
    color: THEME.COLOR.WHITE,
  },
  validateText: {
    color: THEME.COLOR.RED_ICON,
    paddingHorizontal: 20,
    fontFamily: THEME.FONT_FAMILY.REGULAR,
    fontSize: THEME.FONT_SIZE.INFO,
  },
});

let mapStateToProps = state => {
  return {
    cartTotal: state.catalog.cartTotal,
    cartProducts: state.catalog.cartProducts,
    userName: state.checkout.userName,
    userTel: state.checkout.userTel,
    userMail: state.checkout.userMail,
    userDeliveryAdress: state.checkout.userDeliveryAdress,
    userDistrict: state.checkout.userDistrict,
    userComment: state.checkout.userComment,
    userPayment: state.checkout.userPayment,
    sendingOrder: state.checkout.sendingOrder,
  };
};

export default connect(mapStateToProps, {
  setUserName,
  setUserTel,
  setUserMail,
  setUserDeliveryAdress,
  setUserDistrict,
  setUserComment,
  setUserPayment,
})(CheckoutScreen);
