import React from 'react'
import { View, Text } from 'react-native'
import { connect, dispatch } from 'react-redux'
import { Actions } from 'react-native-router-flux'

import { loginWithEmail } from '../actions/authActions'
import AwesomeButton from 'react-native-awesome-button'
import EmailRegisterForm from '../components/EmailRegisterForm'

import styles from '../../assets/styles/main'

const RegisterEmail = React.createClass({
  componentWillReceiveProps(nextProps) {
    const { loginWithEmail } = this.props
    if (nextProps.registered && nextProps.registered !== this.props.registered) {
      loginWithEmail(
        'bob@betbash.com',
        'LeRoiLionAdmin'
      );
    }
  },
  render() {
    const { registerError, registered, loginSuccess, isLoading } = this.props
    const goToEmailLogin = () => Actions.LoginEmail()

    return(
      <View style={styles.navBarContainer}>

        <View style={styles.box}>
          <EmailRegisterForm
            registerError={registerError}
            loginSuccess={loginSuccess}
            isLoading={isLoading}
          />
        </View>

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

const mapStateToProps = (state) => {
  return {
    registerError: state.auth.errorMessageEmailRegister,
    loginSuccess: state.auth.user.isLoggedIn,
    isLoading: state.auth.isLoading,
    registered: state.auth.authenticatedOnEmail,
  };
};

export default connect(
  mapStateToProps,
  {
    loginWithEmail,
  }
)(RegisterEmail);