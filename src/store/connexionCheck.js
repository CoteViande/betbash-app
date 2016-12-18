import { NetInfo } from 'react-native'

import { connexionChange, connexionChangeTest } from '../actions/connexionActions'

export const isConnectedToTheInternet = (store) => {
  return new Promise((resolve, reject) => {
    NetInfo.fetch()
      .then((reach) => {
        let connected = isConnected(reach)
        store.dispatch(connexionChange(connected, reach))
        NetInfo.addEventListener('connectivityChange', handleConnectivityChange(store));
        // NetInfo.isConnected.addEventListener('connectivityChangeTest', handlerTest(store));
        resolve(connected);
      })
      .catch((error) => {
        reject(error)
      })
  })
}

const handleConnectivityChange = (store) => (reach) => {
  let connected = isConnected(reach)
  store.dispatch(connexionChange(connected, reach))
}

const handlerTest = (store) => (isConnected) => {
  let connectedStr = isConnected ? 'online' : 'offline'
  console.warn('Device is now ' + connectedStr )
  store.dispatch(connexionChangeTest(isConnected))
}

function isConnected(reach) {
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