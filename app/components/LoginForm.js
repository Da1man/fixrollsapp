import React, {Fragment, Component} from 'react';
import {Text, StyleSheet, TextInput, TouchableOpacity, View} from "react-native";
import {THEME, w, h} from "../common/variables";
import auth from "@react-native-firebase/auth";
import database from '@react-native-firebase/database';
import {connect} from "react-redux";
import {setCurrentUser, setIsSending, setCurrentUserData} from "../redux/profileReducer";
import axios from "axios";

class LoginForm extends Component {
  componentDidMount() {
  }

  state = {
    validating: false,
    loginEmail: 'test@test.ru',
    loginPassword: '12345678',
    emailValidate: true,
    passwordValidate: true,
  }

  getUserData = (userId) => {
    this.props.setIsSending(true)

    database()
      .ref('/users/' + userId)
      .once('value')
      .then(snapshot => {
        console.log('User data: ', snapshot.val());
        this.props.setCurrentUserData({
          name: snapshot.val().name,
          email: snapshot.val().email,
          address: snapshot.val().address,
          image: snapshot.val().image,
          id: snapshot.val().id,
          tel: snapshot.val().tel
        })
        this.props.setIsSending(false)
      });

  }

  validateEmail = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const validate = this.state.loginEmail ? reg.test(this.state.loginEmail) : false
    this.setState({emailValidate: validate})
    return validate
  }

  validatePassword = () => {
    const validate = this.state.loginPassword ? true : false;
    console.log('validatePassword', validate)
    this.setState({passwordValidate: validate})
    return validate
  }

  onloginHandler = () => {
    this.validateEmail()
    this.validatePassword()
    if (this.validateEmail() && this.validatePassword()) {
      this.props.route.params.setIsSending(true)

      auth()
        .signInWithEmailAndPassword(this.state.loginEmail, this.state.loginPassword)
        .then((response) => {
          console.log('User account signed in!', response);
          this.props.setCurrentUser(response.user._user.uid)
          this.getUserData(response.user._user.uid)
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
          this.props.route.params.setIsSending(false)
        });


    } else {

      this.props.route.params.setIsSending(false)
    }
  }

  render() {
    return (
      <Fragment>
        <View style={styles.container}>
          <Text style={styles.loginTitleText}>Авторизация</Text>
          <TextInput
            style={{
              ...styles.inputText,
              borderColor: this.state.emailValidate ? THEME.COLOR.GRAY_DARK : THEME.COLOR.RED_ICON
            }}
            multiline={false}
            maxLength={50}
            value={this.state.loginEmail}
            placeholder={'Email'}
            placeholderTextColor={THEME.COLOR.GRAY}
            onChangeText={(text) => this.setState({loginEmail: text})}
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
            value={this.state.loginPassword}
            placeholder={'Пароль'}
            placeholderTextColor={THEME.COLOR.GRAY}
            onChangeText={(text) => this.setState({loginPassword: text})}
          />
          {!this.state.passwordValidate &&
          <Text style={styles.validateText}>Обязательное поле</Text>
          }
          <TouchableOpacity
            style={styles.submitButton}
            activeOpacity={THEME.SETTINGS.ACTIVE_OPACITY}
            onPress={this.onloginHandler}
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

  loginTitleText: {
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
  setCurrentUser,
  setIsSending,
  setCurrentUserData
})(LoginForm);
