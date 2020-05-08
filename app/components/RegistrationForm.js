import React, {Fragment, Component} from 'react';
import {Text, StyleSheet, TextInput, TouchableOpacity, View} from "react-native";
import {THEME, w} from "../common/variables";
import auth from "@react-native-firebase/auth";
import database from '@react-native-firebase/database';

import {connect} from "react-redux";
import axios from "axios";
import {setIsSending, setCurrentUser, setCurrentUserData} from "../redux/profileReducer";


class RegistrationForm extends Component {

  state = {
    validating: false,
    registrationName: 'Виктория',
    registrationEmail: 'vika@mail.ru',
    registrationPassword: '12345678',
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
      this.props.setIsSending(true)

      auth()
        .createUserWithEmailAndPassword(this.state.registrationEmail, this.state.registrationPassword)
        .then((response) => {
          console.log('User account created & signed in!', response);
          this.props.setCurrentUser(response.user._user.uid)

          database()
            .ref('/users/' + response.user._user.uid)
            .set({
              name: this.state.registrationName,
              email: this.state.registrationEmail,
              address: '',
              image: '',
              id: response.user._user.uid,
            })
            .then(() => {
              this.props.setIsSending(false)
              this.props.setCurrentUser(response.user._user.uid)
              console.log('New user data set.')
              this.props.setCurrentUserData({
                name: this.state.registrationName,
                email: this.state.registrationEmail,
                address: '',
                image: '',
                id: response.user._user.uid,
              })
            });
          this.props.setIsSending(false)
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
            this.props.setIsSending(false)
          }

          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
            this.props.setIsSending(false)
          }

          console.error(error);
          this.props.setIsSending(false)
        });


    } else {

      this.props.setIsSending(false)
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

let mapStateToProps = state => {
  return {
    currentUser: state.profile.currentUser,
  };
};

export default connect(mapStateToProps, {
  setIsSending,
  setCurrentUser,
  setCurrentUserData,
})(RegistrationForm);


