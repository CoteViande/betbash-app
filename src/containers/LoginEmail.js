import React from 'react'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'

import EmailLoginForm from '../components/EmailLoginForm'

const LoginEmail = React.createClass({
  render() {
    const { loginError, loginSuccess, isLoading } = this.props

    return(
      <EmailLoginForm
        loginError={loginError}
        loginSuccess={loginSuccess}
        isLoading={isLoading}
      />
    );
  }
});

const mapStateToProps = (state, { params }) => {
  return {
    loginError: state.auth.errorMessageEmailLogin,
    loginSuccess: state.auth.user.isLoggedIn,
    isLoading: state.auth.isLoading,
  };
};

export default connect(
  mapStateToProps
)(LoginEmail);