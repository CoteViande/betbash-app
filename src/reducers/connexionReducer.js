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

const isServerConnected = (state = false, action) => {
  switch(action.type) {
    case 'SERVER_CONNEXION_CHANGE':
      return action.isServerConnected
    default:
      return state
  }
}

const connexionReducer = combineReducers({
  isConnected,
  isConnectedTest,
  connexionType,
  isServerConnected,
})

export default connexionReducer