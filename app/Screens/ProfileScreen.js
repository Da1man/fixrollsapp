import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Button,
  Image,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import {KeyboardAwareView} from 'react-native-keyboard-aware-view'
import Header from '../components/Header';
import {THEME, w, h} from '../common/variables';
import {connect} from 'react-redux';

import Loader from '../components/Loader'
import RegistrationForm from "../components/RegistrationForm";
import LoginForm from "../components/LoginForm";
import {LoginRegNavigator} from '../components/LoginRegNavigator'

import auth from "@react-native-firebase/auth";
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
import axios from 'axios';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPencil} from '@fortawesome/pro-light-svg-icons';

import ImagePicker from 'react-native-image-picker';


import {
  setIsSending,
  setCurrentUser,
  setCurrentUserData,
} from '../redux/profileReducer'
import {sendOrderWP} from "../common/WooCommerceApi";

const EditButton = (props) => {
  return (
    <TouchableOpacity>
      <FontAwesomeIcon style={styles.editIcon} icon={faPencil} size={THEME.FONT_SIZE.MAIN}
                       color={THEME.COLOR.ACCENT}/>
    </TouchableOpacity>
  )
}




class ProfileScreen extends React.Component {

  state = {
    isEditing: false,
    editName: '',
    editEmail: '',
    editAddress: '',
    editTel: '',
    editImage: '',
    imageLoading: false,
    isCorrectName: true,
    isCorrectTel: true,
    isCorrectEmail: true,
    isCorrectAdress: true,
  }

  componentDidMount() {
    this.setState({editName: this.props.currentUserData.name})
    this.setState({editEmail: this.props.currentUserData.email})
    this.setState({editAddress: this.props.currentUserData.address})
    this.setState({editTel: this.props.currentUserData.tel})
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

    const validateName = () => {
      const validate = this.state.editName ? true : false;
      console.log('validateName', validate)
      this.setState({isCorrectName: validate})
      return validate
    }

    const validateTel = () => {
      const validate = this.state.editTel.length > 9 ? true : false
      this.setState({isCorrectTel: validate})
      return validate
    }

    const validateEmail = () => {
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      const validate = this.state.editEmail ? reg.test(this.state.editEmail) : false
      this.setState({isCorrectEmail: validate})
      return validate
    }

    const validateAdress = () => {
      const validate = this.state.editAddress ? true : false
      this.setState({isCorrectAdress: validate})
      return validate
    }

    const onSaveProfile = () => {
      validateName();
      validateTel();
      validateEmail();
      validateAdress();

      if (validateName() && validateTel() && validateEmail() && validateAdress()) {
        console.log('onSaveProfile start')
        console.log('this.props.currentUser', this.props.currentUser)
        this.props.setIsSending(true)
        database()
          .ref('/users/' + this.props.currentUser)
          .set({
            name: this.state.editName,
            email: this.state.editEmail,
            address: this.state.editAddress,
            image: this.state.editImage,
            id: this.props.currentUserData.id,
            tel: this.state.editTel,
          })
          .then(() => {
            console.log('New user data set.')
            this.props.setCurrentUserData({
              name: this.state.editName,
              email: this.state.editEmail,
              address: this.state.editAddress,
              image: this.state.editImage,
              id: this.props.currentUserData.id,
              tel: this.state.editTel,
            })
            this.props.setIsSending(false)
            this.setState({isEditing: false})
          });
      } else {
        console.log('Не верно заполнены поля')
      }
    }

    const EditImage = () => {
      const onImageEditHandler = () => {
        const options = {
          title: 'Загрузить фото',
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };
        ImagePicker.showImagePicker(options, (response) => {
          this.props.setIsSending(true)
          console.log('Response = ', response);

          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          } else {



            // You can also display the image using data:
            // const source = { uri: 'data:image/jpeg;base64,' + response.data };

            storage()
              .ref(`/images/${this.props.currentUser}_avatar.jpeg`)
              .putFile(response.path)
              .on(
                storage.TaskEvent.STATE_CHANGED,
                snapshot => {
                  console.log(snapshot)

                  console.log('imageLoading: false')
                  storage()
                    .ref(`/images/${this.props.currentUser}_avatar.jpeg`)
                    .getDownloadURL().then(data => {
                    this.setState({editImage: data})
                    this.props.setIsSending(false)
                  }).catch(error => {
                    this.props.setIsSending(false)
                  })
                }
              )


          }
        });
      }

      return (
        <TouchableOpacity
          style={styles.editImageButton}
          onPress={() => onImageEditHandler()}
        >
          <FontAwesomeIcon style={styles.editImageIcon} icon={faPencil} size={THEME.FONT_SIZE.MAIN}
                           color={THEME.COLOR.WHITE}/>
        </TouchableOpacity>
      )
    }



