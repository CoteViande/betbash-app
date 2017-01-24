import { combineReducers } from 'redux'

const isFinished = (state = false, action) => {
  switch (action.type) {
    case 'INITIALIZATION_COMPLETE':
      return true
    default:
      return state
  }
}

const initializationReducer = combineReducers({
  isFinished,
})

export default initializationReducer