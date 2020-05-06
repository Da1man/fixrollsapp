import React from 'react';
import {StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, AsyncStorage} from 'react-native';
import Header from '../components/Header';
import {THEME, w} from '../common/variables';
import {connect} from 'react-redux';

import axios from 'axios'

import auth from '@react-native-firebase/auth';

import {
  setIsSending,
} from '../redux/profileReducer'

class ProfileScreen extends React.Component {

  state = {
    validating: false,
    registrationEmail: '',
    registrationPassword: '',
    emailValidate: true,
    passwordValidate: true,
  }

  validateEmail = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const validate = this.state.registrationEmail ? reg.test(this.state.registrationEmail) : false
    this.setState({emailValidate: validate})
    return validate
  }

  validatePassword = () => {
    const validate = this.state.registrationPassword ? true : false;
    console.log('validatePassword', validate)
    this.setState({passwordValidate: validate})
    return validate
  }
  render() {
    const {
      navigation,
      setIsSending,
    } = this.props;


    const onRegistrationHandler = () => {
      this.validateEmail()
      this.validatePassword()
      if (this.validateEmail() && this.validatePassword()) {
        console.log('Validation success')
        setIsSending(true)
      } else {
        console.log('Validation fail')
        setIsSending(false)
      }
    }

    return (
      <View style={styles.container}>
        <Header backButton={true} navigation={navigation} title={'Профиль'}/>
        <ScrollView>
          <View style={styles.contentContainer}>
            <TextInput
              style={{...styles.inputText, borderColor: this.state.emailValidate ? THEME.COLOR.GRAY_DARK : THEME.COLOR.RED_ICON}}
              multiline={false}
              maxLength={50}
              placeholder={'Email'}
              placeholderTextColor={THEME.COLOR.GRAY}
              onChangeText={(text) => this.setState({registrationEmail: text})}
            />
            {!this.state.emailValidate &&
            <Text style={styles.validateText}>Некорректно введен e-mail адрес</Text>
            }
            <TextInput
              style={{...styles.inputText, borderColor: this.state.passwordValidate ? THEME.COLOR.GRAY_DARK : THEME.COLOR.RED_ICON}}
              multiline={false}
              maxLength={50}
              placeholder={'Пароль'}
              placeholderTextColor={THEME.COLOR.GRAY}
              onChangeText={(text) => this.setState({registrationPassword: text})}
            />
            {!this.state.passwordValidate &&
            <Text style={styles.validateText}>Обязательное поле</Text>
            }
            <TouchableOpacity
              style={styles.submitButton}
              activeOpacity={THEME.SETTINGS.ACTIVE_OPACITY}
              onPress={onRegistrationHandler}
            >
              <Text style={styles.submitButtonText}>Отправить</Text>
            </TouchableOpacity>

          </View>
        </ScrollView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: THEME.COLOR.WHITE_BACKGROUND,
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 400,
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  inputText: {
    borderWidth: 1,
    borderColor: THEME.COLOR.GRAY_DARK,
    borderRadius: 50,
    marginBottom: 10,
    marginTop: 10,
    fontFamily: THEME.FONT_FAMILY.REGULAR,
    fontSize: THEME.FONT_SIZE.MAIN,
    paddingHorizontal: 15,
    width: "100%",
  },
  submitButton: {
    height: 60,
    width: w * 0.8,
    backgroundColor: THEME.COLOR.ACCENT,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
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
    registrationEmail: state.profile.registrationEmail,
    registrationPassword: state.profile.registrationPassword,
    isSending: state.profile.isSending,
  };
};

export default connect(mapStateToProps, {
  setIsSending,
})(ProfileScreen);
