import { combineReducers } from 'redux'

const user = (state = {
  id: null,
  isLoggedIn: false,
  accessToken: null,
}, action) => {
  switch (action.type) {
    case 'FACEBOOK_AUTHENTICATE_SUCCESS':
    case 'EMAIL_LOGIN_SUCCESS':
      let res = action.payload
      return {
        id: res.userId,
        isLoggedIn: true,
        accessToken: {
          id: res.id,
          ttl: res.ttl,
          created: res.created,
        },
      }
    case 'APP_LOGOUT_SUCCESS':
    case 'FORCED_APP_LOGOUT':
      return {
        id: null,
        isLoggedIn: false,
        accessToken: null,
      }
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
    case 'FACEBOOK_AUTHENTICATE_FAILURE':
      return action.payload.message
    case 'FACEBOOK_AUTHENTICATE_SUCCESS':
    case 'EMAIL_REGISTER_SUCCESS':
    case 'EMAIL_LOGIN_SUCCESS':
      return null
    default:
      return state
  }
}

const errorMessageEmailLogin = (state = null, action) => {
  switch (action.type) {
    case 'EMAIL_LOGIN_FAILURE':
      return action.payload.message
    case 'EMAIL_LOGIN_SUCCESS':
    case 'FACEBOOK_AUTHENTICATE_SUCCESS':
    case 'EMAIL_REGISTER_SUCCESS':
      return null
    default:
      return state
  }
}

const errorMessageEmailRegister = (state = null, action) => {
  switch (action.type) {
    case 'EMAIL_REGISTER_FAILURE':
      return action.payload.message
    case 'EMAIL_REGISTER_SUCCESS':
    case 'FACEBOOK_AUTHENTICATE_SUCCESS':
    case 'EMAIL_LOGIN_SUCCESS':
      return null
    default:
      return state
  }
}

const errorMessageLogout = (state = null, action) => {
  switch (action.type) {
    case 'APP_LOGOUT_SUCCESS':
    case 'FORCED_APP_LOGOUT':
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
    case 'APP_LOGOUT_SUCCESS':
    case 'FORCED_APP_LOGOUT':
    case 'EMAIL_REGISTER_SUCCESS': // FACEBOOK_AUTHENTICATE_FAILURE??
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
    case 'FORCED_APP_LOGOUT':
      return false
    case 'FACEBOOK_TOKEN_SUCCESS':
      return false
    default:
      return state
  }
}

const savedInKeychain = (state = false, action) => {
  switch (action.type) {
    case 'KEYCHAIN_CREDENTIALS_SAVE':
    case 'KEYCHAIN_CREDENTIALS_REMOVE_FAILURE':
      return true
    case 'KEYCHAIN_CREDENTIALS_SAVE_FAILURE':
    case 'KEYCHAIN_CREDENTIALS_REMOVE':
      return false
    default:
      return state
  }
}

const errorInKeychain = (state = null, action) => {
  switch (action.type) {
    case 'KEYCHAIN_CREDENTIALS_SAVE':
    case 'KEYCHAIN_CREDENTIALS_REMOVE':
      return null
    case 'KEYCHAIN_CREDENTIALS_SAVE_FAILURE':
    case 'KEYCHAIN_CREDENTIALS_REMOVE_FAILURE':
      return action.message
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
    case 'FORCED_APP_LOGOUT':
    case 'APP_LOGOUT_FAILURE':
    case 'INITIALIZATION_CLEANUP':
      return false
    default:
      return state
  }
}

const authReducer = combineReducers({
  user,
  isLoading,
  authenticatedOnFacebook,
  authenticatedOnEmail,
  errorMessageFBAuth,
  errorMessageEmailLogin,
  errorMessageEmailRegister,
  errorMessageLogout,
  keychain: combineReducers({
    saved: savedInKeychain,
    error: errorInKeychain,
  }),
})

export default authReducer