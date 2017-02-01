import React from 'react'
import { connect } from 'react-redux'
import { LoginButton, AccessToken } from 'react-native-fbsdk'

import {
  failureFacebookToken,
  successFacebookToken,
  authenticateWithFacebookToken,
  logoutFromFacebook,
} from 'BetBash/src/actions/auth.actions'

class FacebookLoginButton extends React.Component {
  render() {
    const {
      failureFacebookToken,
      successFacebookToken,
      authenticateWithFacebookToken,
      logoutFromFacebook,
    } = this.props

    return (
      <LoginButton
        onLoginFinished={
          (error, result) => {
            if (error) {
              failureFacebookToken(result.error)
            } else if (result.isCancelled) {
              failureFacebookToken({
                message: 'Login has been canceled.',
              })
            } else {
              AccessToken.getCurrentAccessToken().then(data => { // https://developers.facebook.com/docs/facebook-login/access-tokens
                const accessToken = data.accessToken
                successFacebookToken()
                authenticateWithFacebookToken(accessToken.toString(), false)
              })
            }
          }
        }
        onLogoutFinished={logoutFromFacebook}
      />
    )
  }
}

const mapDispatchToProps = {
  failureFacebookToken,
  successFacebookToken,
  authenticateWithFacebookToken,
  logoutFromFacebook,
} // TODO Do the connecting in the container
export default connect(
  null,
  mapDispatchToProps,
)(FacebookLoginButton)