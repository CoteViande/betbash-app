import { combineReducers } from 'redux'

import auth from 'reducers/authReducer'
import init from 'reducers/initializationReducer'
import connexion from 'reducers/connexionReducer'
import scenes from 'reducers/sceneReducer'
import { reducer as form } from 'redux-form'

const rootReducer = combineReducers({
  auth,
  connexion,
  scenes,
  form,
  init,
});

export default rootReducer;