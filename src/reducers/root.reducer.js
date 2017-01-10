import { combineReducers } from 'redux'

import auth from 'BetBash/src/reducers/auth.reducer'
import initialization from 'BetBash/src/reducers/initialization.reducer'
import connexion from 'BetBash/src/reducers/connexion.reducer'
import scenes from 'BetBash/src/reducers/scene.reducer'
import { reducer as form } from 'redux-form'

const rootReducer = combineReducers({
  auth,
  connexion,
  scenes,
  form,
  initialization,
});

export default rootReducer;