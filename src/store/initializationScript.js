import {
  initializationComplete,
  connectedToInternet,
  connectedToServer,
  tokenRefreshed,
} from 'BetBash/src/actions/initializationActions'

import { isConnectedToTheInternet, isConnectedToTheServer } from 'BetBash/src/utils/connexionCheck'
import { refreshUserToken } from 'BetBash/src/utils/refreshUserToken'


export const initializationScript = (state, dispatch) => {
  return async function initialization() {
    initialCheckUp: try {
      let isConnectedInternet = await isConnectedToTheInternet(state, dispatch)
      if (isConnectedInternet) { dispatch(connectedToInternet()) } else { break initialCheckUp }

      let isConnectedServer = await isConnectedToTheServer(state, dispatch)
      if (isConnectedServer) { dispatch(connectedToServer()) } else { break initialCheckUp }

      if (isConnectedInternet && isConnectedServer) {
        let userToken = await refreshUserToken(state, dispatch)
        if (userToken) { dispatch(tokenRefreshed()) } else { break initialCheckUp }
      }
    } catch (error) {
      console.log('in intializing function', error)
    }
    dispatch(initializationComplete())
  }
}