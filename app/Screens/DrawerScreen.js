import React from 'react';
import {StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Button, Image} from 'react-native';
import Header from '../components/Header';
import {THEME, w, h} from '../common/variables';
import {connect} from 'react-redux';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faUser, faLeaf, faPlusCircle, faFire} from '@fortawesome/pro-light-svg-icons';

import Loader from '../components/Loader'

class DrawerScreen extends React.Component {

  componentDidMount() {
    console.log('Drawer', this.props)
  }

  render() {

    const renderImage = () => {
      if (this.props.currentUserData && this.props.currentUserData.image) {
        return (
          <Image style={styles.userImage}
                 source={{uri: this.props.currentUserData.image}}
                 resizeMode={'cover'}
          />
        )
      } else {
        return (
          <Image style={styles.userImage}
                 source={require('../assets/fixrolls-logo.png')}
                 resizeMode={'cover'}
          />
        )
      }
    }

    const renderMenuList = () => {

      return (<>
          <TouchableOpacity style={styles.listItemSection} onPress={() => this.props.navigation.navigate('Мой профиль')}>
            <FontAwesomeIcon style={styles.listIcon} icon={faUser} size={THEME.FONT_SIZE.TITLE}
                             color={THEME.COLOR.GRAY_DARK}/>
            {
              this.props.currentUserData
                ? <Text style={styles.listText}>{this.props.currentUserData.name}</Text>
                : <Text style={styles.listText}>Войти</Text>
            }

          </TouchableOpacity>
        </>
      )
    }

    return (
      <View style={styles.container}>
        <View style={styles.imageSection}>
          {renderImage()}
        </View>
        <View style={styles.menuListSection}>
          {renderMenuList()}
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
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  imageSection: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    // width: '100%',
  },
  userImage: {
    width: w / 2,
    height: w / 2,
  },
  menuListSection: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  listItemSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listIcon: {
    marginRight: 20,
  },
  listText: {
    fontFamily: THEME.FONT_FAMILY.REGULAR,
    fontSize: THEME.FONT_SIZE.TITLE,
    color: THEME.COLOR.GRAY,
  }
});

let mapStateToProps = state => {
  return {
    currentUser: state.profile.currentUser,
    currentUserData: state.profile.currentUserData,
  };
};

export default connect(mapStateToProps, {})(DrawerScreen);
