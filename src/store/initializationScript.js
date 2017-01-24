import {
  initializationComplete,
  connectedToInternet,
  connectedToServer,
  tokenRefreshed,
  initializationCleanup,
  profileCompleted,
  profileIsNotComplete,
} from 'BetBash/src/actions/initialization.actions'

import { isConnectedToTheInternet, isConnectedToTheServer } from 'BetBash/src/utils/connexionCheck'
import { refreshUserToken } from 'BetBash/src/utils/refreshUserToken'
import { checkIfProfileComplete } from 'BetBash/src/utils/validateUser'


export const initializationScript = store => async () => {
  const state = store.getState()
  const dispatch = store.dispatch

  dispatch(initializationCleanup())

  initialCheckUp: try {
    const isConnectedInternet = await isConnectedToTheInternet(state, dispatch)
    if (isConnectedInternet) { dispatch(connectedToInternet()) } else { break initialCheckUp }

    const isConnectedServer = await isConnectedToTheServer(state, dispatch)
    if (isConnectedServer) { dispatch(connectedToServer()) } else { break initialCheckUp }

    const userToken = await refreshUserToken(state, dispatch)
    if (userToken) { dispatch(tokenRefreshed()) } else { break initialCheckUp }

    const isProfileComplete = await checkIfProfileComplete(store)
    if (isProfileComplete) {
      dispatch(profileCompleted())
    } else {
      dispatch(profileIsNotComplete())
      break initialCheckUp
    }
  } catch (error) {
    console.log('intializingScript.js // error happened: ', error)
  }
  dispatch(initializationComplete())
}