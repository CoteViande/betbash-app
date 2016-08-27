import { connect } from 'react-redux';
import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { Actions } from 'react-native-router-flux';

let RegisterEmail = React.createClass({
  render() {
    const goToLogInPage = () => Actions.BetBash();

    return(
      <View style={{flex: 1,
      justifyContent: 'center',
      alignItems: 'center',}}>
        <Text>
          TEST
        </Text>
        <Text onPress={ goToLogInPage }>
          Go to main page
        </Text>
      </View>
    );
  }
});

export default connect()(RegisterEmail);