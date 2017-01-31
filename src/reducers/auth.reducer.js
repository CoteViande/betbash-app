import { combineReducers } from 'redux'

const userId = (state = null, action) => {
  switch (action.type) {
    case 'FACEBOOK_AUTHENTICATE_SUCCESS':
    case 'EMAIL_LOGIN_SUCCESS':
      const result = action.payload
      return result.userId
    default:
      return state
  }
}

const isLoggedIn = (state = false, action) => {
  switch (action.type) {
    case 'FACEBOOK_AUTHENTICATE_SUCCESS':
    case 'EMAIL_LOGIN_SUCCESS':
      return true
    default:
      return state
  }
}

const accessToken = (state = null, action) => {
  switch (action.type) {
    case 'FACEBOOK_AUTHENTICATE_SUCCESS':
    case 'EMAIL_LOGIN_SUCCESS':
      const result = action.payload
      return {
        id: result.id,
        ttl: result.ttl,
        created: result.created,
      }
    default:
      return state
  }
}

const name = (state = null, action) => {
  switch (action.type) {
    case 'GET_FULL_USER_SUCCESS':
      const user = action.payload
      return {
        firstName: user.personalDetails && user.personalDetails.first_name,
        lastName: user.personalDetails && user.personalDetails.last_name,
      }
    case 'SAVE_USER_PROFILE_SUCCESS':
      const personalDetails = action.payload
      return {
        firstName: personalDetails.first_name,
        lastName: personalDetails.last_name,
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
    case 'APP_LOGOUT_FAILURE':
      return action.payload.message
    default:
      return state
  }
}

const errorMessageSaveProfile = (state = null, action) => {
  switch (action.type) {
    case 'SAVE_USER_PROFILE_FAILURE':
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
    case 'FACEBOOK_TOKEN_SUCCESS':
      return false
    default:
      return state
  }
}

const isUserProfileComplete = (state = false, action) => {
  switch (action.type) {
    case 'INITIALIZATION_PROFILE_COMPLETE':
    case 'FACEBOOK_AUTHENTICATE_SUCCESS':
      return true
    case 'SAVE_USER_PROFILE_SUCCESS':
      const personalDetails = action.payload
      return !!(personalDetails.first_name && personalDetails.last_name)
    case 'GET_FULL_USER_SUCCESS':
      const user = action.payload
      return !!(user.personalDetails.first_name && user.personalDetails.last_name)
    case 'INITIALIZATION_PROFILE_NOT_COMPLETE':
    case 'APP_LOGOUT_SUCCESS':
    case 'FORCED_APP_LOGOUT':
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
    case 'APP_LOGOUT_REQUEST':
    case 'SAVE_USER_PROFILE_REQUEST':
      return true
    case 'FACEBOOK_AUTHENTICATE_SUCCESS':
    case 'FACEBOOK_AUTHENTICATE_FAILURE':
    case 'EMAIL_LOGIN_SUCCESS':
    case 'EMAIL_LOGIN_FAILURE':
    case 'EMAIL_REGISTER_SUCCESS':
    case 'EMAIL_REGISTER_FAILURE':
    case 'SAVE_USER_PROFILE_SUCCESS':
    case 'SAVE_USER_PROFILE_FALURE':
    case 'APP_LOGOUT_FAILURE':
    case 'INITIALIZATION_CLEANUP':
      return false
    default:
      return state
  }
}

const auth = combineReducers({
  user: combineReducers({
    id: userId,
    isLoggedIn,
    accessToken,
    name,
  }),
  isLoading,
  authenticatedOnFacebook,
  authenticatedOnEmail,
  isUserProfileComplete,
  error: combineReducers({
    saveProfile: errorMessageSaveProfile,
    FBAuth: errorMessageFBAuth,
    emailLogin: errorMessageEmailLogin,
    emailRegister: errorMessageEmailRegister,
    logout: errorMessageLogout,
  }),
  keychain: combineReducers({
    saved: savedInKeychain,
    error: errorInKeychain,
  }),
})

// http://stackoverflow.com/questions/35622588/how-to-reset-the-state-of-a-redux-store
const authReducer = (state, action) => {
  if (isLogOut(action)) {
    state = undefined
  }

  return auth(state, action)
} // TODO replace in root reducer

const isLogOut = action => (
  action.type === 'APP_LOGOUT_SUCCESS'
  || action.type === 'FORCED_APP_LOGOUT'
)

export default authReducer