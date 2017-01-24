import { combineReducers } from 'redux'

import auth from 'BetBash/src/reducers/auth.reducer'
import initialization from 'BetBash/src/reducers/initialization.reducer'
import connexion from 'BetBash/src/reducers/connexion.reducer'
import friendSuggestions from 'BetBash/src/reducers/friendSelector.reducer'
import scenes from 'BetBash/src/reducers/scene.reducer'
import { reducer as form } from 'redux-form'

const rootReducer = combineReducers({
  auth,
  connexion,
  friendSuggestions,
  scenes,
  form,
  initialization,
})

export default rootReducer