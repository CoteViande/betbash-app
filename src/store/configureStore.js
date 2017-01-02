import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { persistStore, autoRehydrate } from 'redux-persist'
import { composeWithDevTools } from 'remote-redux-devtools'
import { AsyncStorage } from 'react-native'

import { apiMiddleware } from '../utils/api-middleware/index'
import onStateChanged from '../utils/onStateChangedMiddleware'
import keychainMiddleware from '../reducers/managers/keychainMiddleware'
import logoutMiddleware from '../reducers/managers/logoutMiddleware'
import apiErrorMiddleware from '../reducers/managers/apiErrorMiddleware'
import reducer from '../reducers/rootReducer'
import { initializationScript } from './initializationScript'


const configureStore = (initialState) => {
  const middlewares = [thunk, apiMiddleware, apiErrorMiddleware, keychainMiddleware, logoutMiddleware]

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