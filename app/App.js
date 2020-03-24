import React from 'react';
import {View, StyleSheet, Animated} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import store from './redux/store';
import {THEME} from './common/variables';

import CatalogScreen from './Screens/CatalogScreen';
import ProductScreen from './Screens/ProductScreen';
import CheckoutScreen from './Screens/CheckoutScreen';


import { CardStyleInterpolators } from '@react-navigation/stack';


const Stack = createStackNavigator();


const App = () => {
  return (
    <>
      <StatusBar hidden={true}/>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              cardStyle: {
                backgroundColor: THEME.COLOR.GRAY_BACKGROUND,
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
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: THEME.COLOR.WHITE_BACKGROUND,
  },
});

export default App;
