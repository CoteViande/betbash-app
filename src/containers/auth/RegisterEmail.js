import React from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { formValueSelector } from 'redux-form'

import { loginWithEmail } from 'BetBash/src/actions/auth.actions'
import EmailRegisterForm from 'BetBash/src/components/auth/EmailRegisterForm'
import styles from 'BetBash/src/assets/styles/main'

const RegisterEmail = React.createClass({
  componentWillReceiveProps(nextProps) {
    const { loginWithEmail, email, password } = this.props
    if (nextProps.registered &&
      nextProps.registered !== this.props.registered) {
      loginWithEmail(email, password, false);
    }
  },

  render() {
    const { registerError, registered, loginSuccess, isLoading } = this.props

    return(
      <View style={styles.navBarContainer}>
        <EmailRegisterForm
          registerError={ registerError }
          loginSuccess={ loginSuccess }
          isLoading={ isLoading }
        />
      </View>
    )
  }
})

const selector = formValueSelector('emailRegister')

const mapStateToProps = state => ({
  registerError: state.auth.error.emailRegister,
  loginSuccess: state.auth.user.isLoggedIn,
  isLoading: state.auth.isLoading,
  registered: state.auth.authenticatedOnEmail,
  email: selector(state, 'email'),
  password: selector(state, 'password'),
})

const mapDispatchToProps = { loginWithEmail }

export default connect(
  mapStateToProps, mapDispatchToProps
)(RegisterEmail);