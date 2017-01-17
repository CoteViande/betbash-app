import React from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'

import EmailLoginForm from 'BetBash/src/components/auth/EmailLoginForm'
import styles from 'BetBash/src/assets/styles/main'

const LoginEmail = React.createClass({
  render() {
    const { loginError, loginSuccess, isLoading } = this.props

    return(
      <View style={styles.navBarContainer}>
        <EmailLoginForm
          loginError={loginError}
          loginSuccess={loginSuccess}
          isLoading={isLoading}
        />
      </View>
    )
  }
})

const mapStateToProps = (state, { params }) => ({
  loginError: state.auth.error.emailLogin,
  loginSuccess: state.auth.user.isLoggedIn,
  isLoading: state.auth.isLoading,
})

export default connect(
  mapStateToProps
)(LoginEmail)