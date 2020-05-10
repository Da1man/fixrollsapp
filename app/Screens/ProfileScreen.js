import React from 'react';
import {StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Button, Image} from 'react-native';
import Header from '../components/Header';
import {THEME, w, h} from '../common/variables';
import {connect} from 'react-redux';

import Loader from '../components/Loader'
import RegistrationForm from "../components/RegistrationForm";
import LoginForm from "../components/LoginForm";
import {LoginRegNavigator} from '../components/LoginRegNavigator'

import auth from "@react-native-firebase/auth";
import axios from 'axios';


import {
  setIsSending,
  setCurrentUser,
} from '../redux/profileReducer'


class ProfileScreen extends React.Component {

  componentDidMount() {
    console.log(this.props.currentUser)
    // console.log('this.props.currentUser', this.props.currentUser)
    // if (!this.props.currentUser) {
    //   auth().onAuthStateChanged(user => {
    //     console.log(user)
    //     this.props.setCurrentUser(user._user.uid)
    //   })
    // }
  }

  // getUserInfo = (currentUser) => {
  //   auth().onAuthStateChanged(user => {
  //     console.log(user)
  //     this.props.setCurrentUser(user._user.mail)
  //     return user
  //   })
  // }

  userSingOut = () => {
    auth()
      .signOut()
      .then(() => {
        this.props.setCurrentUser(null)
        console.log('User signed out!')
      });
  }


  render() {
    const {
      navigation,
      isSending,
      currentUser,
      setIsSending,
    } = this.props;

    const renderContent = () => {
      // if (isSending) {
      //   return <Loader/>
      // }

      if (currentUser) {
        return (
          <>
            <Image style={styles.userImage}
                   source={require('../assets/fixrolls-logo.png')}
                   resizeMode={'cover'}
            />
            <Button title={'userSingOut'} onPress={() => this.userSingOut()}/>
          </>
        )
      } else {
        return (
          <View style={styles.tabBarContainer}>
            <LoginRegNavigator setIsSending={setIsSending}/>
          </View>
        )
      }
    }


    if (isSending) {
      return <Loader/>
    }

    return (
      <View style={styles.container}>
        <Header backButton={true} navigation={navigation} title={'Профиль'}/>
        <View>
          <View style={styles.contentContainer}>

            {
              renderContent()
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
  loaderContainer: {
    // backgroundColor: 'red',
    // position: 'absolute',
    // top: 0,
    // bottom: 0,
    // left: 0,
    // right: 0,
  },
  contentContainer: {
    // justifyContent: 'center',
    // alignItems: 'center',
    height: h,
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
  userImage: {
    // width: '100%',
    height: w / 2,
  },

});

let mapStateToProps = state => {
  return {
    isSending: state.profile.isSending,
    currentUser: state.profile.currentUser,
    currentUserData: state.profile.currentUserData,
  };
};

export default connect(mapStateToProps, {
  setIsSending,
  setCurrentUser,
})(ProfileScreen);
