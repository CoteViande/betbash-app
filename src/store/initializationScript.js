import { initializationComplete, connectedToInternet, connectedToServer, tokenRefreshed } from '../actions/initializationActions'

import { isConnectedToTheInternet, isConnectedToTheServer } from './connexionCheck'
import { refreshUserToken } from './refreshUserToken'


export const initializationScript = (store) => {
  return async function initialization() {
    try {
      let isConnectedInternet = await isConnectedToTheInternet(store)
      if (isConnectedInternet) { store.dispatch(connectedToInternet()) } else { return }
      let isConnectedServer = await isConnectedToTheServer(store)
      if (isConnectedServer) { store.dispatch(connectedToServer()) } else { return }
      if (isConnectedInternet && isConnectedServer) {
        let userToken = await refreshUserToken(store)
        if(userToken) { store.dispatch(tokenRefreshed()) } else { return }
      }
    } catch (error) {
      console.log('in intializing function', error)
      // store.dispatch(errorCheckingForConnexion(error.message))
      // store.dispatch(forcedLogoutOnError(error.message))
    }
    store.dispatch(initializationComplete())
  }
}