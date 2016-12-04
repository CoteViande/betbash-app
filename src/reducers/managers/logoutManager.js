const FBSDK = require('react-native-fbsdk');
const {
  LoginManager,
} = FBSDK;

import { logoutFromFacebook } from '../../actions/authActions'

// import { Actions } from 'react-native-router-flux'

const logoutManager = (prevState, nextState, action, dispatch) => {
  if (action.type === 'FACEBOOK_AUTHENTICATE_FAILURE') {
    LoginManager.logOut();
    dispatch(logoutFromFacebook());
  }
  if (action.type === 'APP_LOGOUT_SUCCESS') {
    LoginManager.logOut();
    const signedInWithFacebook =  prevState.auth.authenticatedOnFacebook;
    if (signedInWithFacebook) {
      dispatch(logoutFromFacebook());
    }
    // Actions.BetBashAuth({type: 'reset'}) // FIXME Switch should do it + does not remount other scene when action goes ot it
  }
}

export default logoutManager