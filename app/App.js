import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" hidden={true} />
      <SafeAreaView>
        <View>
          <Text>FixRolls</Text>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
});

export default App;
