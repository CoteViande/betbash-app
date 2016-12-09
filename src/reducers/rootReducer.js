import auth from './authReducer'
import init from './initializationReducer'
import connexion from './connexionReducer'
import scenes from './sceneReducer'
import { reducer as form } from 'redux-form'

import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth,
  connexion,
  scenes,
  form,
  init,
});

export default rootReducer;