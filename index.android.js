import React, { Component } from 'react';

const ReactNative = require('react-native');
const { AppRegistry, StyleSheet, Text, View, Image } = ReactNative;
// const FBSDK = require('react-native-fbsdk');
// const { LoginButton, AccessToken } = FBSDK;
const FacebookLogin = require('./src/components/FacebookLogin.js');

class AndroidBetBash extends Component {
  render() {
    return (
      <Image
        source={ require('./assets/images/jeteedecran.png') }
        style={ styles.imageBgContainer }>
        <View style={ styles.container }>
          <FacebookLogin />
        </View>
        <View style={ styles.bottomContainer }>
          <Text style={ styles.instructions }>
            or login using your email
          </Text>
        </View>
      </Image>
    );
  }
}

const styles = StyleSheet.create({
  imageBgContainer: {
    flex: 1,
    width: null,
    height: null,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'transparent',
  },
  bottomContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'transparent',
    paddingTop: 20,
    paddingBottom: 20,
  },
  instructions: {
    textAlign: 'center',
    color: '#FFFFFF'
  },
});

AppRegistry.registerComponent('AndroidBetBash', () => AndroidBetBash);
