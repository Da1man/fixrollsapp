import React from 'react';
import {StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, AsyncStorage} from 'react-native';
import Header from '../components/Header';
import {THEME, w} from '../common/variables';
import {connect} from 'react-redux';

class ProfileScreen extends React.Component {
  componentDidMount() {
    this.state = {
      validating: false,
      email: '',
      pass: '',
    };
  }

  validate = () => {
    console.log('validating', this.state)
    this.setState({ validating: true });

    let formData = new FormData();
    formData.append('type', 'login');
    formData.append('email', this.state.email);
    formData.append('password', this.state.password);

    return fetch('https://fixrolls.ru/authentication.php', {
      method: 'POST',
      body: formData
    })
      .then((response) => response.json())
      .then((responseJson) => {
        let data = responseJson.data;

        if (this.saveToStorage(data)){
          this.setState({
            validating: false
          });

          /* Redirect to accounts page */
          // Actions.pageAccount();
          console.log('Success to store auth');
        } else {
          console.log('Failed to store auth');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async saveToStorage(userData){
    if (userData) {
      await AsyncStorage.setItem('user', JSON.stringify({
          isLoggedIn: true,
          authToken: userData.auth_token,
          id: userData.user_id,
          name: userData.user_login
        })
      );
      return true;
    }

    return false;
  }

  render() {
    const {navigation} = this.props;

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
              onChangeText={(text) => this.setState({email:text})}
            />
            <TextInput
              style={styles.inputText}
              multiline={false}
              maxLength={50}
              placeholder={'Пароль'}
              placeholderTextColor={THEME.COLOR.GRAY}
              onChangeText={(text) => this.setState({pass:text})}
            />
            <TouchableOpacity
              style={styles.submitButton}
              activeOpacity={THEME.SETTINGS.ACTIVE_OPACITY}
              onPress={this.validate}
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
  return {};
};

export default connect(mapStateToProps, {})(ProfileScreen);
