import { NetInfo } from 'react-native'

import timeout from 'BetBash/src/utils/timeout'
import * as endpoint from 'BetBash/src/constants/apiEndpoints'
import { pingServer, connexionChange, connexionChangeTest, serverResponseChange } from 'BetBash/src/actions/connexionActions'
import { initializationScript } from 'BetBash/src/store/initializationScript'

export const isConnectedToTheInternet = (state, dispatch) => {
  return new Promise((resolve, reject) => {
    NetInfo.fetch()
      .then((reach) => {
        let connected = isConnected(reach)
        dispatch(connexionChange(connected, reach))
        NetInfo.addEventListener('connectivityChange', handleConnectivityChange(state.connexion.isConnected, dispatch));
        NetInfo.isConnected.addEventListener('connectivityChangeTest', handlerTest(dispatch));
        resolve(connected);
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const isConnectedToTheServer = (state, dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch(pingServer())
      .then((res) => {
        resolve(!res.error)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

const handleConnectivityChange = (state, dispatch) => reach => {
  let connected = isConnected(reach)
  dispatch(connexionChange(connected, reach))
  if (connected && !state.initializationialization.finished) {
    initializationScript(state, dispatch)
  }
}

const handlerTest = (store) => (isConnected) => {
  let connectedStr = isConnected ? 'online' : 'offline'
  console.warn('Device is now ' + connectedStr )
  store.dispatch(connexionChangeTest(isConnected))
}

const isConnected = reach => {
  let connected
  switch (reach.toUpperCase()) {
    case 'NONE':
    case 'DUMMY':
    case 'UKNOWN':
      connected = false
      break;
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
      break;
    default:
      connected = true
      break;
  }
  return connected
}