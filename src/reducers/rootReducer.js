import { combineReducers } from 'redux'

import auth from 'BetBash/src/reducers/authReducer'
import init from 'BetBash/src/reducers/initializationReducer'
import connexion from 'BetBash/src/reducers/connexionReducer'
import scenes from 'BetBash/src/reducers/sceneReducer'
import { reducer as form } from 'redux-form'

const rootReducer = combineReducers({
  auth,
  connexion,
  scenes,
  form,
  init,
});

export default rootReducer;