const FBSDK = require('react-native-fbsdk');
const {
  LoginManager,
} = FBSDK;

const logoutManager = (prevState, nextState, action, dispatch) => {
  if (action.type === 'FACEBOOK_AUTHENTICATE_FAILURE') {
    LoginManager.logOut();
  }
}

export default logoutManager