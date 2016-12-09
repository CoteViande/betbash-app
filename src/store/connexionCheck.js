import { NetInfo } from 'react-native'

import { connectedToInternet, notConnectedToInternet } from '../actions/connexionActions'

export const isConnectedToTheInternet = (store) => {
  return new Promise((resolve, reject) => {
    NetInfo.fetch()
      .then((reach) => {
        let connected = true
        switch (reach.toUpperCase()) {
          case 'NONE':
            connected = false
            store.dispatch(notConnectedToInternet())
            break;
          case 'WIFI':
            store.dispatch(connectedToInternet(reach))
            break;
          default:
            store.dispatch(connectedToInternet(reach))
            break;
        }
        resolve(connected);
      })
      .catch((error) => {
        reject(error)
      })
  })
}


// TODO where to place this?
// function handleFirstConnectivityChange(reach) {
//   console.log('First change: ' + reach);
//   NetInfo.removeEventListener(
//     'change',
//     handleFirstConnectivityChange
//   );
// }
// NetInfo.addEventListener(
//   'change',
//   handleFirstConnectivityChange
// );
