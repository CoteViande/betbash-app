import auth from './authReducer'
import scenes from './sceneReducer'
import { reducer as form } from 'redux-form'

import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  scenes,
  auth,
  form,
});

export default rootReducer;