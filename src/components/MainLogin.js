import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { Actions } from 'react-native-router-flux'

import FacebookLogin from './FacebookLogin'

module.exports = React.createClass({
  render: function() {
    const goToEmailAuth = () => Actions.AuthEmail();
    return (
      <Image
        source={ require('../../assets/images/jeteedecran.png') }
        style={ styles.imageBgContainer }>
        <View style={ styles.container }>
          <FacebookLogin />
        </View>
        <View style={ styles.bottomContainer }>
          <Text style={ styles.instructions }
            onPress={ goToEmailAuth }>
            Log in with your email
          </Text>
        </View>
      </Image>
    );
  }
});

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