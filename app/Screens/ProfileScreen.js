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

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPencil} from '@fortawesome/pro-light-svg-icons';


import {
  setIsSending,
  setCurrentUser,
  setCurrentUserData,
} from '../redux/profileReducer'

const EditButton = (props) => {
  return (
    <TouchableOpacity>
      <FontAwesomeIcon style={styles.editIcon} icon={faPencil} size={THEME.FONT_SIZE.MAIN}
                       color={THEME.COLOR.ACCENT}/>
    </TouchableOpacity>
  )
}

const EditImage = (props) => {
  return (
    <TouchableOpacity style={styles.editImageButton}>
      <FontAwesomeIcon style={styles.editImageIcon} icon={faPencil} size={THEME.FONT_SIZE.MAIN}
                       color={THEME.COLOR.WHITE}/>
    </TouchableOpacity>
  )
}


class ProfileScreen extends React.Component {

  state = {
    isEditing: false,
    editData: {
      name: '',
      email: '',
      address: '',
      tel: '',
      image: '',
    },
  }

  componentDidMount() {

    this.setState({
      editData: {
        name: this.props.currentUserData.name,
        email: this.props.currentUserData.email,
        address: this.props.currentUserData.address,
        tel: this.props.currentUserData.tel,
        image: this.props.currentUserData.image,
      }
    })
  }

  userSingOut = () => {
    auth()
      .signOut()
      .then(() => {
        this.props.setCurrentUser(null)
        this.props.setCurrentUserData(null)
        console.log('User signed out!')
      });
  }

  onEditHandler = () => {
    if (!this.state.isEditing) {

      this.setState({isEditing: true})
      console.log(this.state)
    } else {

      this.setState({isEditing: false})
      console.log(this.state)
    }
  }


  render() {
    const {
      navigation,
      isSending,
      currentUser,
      setIsSending,
    } = this.props;

    const NameInput = () => {

      return (
        <TextInput
          style={styles.nameInput}
          value={this.state.editData.name}
          multiline={false}
          maxLength={50}
          // onChangeText={(value) => {
          //   this.setState({
          //       editData: {
          //         name: value
          //       }
          //     }
          //   )
          // }
          // }
        />
      )
    }

    const renderContent = () => {

      if (currentUser) {
        return (
          <View>
            <View style={styles.imageSection}>
              {
                this.props.currentUserData && this.props.currentUserData.image
                  ? <Image style={styles.userImage}
                           source={{uri: this.props.currentUserData.image}}
                           resizeMode={'cover'}
                  />
                  : <Image style={styles.userImage}
                           source={require('../assets/fixrolls-logo.png')}
                           resizeMode={'cover'}
                  />
              }
              {this.state.isEditing && <EditImage/>}
            </View>
            {
              this.props.currentUserData
                ? <>
                  <View style={styles.dataSection}>
                    <Text style={styles.dataSectionTitle}>Имя: </Text>

                    {
                      this.state.isEditing
                        ? <NameInput/>
                        : <Text style={styles.dataSectionText}>{this.props.currentUserData.name}</Text>
                    }
                  </View>

                  <View style={styles.dataSection}>
                    <Text style={styles.dataSectionTitle}>Email: </Text>
                    <Text style={styles.dataSectionText}>{this.props.currentUserData.email}</Text>
                    {this.state.isEditing && <EditButton/>}
                  </View>

                  <View style={styles.dataSection}>
                    <Text style={styles.dataSectionTitle}>Телефон: </Text>
                    <Text style={styles.dataSectionText}>
                      {
                        this.props.currentUserData.tel
                          ? this.props.currentUserData.tel
                          : 'Не указано'
                      }
                    </Text>
                    {this.state.isEditing && <EditButton/>}
                  </View>

                  <View style={styles.dataSection}>
                    <Text style={styles.dataSectionTitle}>Адрес: </Text>
                    <Text style={styles.dataSectionText}>
                      {
                        this.props.currentUserData.address
                          ? this.props.currentUserData.address
                          : 'Не указано'
                      }
                    </Text>
                    {this.state.isEditing && <EditButton/>}
                  </View>

                  <View style={styles.buttonSection}>

                    <TouchableOpacity
                      activeOpacity={THEME.SETTINGS.ACTIVE_OPACITY}
                      style={styles.buttonEdit}
                      onPress={() => this.onEditHandler()}
                    >
                      {
                        this.state.isEditing
                          ? <Text style={styles.buttonSectionText}>Сохранить</Text>
                          : <Text style={styles.buttonSectionText}>Редактировать</Text>
                      }
                    </TouchableOpacity>

                    <TouchableOpacity
                      activeOpacity={THEME.SETTINGS.ACTIVE_OPACITY}
                      style={styles.buttonLogout}
                      onPress={() => this.userSingOut()}
                    >
                      <Text style={styles.buttonSectionText}>Выйти</Text>
                    </TouchableOpacity>

                  </View>
                </>
                : null
            }


          </View>
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
          <ScrollView style={styles.contentContainer}>
            {
              renderContent()
            }
          </ScrollView>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: THEME.COLOR.WHITE_BACKGROUND,
  },
  contentContainer: {
    // justifyContent: 'center',
    // alignItems: 'center',
    height: h,
    width: '100%',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  tabBarContainer: {
    backgroundColor: 'green',
    height: h / 1.7,
    width: '100%',
  },
  imageSection: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    marginBottom: 10,
  },
  userImage: {
    width: w / 1.3,
    height: w / 1.3,
  },
  dataSection: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dataSectionTitle: {
    fontFamily: THEME.FONT_FAMILY.BOLD,
    fontSize: THEME.FONT_SIZE.TITLE,
    color: THEME.COLOR.BLACK,
  },
  dataSectionText: {
    fontFamily: THEME.FONT_FAMILY.REGULAR,
    fontSize: THEME.FONT_SIZE.TITLE,
    color: THEME.COLOR.BLACK,
  },
  buttonSection: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonLogout: {
    justifyContent: 'center',
    alignItems: 'center',
    width: w * 0.4,
    height: 50,
    backgroundColor: THEME.COLOR.GRAY_DISABLED,
    borderRadius: 50,
  },
  buttonSectionText: {
    fontFamily: THEME.FONT_FAMILY.REGULAR,
    fontSize: THEME.FONT_SIZE.MAIN,
    color: THEME.COLOR.BLACK,
  },
  buttonEdit: {
    justifyContent: 'center',
    alignItems: 'center',
    width: w * 0.4,
    height: 50,
    backgroundColor: THEME.COLOR.ACCENT,
    borderRadius: 50,
  },
  editIcon: {
    marginLeft: 20,
  },
  editImageIcon: {},
  editImageButton: {
    width: 50,
    height: 50,
    backgroundColor: THEME.COLOR.ACCENT,
    position: 'absolute',
    top: 10,
    right: 10,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameInput: {
    // borderWidth: 1,
    // borderColor: THEME.COLOR.GRAY_DARK,
    // borderRadius: 50,
    // marginBottom: 10,
    // marginTop: 10,
    fontFamily: THEME.FONT_FAMILY.REGULAR,
    fontStyle: 'italic',
    fontSize: THEME.FONT_SIZE.TITLE,
    backgroundColor: THEME.COLOR.GRAY_BACKGROUND,
    paddingHorizontal: 15,
    padding: 0,
    margin: 0,
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
  setCurrentUserData,
})(ProfileScreen);
