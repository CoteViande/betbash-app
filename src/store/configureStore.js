import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { apiMiddleware } from '../utils/api-middleware/index'
import onStateChanged from '../utils/onStateChangedMiddleware'
import devTools from 'remote-redux-devtools'
import reducer from '../reducers/rootReducer' // TODO: check what reducer it picks

import keychainManager from '../reducers/managers/keychainManager'
import logoutManager from '../reducers/managers/logoutManager'

const configureStore = (initialState) => {
  const middlewares = [thunk, apiMiddleware, onStateChanged(keychainManager), onStateChanged(logoutManager)];

  const store = createStore(
    reducer,
    initialState,
    compose(
      applyMiddleware(...middlewares),
      devTools({
        name: 'Bet Bash Android',
        hostname: 'localhost',
        port: 5678,
      })
    )
  );

  if (module.hot) {
    // Enable hot module replacement for reducers
    module.hot.accept(() => {
      const nextRootReducer = require('../reducers/rootReducer').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};

export default configureStore;