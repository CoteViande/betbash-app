import Keychain from 'react-native-keychain'
// import { Actions } from 'react-native-router-flux'

import {
  saveCredentialsKeychain, saveCredentialsKeychainFailure,
  getCredentialsKeychain, getCredentialsKeychainFailure,
  removeCredentialsKeychain, removeCredentialsKeychainFailure,
} from '../../actions/authActions'

const keychainMiddleware = store => next => action => {
  let dispatch = store.dispatch
  let state = store.getState()

  if (action.type === 'EMAIL_LOGIN_SUCCESS' && !action.meta.tokenRefresh) {
    // Actions.BetBash({type: 'reset'}) // FIXME should not be here + Switch should do it
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