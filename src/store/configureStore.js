import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { persistStore, autoRehydrate } from 'redux-persist'
import { composeWithDevTools } from 'remote-redux-devtools'
import { AsyncStorage } from 'react-native'

import { apiMiddleware } from 'BetBash/src/middlewares/api-middleware/index'
import apiErrorMiddleware from 'BetBash/src/middlewares/apiErrorMiddleware'
import keychainMiddleware from 'BetBash/src/middlewares/keychainMiddleware'
import logoutMiddleware from 'BetBash/src/middlewares/logoutMiddleware'
import dismissKeyboardMiddleware from 'BetBash/src/middlewares/dismissKeyboardMiddleware'
import analyticsMiddleware from 'BetBash/src/middlewares/analyticsMiddleware'
import reducer from 'BetBash/src/reducers/rootReducer'
import { initializationScript } from 'BetBash/src/store/initializationScript'


const configureStore = (initialState) => {
  const middlewares = [
    thunk,
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
      autoRehydrate()
    )
  )

  const persistConfig = {
    blacklist: ['init', 'form', 'connexion'],
    storage: AsyncStorage,
  }
  persistStore(store, persistConfig, initializationScript(store))//.purge()

  if (module.hot) {
    // Enable hot module replacement for reducers
    module.hot.accept(() => {
      const nextRootReducer = require('../reducers/rootReducer').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}

export default configureStore