import { LoginManager } from 'react-native-fbsdk'

import { logoutFromFacebook } from '../actions/authActions'

// import { Actions } from 'react-native-router-flux'

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
    // Actions.BetBashAuth({type: 'reset'}) // FIXME Switch should do it + does not remount other scene when action goes ot it
  }

  return next(action)
}

export default logoutMiddleware