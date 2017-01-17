import Keychain from 'react-native-keychain'

import {
  saveCredentialsKeychain, saveCredentialsKeychainFailure,
  removeCredentialsKeychain, removeCredentialsKeychainFailure,
} from 'BetBash/src/actions/auth.actions'

const keychainMiddleware = store => next => async action => {
  let dispatch = store.dispatch
  let state = store.getState()

  if (action.type === 'EMAIL_LOGIN_SUCCESS' && action.meta && !action.meta.tokenRefresh) {
    try {
      await Keychain.setGenericPassword(action.payload.email, action.payload.password)
      dispatch(saveCredentialsKeychain())
    } catch (error) {
      dispatch(saveCredentialsKeychainFailure(error.message))
    }
  }
  if (action.type === 'APP_LOGOUT') {
    try {
      await Keychain.resetGenericPassword(action.payload.email, action.payload.password)
      dispatch(removeCredentialsKeychain());
    } catch (error) {
      dispatch(removeCredentialsKeychainFailure(error.message));
    }
  }

  return next(action)
}

export default keychainMiddleware