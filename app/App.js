import React from 'react';
import {StyleSheet, Button, View, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import store from './redux/store';
import {THEME, w} from './common/variables';

import CatalogScreen from './Screens/CatalogScreen';
import ProductScreen from './Screens/ProductScreen';
import CheckoutScreen from './Screens/CheckoutScreen';
import PolicyScreen from './Screens/PolicyScreen';
import ProfileScreen from './Screens/ProfileScreen';

import DrawerScreen from "./Screens/DrawerScreen";

import {CardStyleInterpolators} from '@react-navigation/stack';

const Stack = createStackNavigator();

const CatalogStack = () => {
  return(
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: THEME.COLOR.WHITE_BACKGROUND,
        },
      }}
    >
      <Stack.Screen
        name="Catalog"
        component={CatalogScreen}
      />
      <Stack.Screen
        name="Product"
        component={ProductScreen}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name="Checkout"
        component={CheckoutScreen}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name="Policy"
        component={PolicyScreen}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      />
    </Stack.Navigator>
  )
}

const Drawer = createDrawerNavigator();



const drawerContent = ({state, navigation}) => {
  return(
    <DrawerScreen state={state} navigation={navigation}/>
  )
}


const App = () => {
  return (
    <>
      <StatusBar hidden={true}/>
      <Provider store={store}>
        <NavigationContainer>
          <Drawer.Navigator
            drawerPosition={'right'}
            drawerType={'slide'}
            drawerStyle={drawerStyle}
            drawerContent={drawerContent}
          >
            <Drawer.Screen name="Каталог" component={CatalogStack} />
            <Drawer.Screen name="Мой профиль" component={ProfileScreen} />
            <Drawer.Screen name="Политика" component={PolicyScreen} />
          </Drawer.Navigator>
        </NavigationContainer>
      </Provider>
    </>
  )
    ;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: THEME.COLOR.WHITE_BACKGROUND,
  },
});

const drawerStyle = {
  backgroundColor: THEME.COLOR.WHITE_BACKGROUND,
  width: w * 0.85,
}

export default App;
