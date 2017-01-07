import {
  initializationComplete,
  connectedToInternet,
  connectedToServer,
  tokenRefreshed,
} from 'BetBash/src/actions/initializationActions'

import { isConnectedToTheInternet, isConnectedToTheServer } from 'BetBash/src/store/connexionCheck'
import { refreshUserToken } from 'BetBash/src/store/refreshUserToken'


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