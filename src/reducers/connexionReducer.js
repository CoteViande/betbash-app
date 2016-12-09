import { combineReducers } from 'redux'

const isConnected = (state = false, action) => {
  switch (action.type) {
    case 'NO_INTERNET_CONNEXION':
      return false
    case 'CONNECTED_TO_INTERNET':
      return true
    default:
      return state
  }
}

const connexionType = (state = null, action) => {
  switch (action.type) {
    case 'NO_INTERNET_CONNEXION':
      return null
    case 'CONNECTED_TO_INTERNET':
      return action.connexionType
    default:
      return state
  }
}

const connexionReducer = combineReducers({
  isConnected,
  connexionType,
})

export default connexionReducer