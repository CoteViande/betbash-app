import Keychain from 'react-native-keychain'
import { AccessToken } from 'react-native-fbsdk'
import moment from 'moment'

import {
  authenticateWithFacebookToken,
  loginWithEmail,
} from 'BetBash/src/actions/auth.actions'

const shouldRefreshTime = 36

export const refreshUserToken = (state, dispatch, force = false) => (
  new Promise(async (resolve, reject) => {
    if (!shouldAttemptToRefreshToken(state, force)) {
      resolve(state.auth.user.isLoggedIn)
      return
    }

    try {
      const authenticated = await authenticateWithState(state, dispatch)
      resolve(authenticated)
    } catch (error) {
      reject(error)
    }
  })
)
const authenticateWithState = async (state, dispatch) => {
  let response
  if (state.auth.authenticatedOnFacebook) {
    response = await authenticateWithFacebook(dispatch)
  }
  if (state.auth.authenticatedOnEmail) {
    response = await authenticateWithEmail(dispatch)
  }
  return !response.error
}

const authenticateWithFacebook = async dispatch => {
  const FBTokenObject = await AccessToken.refreshCurrentAccessTokenAsync()
  const FBToken = FBTokenObject.accessToken
  // TOCHECK return await bad? eslint...
  return await dispatch(authenticateWithFacebookToken(FBToken, true))
}

const authenticateWithEmail = async dispatch => {
  const { username, password } = await Keychain.getGenericPassword()
  return await dispatch(loginWithEmail(username, password, true))
}

const shouldAttemptToRefreshToken = (state, force) => (
  state.auth.user.isLoggedIn
  && (
    force
    || isTokenTooOld(state.auth.user.accessToken)
  )
)

const isTokenTooOld = ({ ttl, created }) => (
  moment(created).add(ttl, 'seconds')
    .subtract(shouldRefreshTime, 'hours')
    .isBefore(moment())
)
