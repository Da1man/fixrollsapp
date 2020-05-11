import React, {Component} from 'react';
import {THEME} from '../common/variables'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import RegistrationForm from "../components/RegistrationForm";
import LoginForm from "../components/LoginForm";


const Tab = createMaterialTopTabNavigator();


const tabBarOptions = {
  activeTintColor: THEME.COLOR.ACCENT,
  inactiveTintColor: THEME.COLOR.GRAY,
  indicatorStyle: {
    height: 2,
  },
  labelStyle: {
    fontFamily: THEME.FONT_FAMILY.BOLD,
    fontSize: THEME.FONT_SIZE.INFO,
    padding: 0,
  },
  showIcon: false,
  showLabel: true,
};

export const LoginRegNavigator = (props) => {
  return (
    <Tab.Navigator
      initialRouteName={'Войти'}
      tabBarOptions={tabBarOptions}
      lazy={true}
    >
      <Tab.Screen name="Вход" component={LoginForm} initialParams={props}/>
      <Tab.Screen name="Регистрация" component={RegistrationForm} initialParams={props}/>
    </Tab.Navigator>
  )
}

