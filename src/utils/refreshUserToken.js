import Keychain from 'react-native-keychain'
import { AccessToken } from 'react-native-fbsdk'
import moment from 'moment'

import timeout from 'BetBash/src/utils/timeout'
import * as endpoint from 'BetBash/src/constants/apiEndpoints'
import { authenticateWithFacebookToken, loginWithEmail } from 'BetBash/src/actions/auth.actions'


export const refreshUserToken = (state, dispatch) => {
  return new Promise((resolve, reject) => {
    if (
      !state.auth.user.isLoggedIn
      || !isTokenTooOld(state.auth.user.accessToken)
    ) {
      resolve(state.auth.user.isLoggedIn)
      return
    }

    if (state.auth.authenticatedOnFacebook) {
      AccessToken.refreshCurrentAccessTokenAsync()
        .then((FBTokenObject) => {
          let FBToken = FBTokenObject.accessToken
          dispatch(authenticateWithFacebookToken(FBToken, true))
            .then((res) => {
              resolve(!res.error)
            })
            .catch((error) => {
              reject(error)
            })
        })
        .catch((error) => {
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
              reject(error)
            })
        }).catch((error) => {
          reject(error)
        })
    }
  })
}

const isTokenTooOld = ({ ttl, created }) => (
  moment(created).add(ttl, 'seconds')
    .subtract(36, 'hours')
    .isBefore(moment())
)