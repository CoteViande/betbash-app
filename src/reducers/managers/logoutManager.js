const FBSDK = require('react-native-fbsdk');
const {
  LoginManager,
} = FBSDK;

import { logoutFromFacebook } from '../../actions/authActions'

const logoutManager = (prevState, nextState, action, dispatch) => {
  if (action.type === 'FACEBOOK_AUTHENTICATE_FAILURE') {
    LoginManager.logOut();
    dispatch(logoutFromFacebook());
  }
  if (action.type === 'APP_LOGOUT_SUCCESS') {
    LoginManager.logOut();
    dispatch(logoutFromFacebook());
  }
}

export default logoutManager