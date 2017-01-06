import React from 'react'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'

import { failureFacebookToken, successFacebookToken, authenticateWithFacebookToken, logoutFromFacebook } from '../actions/authActions'

const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  AccessToken,
} = FBSDK;

const FacebookLoginButton = ({ dispatch }) => (
  <LoginButton
    onLoginFinished={
      (error, result) => {
        if (error) {
          dispatch(failureFacebookToken(result.error));
        } else if (result.isCancelled) {
          dispatch(failureFacebookToken({
            message: 'Login has been canceled.'
          }));
        } else {
          AccessToken.getCurrentAccessToken().then(
            (data) => { // https://developers.facebook.com/docs/facebook-login/access-tokens
              let accessToken = data.accessToken;
              dispatch(successFacebookToken());
              dispatch(authenticateWithFacebookToken(accessToken.toString()));
            }
          )
        }
      }
    }
    onLogoutFinished={ () => {
      dispatch(logoutFromFacebook());
    } }
  />
);

export default connect()(FacebookLoginButton)