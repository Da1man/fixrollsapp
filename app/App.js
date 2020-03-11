import React from 'react';
import {View, StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'react-native';

import CatalogScreen from './Screens/CatalogScreen'
import {THEME} from './common/variables';

const Stack = createStackNavigator();

const App = () => {
  return (
    <>
      <StatusBar hidden={true} />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            cardStyle: {
              backgroundColor: THEME.COLOR.GRAY_BACKGROUND,
            }
          }}
        >
          <Stack.Screen name="Catalog" component={CatalogScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: THEME.COLOR.WHITE_BACKGROUND,
  },
})

export default App;
