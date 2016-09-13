import Keychain from 'react-native-keychain'
import { reset } from 'redux-form'

import { saveCredentialsKeychain, saveCredentialsKeychainFailure, getCredentialsKeychain, getCredentialsKeychainFailure } from '../../actions/authActions'

const keychainManager = (prevState, nextState, action, dispatch) => {
  if (action.type === 'EMAIL_LOGIN_SUCCESS') {
    Keychain
      .setGenericPassword(action.payload.email, action.payload.password)
      .then(() => {
        dispatch(saveCredentialsKeychain());
      })
      .catch((error) => {
        dispatch(saveCredentialsKeychainFailure(error.message));
      });
    dispatch(reset('emailRegister'));
    dispatch(reset('emailLogin'));
  }
}

export default keychainManager