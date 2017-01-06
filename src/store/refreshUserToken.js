import Keychain from 'react-native-keychain'
import { AccessToken } from 'react-native-fbsdk'

import timeout from 'utils/timeout'
import * as endpoint from 'constants/apiEndpoints'
import { authenticateWithFacebookToken, loginWithEmail } from 'actions/authActions'


export const refreshUserToken = (store) => {
  return new Promise((resolve, reject) => {
    let state = store.getState()
    let dispatch = store.dispatch

    if (state.auth.user.isLoggedIn) {
      if (state.auth.authenticatedOnFacebook) {
        AccessToken.refreshCurrentAccessTokenAsync()
          .then((FBTokenObject) => {
            let FBToken = FBTokenObject.accessToken
            dispatch(authenticateWithFacebookToken(FBToken))
              .then((res) => {
                resolve(!res.error)
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
            dispatch(loginWithEmail(email, password, true))
              .then((res) => {
                resolve(!res.error)
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