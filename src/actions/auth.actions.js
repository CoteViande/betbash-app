import { Schema, normalize } from 'normalizr'

import * as endpoint from 'BetBash/src/constants/apiEndpoints'
import { RSAA, getJSON } from 'BetBash/src/middlewares/api-middleware/index'

export const successFacebookToken = token => ({
  type: 'FACEBOOK_TOKEN_SUCCESS',
})

export const failureFacebookToken = error => ({
  type: 'FACEBOOK_TOKEN_FAILURE',
  message: error ? error.message : 'Something went wrong with Facebook token request.',
})

export const logoutFromFacebook = () => ({
  type: 'FACEBOOK_LOGOUT',
})

export const authenticateWithFacebookToken = (accessToken, tokenRefresh) => ({
  [RSAA]: {
    types: [
      'FACEBOOK_AUTHENTICATE_REQUEST',
      {
        type: 'FACEBOOK_AUTHENTICATE_SUCCESS',
        meta: {
          tokenRefresh,
          analytics: {
            types: ['event', 'identify'],
            payload: {tokenRefresh}
          }
        }
      },
      'FACEBOOK_AUTHENTICATE_FAILURE'
    ],
    endpoint: endpoint.facebookAuthenticateUrl(accessToken),
    method: 'GET',
    headers: {
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json'
    }
  }
})

export const loginWithEmail = (email, password, tokenRefresh) => ({
  [RSAA]: {
    types: [
      'EMAIL_LOGIN_REQUEST',
      {
        type: 'EMAIL_LOGIN_SUCCESS',
        payload: (action, state, res) => getJSON(res).then(
          json => ({
            ...json,
            email,
            password,
          })
        ),
        meta: {
          tokenRefresh,
          analytics: {
            types: ['event', 'identify'],
            payload: {tokenRefresh}
          }
        }
      },
      'EMAIL_LOGIN_FAILURE'
    ],
    endpoint: endpoint.userLoginUrl,
    method: 'POST',
    body: JSON.stringify({ email: email, password: password }),
    headers: {
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json'
    }
  }
})

export const registerWithEmail = (email, password) => ({
  [RSAA]: {
    types: [
      'EMAIL_REGISTER_REQUEST',
      {
        type: 'EMAIL_REGISTER_SUCCESS',
        meta: {
          analytics: {
            types: ['event']
          }
        }
      },
      'EMAIL_REGISTER_FAILURE'
    ],
    endpoint: endpoint.userUrl,
    method: 'POST',
    body: JSON.stringify({ email: email, password: password }),
    headers: {
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json'
    }
  }
})

export const logoutFromApp = accessToken => ({
  [RSAA]: {
    types: [
      'APP_LOGOUT_REQUEST',
      {
        type: 'APP_LOGOUT_SUCCESS',
        meta: {
          analytics: {
            types: ['event']
          }
        }
      },
      'APP_LOGOUT_FAILURE'
    ],
    endpoint: endpoint.userLogoutUrl(accessToken),
    method: 'POST',
    headers: {
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json'
    }
  }
})

export const forcedLogoutFromApp = () => ({ // TODO SECURITY use userId to delete his token in api
  type: 'FORCED_APP_LOGOUT',
  meta: {
    analytics: {
      types: ['event']
    }
  }
})

export const saveCredentialsKeychain = () => ({
  type: 'KEYCHAIN_CREDENTIALS_SAVE'
})

export const saveCredentialsKeychainFailure = error => ({
  type: 'KEYCHAIN_CREDENTIALS_SAVE_FAILURE',
  message: error || 'Could not save to keychain'
})

export const getCredentialsKeychain = () => ({
  type: 'KEYCHAIN_CREDENTIALS_GET'
})

export const getCredentialsKeychainFailure = error => ({
  type: 'KEYCHAIN_CREDENTIALS_GET_FAILURE',
  message: error || 'Could not save to keychain'
})

export const removeCredentialsKeychain = () => ({
  type: 'KEYCHAIN_CREDENTIALS_REMOVE',
})

export const removeCredentialsKeychainFailure = error => ({
  type: 'KEYCHAIN_CREDENTIALS_REMOVE_FAILURE',
  message: error || 'Could not save to keychain'
})