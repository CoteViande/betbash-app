import Keychain from 'react-native-keychain'

import {
  saveCredentialsKeychain, saveCredentialsKeychainFailure,
  getCredentialsKeychain, getCredentialsKeychainFailure,
  removeCredentialsKeychain, removeCredentialsKeychainFailure,
} from 'BetBash/src/actions/auth.actions'

const keychainMiddleware = store => next => action => {
  let dispatch = store.dispatch
  let state = store.getState()

  if (action.type === 'EMAIL_LOGIN_SUCCESS' && !action.meta.tokenRefresh) {
    Keychain
      .setGenericPassword(action.payload.email, action.payload.password)
      .then(() => {
        dispatch(saveCredentialsKeychain());
      })
      .catch((error) => {
        dispatch(saveCredentialsKeychainFailure(error.message));
      })
  }
  if (action.type === 'APP_LOGOUT') {
    Keychain
      .resetGenericPassword(action.payload.email, action.payload.password)
      .then(() => {
        dispatch(removeCredentialsKeychain());
      })
      .catch((error) => {
        dispatch(removeCredentialsKeychainFailure(error.message));
      });
  }

  return next(action)
}

export default keychainMiddleware