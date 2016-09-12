import React from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'

import styles from '../../assets/styles/main'

import AwesomeButton from 'react-native-awesome-button'

const RegisterEmail = React.createClass({
  render() {
    const goToEmailLogin = () => Actions.LoginEmail();

    return(
      <View style={styles.navBarContainer}>
        <Text>
          {'Hello registration'}
        </Text>
        <View style={styles.abContainer}>
          <AwesomeButton
            backgroundStyle={styles.loginButtonBackground}
            labelStyle={styles.loginButtonLabel}
            states={{
              default: {
                text: 'Already registered? Log in!',
                backgroundColor: '#1155DD',
                onPress: goToEmailLogin,
              }
            }}
          />
        </View>
      </View>
    );
  }
});

export default RegisterEmail;