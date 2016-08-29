import { combineReducers } from 'redux'

const initLogger = {
  isLoggedIn: false,
  accessToken: null,
  userId: null
}
const user = (state = initLogger, action) => {
  switch (action.type) {
    case 'FACEBOOK_AUTHENTICATE_SUCCESS':
      let res = action.payload.result;
      return {
        isLoggedIn: true,
        accessToken: res.access_token,
        userId: res.userId
      };
    default:
      return state;
  }
}

const facebookAuth = (state = null, action) => {
  switch (action.type) {
    case 'FACEBOOK_TOKEN_SUCCESS':
      return action.token;
    case 'FACEBOOK_TOKEN_FAILURE':
      return null;
    default:
      return state;
  }
}

const isLoading = (state = false, action) => {
  switch (action.type) {
    case 'FACEBOOK_AUTHENTICATE_REQUEST':
      return true;
    case 'FACEBOOK_AUTHENTICATE_SUCCESS':
    case 'FACEBOOK_AUTHENTICATE_FAILURE':
      return false;
    default:
      return state;
  }
}

const errorMessage = (state = null, action) => {
  switch (action.type) {
    case 'FACEBOOK_TOKEN_SUCCESS':
      return null;
    case 'FACEBOOK_TOKEN_FAILURE':
      return action.message;
    case 'FACEBOOK_AUTHENTICATE_SUCCESS':
      return null;
    case 'FACEBOOK_AUTHENTICATE_FAILURE':
      return action.payload.message;
    default:
      return state;
  }
}

const authReducer = combineReducers({
  user,
  isLoading,
  facebookToken: facebookAuth,
  errorMessage,
})

export default authReducer