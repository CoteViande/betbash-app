import { initializationComplete } from '../actions/initializationActions'

import { isConnectedToTheInternet } from './connexionCheck'
import { refreshUserToken } from './refreshUserToken'


export const initializationScript = (store) => {
  return async function initialization() {
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
}