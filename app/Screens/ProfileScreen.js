import React from 'react';
import {StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Button} from 'react-native';
import Header from '../components/Header';
import {THEME, w, h} from '../common/variables';
import {connect} from 'react-redux';


import RegistrationForm from "../components/RegistrationForm";
import LoginForm from "../components/LoginForm";
import {LoginRegNavigator} from '../components/LoginRegNavigator'

import auth from "@react-native-firebase/auth";
import axios from 'axios';


import {
  setIsSending,
  setCurrentUserId,
} from '../redux/profileReducer'


class ProfileScreen extends React.Component {

  componentDidMount() {
    console.log(this.props.currentUserId)
    // console.log('this.props.currentUser', this.props.currentUser)
    // if (!this.props.currentUser) {
    //   auth().onAuthStateChanged(user => {
    //     console.log(user)
    //     this.props.setCurrentUserId(user._user.uid)
    //   })
    // }
  }

  getUserInfo = (currentUserId) => {
    axios.get(`https://fixrolls-app.firebaseio.com/users/${currentUserId}.json`).then(
      response => {
        console.log(response.data)
      }
    )
  }

  userSingOut = () => {
    auth()
      .signOut()
      .then(() => {
        this.props.setCurrentUserId(null)
        console.log('User signed out!')
      });
  }


  render() {
    const {
      navigation,
      currentUserId,
      setIsSending,
    } = this.props;


    return (
      <View style={styles.container}>
        <Header backButton={true} navigation={navigation} title={'Профиль'}/>
        <View>
          <View style={styles.contentContainer}>

            {
              currentUserId
                ? <>
                <Text>User logged in {currentUserId}</Text>
                <Button title={'getUserInfo'} onPress={() => this.getUserInfo(currentUserId)} />
                <Button title={'userSingOut'} onPress={() => this.userSingOut()} />
                </>
                : <View style={styles.tabBarContainer}>
                  <LoginRegNavigator setIsSending={setIsSending}/>
                </View>
            }


          </View>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: THEME.COLOR.WHITE_BACKGROUND,
    // width: '100%',
    // height: '100%',
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '90%',
    width: '100%',
    // flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  tabBarContainer: {
    backgroundColor: 'green',
    height: h / 2,
    width: '100%',
  },
});

let mapStateToProps = state => {
  return {
    isSending: state.profile.isSending,
    currentUserId: state.profile.currentUserId,
  };
};

export default connect(mapStateToProps, {
  setIsSending,
  setCurrentUserId,
})(ProfileScreen);
