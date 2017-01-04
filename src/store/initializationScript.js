import {
  initializationComplete,
  connectedToInternet,
  connectedToServer,
  tokenRefreshed,
} from '../actions/initializationActions'

import { isConnectedToTheInternet, isConnectedToTheServer } from './connexionCheck'
import { refreshUserToken } from './refreshUserToken'


export const initializationScript = (store) => {
  return async function initialization() {
    initialCheckUp: try {
      let isConnectedInternet = await isConnectedToTheInternet(store)
      if (isConnectedInternet) { store.dispatch(connectedToInternet()) } else { break initialCheckUp }

      let isConnectedServer = await isConnectedToTheServer(store)
      if (isConnectedServer) { store.dispatch(connectedToServer()) } else { break initialCheckUp  }

      if (isConnectedInternet && isConnectedServer) {
        let userToken = await refreshUserToken(store)
        if(userToken) { store.dispatch(tokenRefreshed()) } else { break initialCheckUp  }
      }
    } catch (error) {
      console.log('in intializing function', error)
    }
    store.dispatch(initializationComplete())
  }
}