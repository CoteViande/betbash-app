import { combineReducers } from 'redux'

const initializing = (state = true, action) => {
  switch (action.type) {
    case 'INITIALIZATION_COMPLETE':
      return false
    default:
      return state
  }
}

const initializationReducer = combineReducers({
  initializing,
})

export default initializationReducer