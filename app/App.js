import React from 'react';
import {View, StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import store from './redux/store';

import BlurOverlay,{closeOverlay,openOverlay} from 'react-native-blur-overlay';

import CatalogScreen from './Screens/CatalogScreen';
import {THEME} from './common/variables';
import ProductScreen from './Screens/ProductScreen';

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
            <Stack.Screen name="Catalog" component={CatalogScreen}/>
            <Stack.Screen name="Product" component={ProductScreen}/>
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
