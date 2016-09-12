import { combineReducers } from 'redux'

const initLogger = {
  isLoggedIn: false,
  accessToken: null,
  userId: null,
}
const user = (state = initLogger, action) => {
  switch (action.type) {
    case 'FACEBOOK_AUTHENTICATE_SUCCESS':
    case 'EMAIL_LOGIN_SUCCESS':
      let res = action.payload.result
      return {
        isLoggedIn: true,
        accessToken: res.access_token,
        userId: res.userId,
      }
    default:
      return state
  }
}

const isLoading = (state = false, action) => {
  switch (action.type) {
    case 'FACEBOOK_AUTHENTICATE_REQUEST':
    case 'EMAIL_LOGIN_REQUEST':
      return true
    case 'FACEBOOK_AUTHENTICATE_SUCCESS':
    case 'FACEBOOK_AUTHENTICATE_FAILURE':
    case 'EMAIL_LOGIN_SUCCESS':
    case 'EMAIL_LOGIN_FAILURE':
      return false
    default:
      return state
  }
}

const errorMessageFBAuth = (state = null, action) => {
  switch (action.type) {
    case 'FACEBOOK_TOKEN_SUCCESS':
      return null
    case 'FACEBOOK_TOKEN_FAILURE':
      return action.message
    case 'FACEBOOK_AUTHENTICATE_SUCCESS':
      return null
    case 'FACEBOOK_AUTHENTICATE_FAILURE':
      return action.payload.message
    default:
      return state
  }
}

const errorMessageEmailLogin = (state = null, action) => {
  switch (action.type) {
    case 'EMAIL_LOGIN_SUCCESS':
      return null
    case 'EMAIL_LOGIN_FAILURE':
      return action.payload.message
    default:
      return state
  }
}

const authenticatedOnFacebook = (state = false, action) => {
  switch (action.type) {
    case 'FACEBOOK_TOKEN_SUCCESS':
      return true
    case 'FACEBOOK_TOKEN_FAILURE':
    case 'FACEBOOK_LOGOUT':
      return false
    default:
      return state
  }
}

const authReducer = combineReducers({
  user,
  isLoading,
  errorMessageFBAuth,
  authenticatedOnFacebook,
  errorMessageEmailLogin,
})

export default authReducer