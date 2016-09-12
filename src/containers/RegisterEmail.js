import React from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'

import styles from '../../assets/styles/main'

const RegisterEmail = React.createClass({
  render() {
    return(
      <View style={ styles.navBarContainer }>
        <Text>
          {'Hello registration'}
        </Text>
      </View>
    );
  }
});

export default RegisterEmail;