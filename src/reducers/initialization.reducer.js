import { combineReducers } from 'redux'

const isFinished = (state = false, action) => {
  switch (action.type) {
    case 'INITIALIZATION_COMPLETE':
      return true
    default:
      return state
  }
}

const isHydrationComplete = (state = false, action) => {
  switch (action.type) {
    case 'INITIALIZATION_CLEANUP':
      return true
    default:
      return state
  }
}

const initializationReducer = combineReducers({
  isFinished,
  isHydrationComplete,
})

export default initializationReducer