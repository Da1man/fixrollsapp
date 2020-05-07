import React, {Fragment, Component} from 'react';
import {Text, StyleSheet, TextInput, TouchableOpacity, View} from "react-native";
import {THEME, w} from "../common/variables";
import auth from "@react-native-firebase/auth";

class RegistrationForm extends Component {

  state = {
    validating: false,
    registrationName: '',
    registrationEmail: '',
    registrationPassword: '',
    nameValidate: true,
    emailValidate: true,
    passwordValidate: true,
  }

  validateName = () => {
    const validate = this.state.registrationName ? true : false;
    this.setState({nameValidate: validate})
    return validate
  }

  validateEmail = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const validate = this.state.registrationEmail ? reg.test(this.state.registrationEmail) : false
    this.setState({emailValidate: validate})
    return validate
  }

  validatePassword = () => {
    const validate = this.state.registrationPassword ? true : false;
    this.setState({passwordValidate: validate})
    return validate
  }

  onRegistrationHandler = () => {
    this.validateEmail()
    this.validatePassword()
    this.validateName()
    if (this.validateEmail() && this.validatePassword() && this.validateName()) {

      auth()
        .signInWithEmailAndPassword(this.state.registrationEmail, this.state.registrationPassword)
        .then((response) => {
          console.log('User account created & signed in!', response);
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
          }

          console.error(error);
        });

      this.props.route.params.setIsSending(true)
    } else {

      this.props.route.params.setIsSending(false)
    }
  }

  render() {
    return (
      <Fragment>
        <View style={styles.container}>
          <Text style={styles.registrationTitleText}>Регистрация</Text>
          <TextInput
            style={{
              ...styles.inputText,
              borderColor: this.state.nameValidate ? THEME.COLOR.GRAY_DARK : THEME.COLOR.RED_ICON
            }}
            multiline={false}
            maxLength={50}
            value={this.state.registrationName}
            placeholder={'Имя'}
            placeholderTextColor={THEME.COLOR.GRAY}
            onChangeText={(text) => this.setState({registrationName: text})}
          />
          {!this.state.nameValidate &&
          <Text style={styles.validateText}>Обязательное поле</Text>
          }
          <TextInput
            style={{
              ...styles.inputText,
              borderColor: this.state.emailValidate ? THEME.COLOR.GRAY_DARK : THEME.COLOR.RED_ICON
            }}
            multiline={false}
            maxLength={50}
            value={this.state.registrationEmail}
            placeholder={'Email'}
            placeholderTextColor={THEME.COLOR.GRAY}
            onChangeText={(text) => this.setState({registrationEmail: text})}
          />
          {!this.state.emailValidate &&
          <Text style={styles.validateText}>Некорректно введен e-mail адрес</Text>
          }
          <TextInput
            style={{
              ...styles.inputText,
              borderColor: this.state.passwordValidate ? THEME.COLOR.GRAY_DARK : THEME.COLOR.RED_ICON
            }}
            multiline={false}
            maxLength={50}
            value={this.state.registrationPassword}
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
            onPress={this.onRegistrationHandler}
          >
            <Text style={styles.submitButtonText}>Отправить</Text>
          </TouchableOpacity>
        </View>
      </Fragment>
    )
  }
}

export default RegistrationForm;


const styles = StyleSheet.create({
  container: {
    backgroundColor: THEME.COLOR.WHITE_BACKGROUND,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },

  registrationTitleText: {
    fontFamily: THEME.FONT_FAMILY.REGULAR,
    fontSize: THEME.FONT_SIZE.TITLE,
    color: THEME.COLOR.BLACK,
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
