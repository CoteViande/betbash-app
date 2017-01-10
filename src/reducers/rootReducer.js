import { combineReducers } from 'redux'

import auth from 'BetBash/src/reducers/auth.reducer'
import initialization from 'BetBash/src/reducers/initializationReducer'
import connexion from 'BetBash/src/reducers/connexionReducer'
import scenes from 'BetBash/src/reducers/sceneReducer'
import { reducer as form } from 'redux-form'

const rootReducer = combineReducers({
  auth,
  connexion,
  scenes,
  form,
  initialization,
});

export default rootReducer;