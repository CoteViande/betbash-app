import React from 'react'
import { connect } from 'react-redux'
import { Image } from 'react-native'

import MainLogin from 'BetBash/src/components/auth/MainLogin'
import LoadingPage from 'BetBash/src/components/general/LoadingPage'
import ErrorMessage from 'BetBash/src/components/general/ErrorMessage'

import styles from 'BetBash/src/assets/styles/main'

class FacebookAuthentication extends React.Component {
  render() {
    const { navigate } = this.props.navigation
    const { isLoading, errorMessage, isLoggedIn } = this.props

    // isLoggedIn to avoid seeing auth screen during redirection to landing
    if (isLoading || isLoggedIn) {
      return (
        <LoadingPage />
      )
    }

    return (
      <Image
        source={require('../../assets/images/jeteedecran.png')}
        style={styles.imageBgContainer}
      >
        <ErrorMessage
          message={errorMessage}
        />
        <MainLogin
          otherLoginPress={() => navigate('EmailRegister')}
        />
      </Image>
    )
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.auth.user.isLoggedIn,
  errorMessage: state.auth.error.FBAuth,
  isLoading: state.auth.isLoading,
})

export default connect(
  mapStateToProps,
)(FacebookAuthentication)