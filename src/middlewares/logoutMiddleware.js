import { LoginManager } from 'react-native-fbsdk'

import { logoutFromFacebook } from 'BetBash/src/actions/authActions'

const logoutMiddleware = store => next => action => {
  let dispatch = store.dispatch
  let state = store.getState()

  if (action.type === 'FACEBOOK_AUTHENTICATE_FAILURE') {
    LoginManager.logOut();
    dispatch(logoutFromFacebook());
  }
  if (action.type === 'APP_LOGOUT_SUCCESS') {
    LoginManager.logOut();
    const signedInWithFacebook =  state.auth.authenticatedOnFacebook;
    if (signedInWithFacebook) {
      dispatch(logoutFromFacebook());
    }
  }

  return next(action)
}

export default logoutMiddleware