import Keychain from 'react-native-keychain'
import { AccessToken } from 'react-native-fbsdk'

import timeout from '../utils/timeout'
import * as endpoint from '../constants/apiEndpoints'
import { authenticateWithFacebookToken, refreshBetBashToken } from '../actions/authActions'


export const refreshUserToken = (store) => {
  return new Promise((resolve, reject) => {
    let state = store.getState()
    let dispatch = store.dispatch

    if (state.auth.user.isLoggedIn) {
      if (state.auth.authenticatedOnFacebook) {
        AccessToken.refreshCurrentAccessTokenAsync()
          .then((FBTokenObject) => {
            let FBToken = FBTokenObject.accessToken
            // TODO dispatch RSAA
            dispatch(fetchBetBashTokenFromFacebookToken(FBToken))
              .then(() => {
                resolve(true)
              })
              .catch((error) => {
                console.log('fetch bbToken from fbAuth: ', error)
                reject(error)
              })
          })
          .catch((error) => {
            console.log('fetch fbToken: ', error)
            reject(error)
          })
      }
      if (state.auth.authenticatedOnEmail) {
        Keychain.getGenericPassword()
          .then((credentials) => {
            let email = credentials.username
            let password = credentials.password
            // dispatch RSAA
            dispatch(fetchBetBashTokenFromCredentials(email, password))
              .then(() => {
                resolve(true)
              })
              .catch((error) => {
                console.log('fetch bbToken from credentials: ', error)
                reject(error)
              })
          }).catch((error) => {
            console.log('fetch credentials from keychain: ', error)
            reject(error)
          })
      }
    } else {
      resolve(false)
    }
  })
}

function fetchBetBashTokenFromFacebookToken(token) {
  return (dispatch) => {
    return timeout(5000,
      fetch(endpoint.facebookAuthenticateUrl(token))
        .then((response) => {
          response.json().then((fullToken) => {
            let bbToken = fullToken.access_token
            dispatch(refreshBetBashToken(bbToken))
          })
        })
        .catch((error) => {
          console.log('in fetch token function: ------ ', error)
          // TODO can be tested without API
        })
    )
  }
}

function fetchBetBashTokenFromCredentials(email, password) {
  return (dispatch) => {
    return timeout(5000,
      fetch(endpoint.userLoginUrl, {
          method: 'POST',
          body: JSON.stringify({ email: email, password: password }),
          headers: {
            'Cache-Control': 'no-cache',
            'Content-Type': 'application/json'
          }
        })
        .then((response) => {
          response.json().then((fullToken) => {
            let bbToken = fullToken.id
            dispatch(refreshBetBashToken(bbToken))
          })
        })
        .catch((error) => {
          console.log('in fetch token function 2: ------ ', error)
        })
    )
  }
}