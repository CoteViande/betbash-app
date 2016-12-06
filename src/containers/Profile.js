import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, View, Image } from 'react-native'
import AwesomeButton from 'react-native-awesome-button'

import btnStates from '../utils/buttonStates'
import { logoutFromApp } from '../actions/authActions'
import styles from '../../assets/styles/main'

let Profile = React.createClass({
  render() {
    const { logoutFromApp, isLoading, error, success, accessToken } = this.props
    const buttonState = (isLoading, success, error) => {
      if (success) { return 'success' }
      if (error) { return 'error' }
      if (isLoading) { return 'busy' }
      return 'idle'
    }

    return(
      <View style={styles.topBarContainer}>

        <View style={styles.box}>
          <AwesomeButton
            backgroundStyle={styles.loginButtonBackground}
            labelStyle={styles.loginButtonLabel}
            transitionDuration={200}
            states={btnStates(
              () => {
                logoutFromApp(accessToken)
              },
              'Log me out!',
              'Logging out...',
              'Logged out!',
              'Log me out I said!'
            )}
            buttonState={buttonState(isLoading, success, error)}
          />
        </View>

      </View>
    );
  }
});

const mapStateToProps = (state, { params }) => {
  return {
    success: !state.auth.user.isLoggedIn,
    isLoading: state.auth.isLoading,
    error: state.auth.errorMessageLogout,
    accessToken: state.auth.user.accessToken,
  };
};

export default connect(
  mapStateToProps,
  {
    logoutFromApp,
  }
)(Profile);