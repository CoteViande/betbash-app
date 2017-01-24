import { combineReducers } from 'redux'

const suggestions = (state = { users: [], lastUpdateRequestTime: null }, action) => {
  const requestedAt = action.meta && action.meta.requestedAt
  if (requestedAt && requestedAt < state.lastUpdatedRequestTime) return state
  const response = action.payload
  switch (action.type) {
    case 'UPDATE_FRIENDS_SUGGESTIONS_REQUEST':
      return {
        ...state,
        lastUpdateRequestTime: state.lastUpdatedRequestTime,
      }
    case 'UPDATE_FRIENDS_SUGGESTIONS_SUCCESS':
      return {
        ...state,
        users: response.users,
      }
    default:
      return state
  }
}

const isLoading = (state = false, action) => {
  switch (action.type) {
    case 'UPDATE_FRIENDS_SUGGESTIONS_REQUEST':
      return true
    case 'UPDATE_FRIENDS_SUGGESTIONS_SUCCESS':
    case 'UPDATE_FRIENDS_SUGGESTIONS_FAILURE':
      return false
    default:
      return state
  }
}

const friendSuggestionsReducer = combineReducers({
  suggestions,
  isLoading,
})

export default friendSuggestionsReducer