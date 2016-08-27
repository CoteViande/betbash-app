import { combineReducers } from 'redux'

const facebookAuth = (state = null, action) => {
  switch (action.type) {
    // case 'FACEBOOK_TOKEN_REQUEST':
    case 'FACEBOOK_TOKEN_SUCCESS':
      return action.token;
    case 'FACEBOOK_TOKEN_FAILURE':
    default:
      return state;
  }
}

const errorMessage = (state = null, action) => {
  switch (action.type) {
    // case 'FACEBOOK_TOKEN_REQUEST':
    case 'FACEBOOK_TOKEN_SUCCESS':
      return null;
    case 'FACEBOOK_TOKEN_FAILURE':
      return action.message;
    default:
      return state;
  }
}

const authReducer = combineReducers({
  facebookToken: facebookAuth,
  errorMessage,
})

export default authReducer