import React from 'react';
import {StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, AsyncStorage} from 'react-native';
import Header from '../components/Header';
import {THEME, w} from '../common/variables';
import {connect} from 'react-redux';

// import auth from '@react-native-firebase/auth';

import {
  setRegistrationEmail,
  setRegistrationPassword,
  setIsSending,
} from '../redux/profileReducer'

class ProfileScreen extends React.Component {

  state = {
    validating: false,
    registrationEmail: '',
    registrationPassword: '',
  }

  validateEmail = () => {
    if (this.state.registrationEmail) {
      return true
    }
  }

  validatePassword = () => {
    if (this.state.registrationPassword) {
      return true
    }
  }

  render() {
    const {navigation,
      setRegistrationEmail, setRegistrationPassword, setIsSending
    } = this.props;


    const onRegistrationHandler = () => {
      if (this.validateEmail() && this.validatePassword()) {
        console.log('Validation success')
        setRegistrationEmail(this.state.registrationEmail)
        setRegistrationPassword(this.state.registrationPassword)
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
              style={styles.inputText}
              multiline={false}
              maxLength={50}
              placeholder={'Email'}
              placeholderTextColor={THEME.COLOR.GRAY}
              onChangeText={(text) => this.setState({registrationEmail:text})}
            />
            <TextInput
              style={styles.inputText}
              multiline={false}
              maxLength={50}
              placeholder={'Пароль'}
              placeholderTextColor={THEME.COLOR.GRAY}
              onChangeText={(text) => this.setState({registrationPassword:text})}
            />
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
  },
  submitButtonText: {
    fontFamily: THEME.FONT_FAMILY.REGULAR,
    fontSize: THEME.FONT_SIZE.TITLE,
    color: THEME.COLOR.WHITE,
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
  setRegistrationEmail,
  setRegistrationPassword,
  setIsSending,
})(ProfileScreen);
