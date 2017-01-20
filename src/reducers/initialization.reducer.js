import { combineReducers } from 'redux'

const isFinished = (state = false, action) => {
  switch (action.type) {
    case 'INITIALIZATION_COMPLETE':
      return true
    default:
      return state
  }
}

const isUserProfileComplete = (state = false, action) => {
  switch (action.type) {
    case 'INITIALIZATION_PROFILE_COMPLETE':
    case 'FACEBOOK_AUTHENTICATE_SUCCESS':
      return true
    case 'SAVE_USER_PROFILE_SUCCESS': // FIXME from other reducer action
      let personalDetails = action.payload
      return (personalDetails.first_name && personalDetails.last_name)
    case 'GET_FULL_USER_SUCCESS':
      let user = action.payload
      return (user.personalDetails.first_name && user.personalDetails.last_name)
    case 'APP_LOGOUT_SUCCESS':
    case 'FORCED_APP_LOGOUT':
      return false
    default:
      return state
  }
}

const initializationReducer = combineReducers({
  isFinished,
  isUserProfileComplete,
})

export default initializationReducer