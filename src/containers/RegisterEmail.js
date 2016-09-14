import React from 'react'
import { View, Text } from 'react-native'
import { connect, dispatch } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import { formValueSelector } from 'redux-form'

import { loginWithEmail } from '../actions/authActions'
import AwesomeButton from 'react-native-awesome-button'
import EmailRegisterForm from '../components/EmailRegisterForm'

import styles from '../../assets/styles/main'

const RegisterEmail = React.createClass({
  componentWillReceiveProps(nextProps) {
    const { loginWithEmail, email, password } = this.props
    if (nextProps.registered &&
      nextProps.registered !== this.props.registered) {
      loginWithEmail(email, password);
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

        <View style={styles.box}>
          <Text>
            {'Already registered?'}
          </Text>
          <AwesomeButton
            backgroundStyle={styles.loginButtonBackground}
            labelStyle={styles.loginButtonLabel}
            states={{
              default: {
                text: 'Log in!',
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

const selector = formValueSelector('emailRegister')

const mapStateToProps = (state) => {
  return {
    registerError: state.auth.errorMessageEmailRegister,
    loginSuccess: state.auth.user.isLoggedIn,
    isLoading: state.auth.isLoading,
    registered: state.auth.authenticatedOnEmail,
    email: selector(state, 'email'),
    password: selector(state, 'password'),
  };
};

export default connect(
  mapStateToProps,
  {
    loginWithEmail,
  }
)(RegisterEmail);