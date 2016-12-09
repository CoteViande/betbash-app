import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { persistStore, autoRehydrate } from 'redux-persist'
import { composeWithDevTools } from 'remote-redux-devtools'
import { AsyncStorage } from 'react-native'

import { apiMiddleware } from '../utils/api-middleware/index'
import onStateChanged from '../utils/onStateChangedMiddleware'
import keychainManager from '../reducers/managers/keychainManager'
import logoutManager from '../reducers/managers/logoutManager'
import reducer from '../reducers/rootReducer'

import { initializationComplete } from '../actions/initializationActions'
import { isConnectedToTheInternet } from './connexionCheck'
import { refreshUserToken } from './refreshUserToken'


const configureStore = (initialState) => {
  const middlewares = [thunk, apiMiddleware, onStateChanged(keychainManager), onStateChanged(logoutManager)]

  const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(
      applyMiddleware(...middlewares),
      autoRehydrate()
    )
  )

  async function initialization() {
    try {
      let isConnected = await isConnectedToTheInternet(store)
      if (isConnected) {
        let userToken = await refreshUserToken(store)
      }
    } catch (error) {
      console.log('in intializing function', error)
      // store.dispatch(errorCheckingForConnexion(error.message))
      // store.dispatch(forcedLogoutOnError(error.message))
    }
    store.dispatch(initializationComplete())
  }
  const persistConfig = {
    blacklist: ['init'],
    storage: AsyncStorage,
  }
  persistStore(store, persistConfig, initialization)

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