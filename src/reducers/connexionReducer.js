import { combineReducers } from 'redux'

const isConnected = (state = false, action) => {
  switch (action.type) {
    case 'CONNEXION_CHANGE':
      return action.isConnected
    default:
      return state
  }
}

const connexionType = (state = null, action) => {
  switch (action.type) {
    case 'CONNEXION_CHANGE':
      return action.connexionType
    default:
      return state
  }
}

const isConnectedTest = (state = false, action) => {
  switch (action.type) {
    case 'CONNEXION_CHANGE_TEST':
      return action.isConnected
    default:
      return state
  }
}

const connexionReducer = combineReducers({
  isConnected,
  isConnectedTest,
  connexionType,
})

export default connexionReducer