    const renderContent = () => {

      if (currentUser) {
        return (
          <View>
            <View style={styles.imageSection}>
              {
                this.props.currentUserData && this.props.currentUserData.image && !this.state.editImage
                  ? <Image style={styles.userImage}
                           source={{uri: this.props.currentUserData.image}}
                           resizeMode={'cover'}
                  />
                  : <Image style={styles.userImage}
                           source={{uri: this.state.editImage}}
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
                        ? <TextInput
                          style={styles.nameInput}
                          value={this.state.editName}
                          multiline={false}
                          maxLength={50}
                          placeholder={'Не указано'}
                          placeholderTextColor={THEME.COLOR.GRAY}
                          onChangeText={(value) => this.setState({editName: value})}
                        />
                        : <Text style={styles.dataSectionText}>{this.props.currentUserData.name}</Text>
                    }

                  </View>
                  {
                    !this.state.isCorrectName && this.state.isEditing
                      ? <Text style={styles.validateText}>Обязательное поле</Text>
                      : null
                  }

                  <View style={styles.dataSection}>
                    <Text style={styles.dataSectionTitle}>Email: </Text>
                    <Text style={styles.dataSectionText}>{this.props.currentUserData.email}</Text>
                  </View>

                  <View style={styles.dataSection}>
                    <Text style={styles.dataSectionTitle}>Телефон: </Text>

                    {
                      this.state.isEditing
                        ? <TextInput
                          style={styles.nameInput}
                          value={this.state.editTel}
                          multiline={false}
                          maxLength={50}
                          placeholder={'Не указано'}
                          placeholderTextColor={THEME.COLOR.GRAY}
                          onChangeText={(value) => this.setState({editTel: value})}
                        />
                        : <Text style={styles.dataSectionText}>
                          {
                            this.props.currentUserData.tel
                              ? this.props.currentUserData.tel
                              : 'Не указано'
                          }
                        </Text>
                    }
                  </View>

                  {
                    !this.state.isCorrectTel && this.state.isEditing
                      ? <Text style={styles.validateText}>Некорректный телефон</Text>
                      : null
                  }

                  <View style={styles.dataSection}>
                    <Text style={styles.dataSectionTitle}>Адрес: </Text>

                    {
                      this.state.isEditing
                        ? <TextInput
                          style={styles.nameInput}
                          value={this.state.editAddress}
                          multiline={false}
                          maxLength={50}
                          placeholder={'Не указано'}
                          placeholderTextColor={THEME.COLOR.GRAY}
                          onChangeText={(value) => this.setState({editAddress: value})}
                        />
                        : <Text style={styles.dataSectionText}>
                          {
                            this.props.currentUserData.address
                              ? this.props.currentUserData.address
                              : 'Не указано'
                          }
                        </Text>
                    }
                  </View>

                  <View style={styles.buttonSection}>
                    {
                      this.state.isEditing
                        ? <TouchableOpacity
                          activeOpacity={THEME.SETTINGS.ACTIVE_OPACITY}
                          style={styles.buttonEdit}
                          onPress={() => onSaveProfile()}
                        >
                          <Text style={styles.buttonSectionText}>Сохранить</Text>
                        </TouchableOpacity>

                        : <TouchableOpacity
                          activeOpacity={THEME.SETTINGS.ACTIVE_OPACITY}
                          style={styles.buttonEdit}
                          onPress={() => this.onEditHandler()}
                        >
                          <Text style={styles.buttonSectionText}>Редактировать</Text>
                        </TouchableOpacity>
                    }

                    {
                      this.state.isEditing
                        ? <TouchableOpacity
                          activeOpacity={THEME.SETTINGS.ACTIVE_OPACITY}
                          style={styles.buttonLogout}
                          onPress={() => this.onEditHandler()}
                        >
                          <Text style={styles.buttonSectionText}>Отмена</Text>
                        </TouchableOpacity>
                        : <TouchableOpacity
                          activeOpacity={THEME.SETTINGS.ACTIVE_OPACITY}
                          style={styles.buttonLogout}
                          onPress={() => this.userSingOut()}
                        >
                          <Text style={styles.buttonSectionText}>Выйти</Text>
                        </TouchableOpacity>
                    }



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
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={{flex: 1}}
        keyboardVerticalOffset={-500}
      >
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
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: THEME.COLOR.WHITE_BACKGROUND,
    flex: 1,
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
    paddingVertical: 10,
    marginBottom: 0,
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
    elevation: 8,
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
    elevation: 8,
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
    elevation: 8,
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
  validateText: {
    color: THEME.COLOR.RED_ICON,
    paddingHorizontal: 20,
    fontFamily: THEME.FONT_FAMILY.REGULAR,
    fontSize: THEME.FONT_SIZE.INFO,
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
