import {
  initializationComplete,
  connectedToInternet,
  connectedToServer,
  tokenRefreshed,
  initializationCleanup,
  profileCompleted,
} from 'BetBash/src/actions/initialization.actions'

import { isConnectedToTheInternet, isConnectedToTheServer } from 'BetBash/src/utils/connexionCheck'
import { refreshUserToken } from 'BetBash/src/utils/refreshUserToken'
import { checkIfProfileComplete } from 'BetBash/src/utils/validateUser'


export const initializationScript = store => async (err, restoredState) => {
  let state = store.getState()
  let dispatch = store.dispatch

  dispatch(initializationCleanup())

  initialCheckUp: try {
    let isConnectedInternet = await isConnectedToTheInternet(state, dispatch)
    if (isConnectedInternet) { dispatch(connectedToInternet()) } else { break initialCheckUp }

    let isConnectedServer = await isConnectedToTheServer(state, dispatch)
    if (isConnectedServer) { dispatch(connectedToServer()) } else { break initialCheckUp }

    let userToken = await refreshUserToken(state, dispatch)
    if (userToken) { dispatch(tokenRefreshed()) } else { break initialCheckUp }

    let isProfileComplete = await checkIfProfileComplete(store)
    if (isProfileComplete) { dispatch(profileCompleted()) } else { break initialCheckUp }
  } catch (error) {
    console.log('intializingScript.js // error happened: ', error)
  }
  dispatch(initializationComplete())
}