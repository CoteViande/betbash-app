import { AsyncStorage } from 'react-native'
import { createStore, applyMiddleware } from 'redux'
import { persistStore, autoRehydrate } from 'redux-persist'
import { composeWithDevTools } from 'remote-redux-devtools'

import reducer from 'BetBash/src/reducers/root.reducer'

import { apiMiddleware } from 'BetBash/src/middlewares/api-middleware/index'
import apiErrorMiddleware from 'BetBash/src/middlewares/apiError.middleware'
import keychainMiddleware from 'BetBash/src/middlewares/keychain.middleware'
import logoutMiddleware from 'BetBash/src/middlewares/logout.middleware'
import dismissKeyboardMiddleware from 'BetBash/src/middlewares/dismissKeyboard.middleware'
import analyticsMiddleware from 'BetBash/src/middlewares/analytics.middleware'
import crashReporterMiddleware from 'BetBash/src/middlewares/crashReporter.middleware'

import { initializationScript } from 'BetBash/src/store/initializationScript'


const configureStore = initialState => {
  const middlewares = [
    crashReporterMiddleware,
    apiMiddleware,
    apiErrorMiddleware,
    keychainMiddleware,
    logoutMiddleware,
    dismissKeyboardMiddleware,
    analyticsMiddleware,
  ]

  const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(
      applyMiddleware(...middlewares),
      autoRehydrate(),
    ),
  )

  const persistConfig = {
    blacklist: ['init', 'form', 'connexion', 'initialization', 'friendSuggestions'],
    storage: AsyncStorage,
  }
  persistStore(store, persistConfig, initializationScript(store))
  // .purge()

  if (module.hot) {
    // Enable hot module replacement for reducers
    module.hot.accept(() => {
      const nextRootReducer = require('../reducers/root.reducer').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}

export default configureStore