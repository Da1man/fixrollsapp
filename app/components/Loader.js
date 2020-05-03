import React from 'react';
import {View, StyleSheet, Image, Animated} from 'react-native';
import {THEME} from '../common/variables';

class Loader extends React.Component {
  _logoHeight = new Animated.Value(150);

  componentDidMount() {
    Animated.loop(
      Animated.sequence([
        Animated.timing(this._logoHeight, {
          toValue: 200,
          duration: 700
        }),
        Animated.timing(this._logoHeight, {
          toValue: 150,
          duration: 700
        }),
      ]),
      {
        iterations: 10
      }
    ).start()
  }


  render() {
    const animatedLogoWidth = {
      height: this._logoHeight,
    };
    return (
      <View style={styles.container}>
        <Animated.View style={[styles.loaderImageBlock, animatedLogoWidth]}>
          <Image style={styles.loaderImage} source={require('../assets/fixrolls-logo.png')} resizeMode={'contain'}/>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: THEME.COLOR.WHITE_BACKGROUND,
    zIndex: 999,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  loaderImageBlock: {
    height: 150,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  loaderImage: {
    height: '100%',
  },
});

export default Loader;
