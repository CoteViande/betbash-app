import { NetInfo } from 'react-native'

import {
  pingServer,
  connexionChange,
  connexionChangeTest,
} from 'BetBash/src/actions/connexion.actions'
import { initializationScript } from 'BetBash/src/store/initializationScript'

export const isConnectedToTheInternet = (state, dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      let reach = await NetInfo.fetch()
      let connected = await isConnected(reach)
      dispatch(connexionChange(connected, reach))

      NetInfo.addEventListener('connectivityChange', handleConnectivityChange(state.connexion.isConnected, dispatch))
      NetInfo.isConnected.addEventListener('connectivityChangeTest', handlerTest(dispatch))

      resolve(connected)
    } catch (error) {
      reject(error)
    }
  })
}

export const isConnectedToTheServer = (state, dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await dispatch(pingServer())
      resolve(!response.error)
    } catch (error) {
      reject(error)
    }
  })
}

const handleConnectivityChange = (state, dispatch) => reach => {
  let connected = isConnected(reach)
  dispatch(connexionChange(connected, reach))
  if (connected && !state.initialization.isFinished) {
    // initialization(state, dispatch)
  }
}

const handlerTest = dispatch => isConnected => {
  let connectedStr = isConnected ? 'online' : 'offline'
  console.warn('Device is now ' + connectedStr )
  dispatch(connexionChangeTest(isConnected))
}

const isConnected = reach => {
  let connected
  switch (reach.toUpperCase()) {
    case 'NONE':
    case 'DUMMY':
    case 'UKNOWN':
      connected = false
      break
    case 'WIFI':
    case 'CELL':
    case 'MOBILE':
    case 'MOBILE_HIPRI':
    case 'ETHERNET':
    case 'WIMAX':
    case 'BLUETOOTH':
    case 'MOBILE_MMS':
    case 'MOBILE_SUPL':
    case 'MOBILE_DUN':
      connected = true
      break
    default:
      connected = true
      break
  }
  return connected
}