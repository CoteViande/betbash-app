import { combineReducers } from 'redux'

const initLogger = {
  isLoggedIn: false,
  accessToken: null,
  userId: null,
}
const user = (state = initLogger, action) => {
  switch (action.type) {
    case 'FACEBOOK_AUTHENTICATE_SUCCESS':
      let res = action.payload.result
      return {
        isLoggedIn: true,
        accessToken: res.access_token,
        userId: res.userId,
      }
    case 'EMAIL_LOGIN_SUCCESS':
      let emailLoginRes = action.payload.result
      return {
        isLoggedIn: true,
        accessToken: emailLoginRes.id,
        userId: emailLoginRes.userId,
      }
    case 'APP_LOGOUT_SUCCESS':
      return {
        isLoggedIn: false,
        accessToken: null,
        userId: null,
      }
    default:
      return state
  }
}

const isLoading = (state = false, action) => {
  switch (action.type) {
    case 'FACEBOOK_AUTHENTICATE_REQUEST':
    case 'EMAIL_LOGIN_REQUEST':
    case 'EMAIL_REGISTER_REQUEST':
    case 'EMAIL_REGISTER_SUCCESS':
    case 'APP_LOGOUT_REQUEST':
      return true
    case 'FACEBOOK_AUTHENTICATE_SUCCESS':
    case 'FACEBOOK_AUTHENTICATE_FAILURE':
    case 'EMAIL_LOGIN_SUCCESS':
    case 'EMAIL_LOGIN_FAILURE':
    case 'EMAIL_REGISTER_FAILURE':
    case 'APP_LOGOUT_SUCCESS':
    case 'APP_LOGOUT_FAILURE':
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

const errorMessageEmailRegister = (state = null, action) => {
  switch (action.type) {
    case 'EMAIL_REGISTER_SUCCESS':
      return null
    case 'EMAIL_REGISTER_FAILURE':
      return action.payload.message
    default:
      return state
  }
}

const errorMessageLogout = (state = null, action) => {
  switch (action.type) {
    case 'APP_LOGOUT_SUCCESS':
      return null
    case 'APP_LOGOUT_FAILURE':
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

const authenticatedOnEmail = (state = false, action) => {
  switch (action.type) {
    case 'EMAIL_REGISTER_SUCCESS':
      return true
    case 'APP_LOGOUT_SUCCESS':
      return false
    default:
      return state
  }
}

const keychain = (state = {
  saved: false,
  error: null
}, action) => {
  switch (action.type) {
    case 'KEYCHAIN_CREDENTIALS_SAVE':
      return {
        saved: true,
        error: null
      }
    case 'KEYCHAIN_CREDENTIALS_SAVE_FAILURE':
      return {
        saved: false,
        error: action.message
      }
    case 'KEYCHAIN_CREDENTIALS_REMOVE':
      return {
        saved: false,
        error: null
      }
    case 'KEYCHAIN_CREDENTIALS_REMOVE_FAILURE':
      return {
        saved: true,
        error: action.message
      }
    default:
      return state
  }
}

const authReducer = combineReducers({
  user,
  isLoading,
  authenticatedOnFacebook,
  errorMessageFBAuth,
  authenticatedOnEmail,
  errorMessageEmailLogin,
  errorMessageEmailRegister,
  errorMessageLogout,
  keychain,
})

export default authReducer