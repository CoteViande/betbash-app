import { combineReducers } from 'redux'

const finished = (state = false, action) => {
  switch (action.type) {
    case 'INITIALIZATION_COMPLETE':
      return true
    default:
      return state
  }
}

const initializationReducer = combineReducers({
  finished,
})

export default initializationReducer