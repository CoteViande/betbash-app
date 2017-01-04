import * as endpoint from '../constants/apiEndpoints'
import { RSAA, getJSON } from '../middlewares/api-middleware/index'

export function pingServer() {
  return {
    [RSAA]: {
      types: [
        'SERVER_PING_REQUEST',
        'SERVER_PING_SUCCESS',
        'SERVER_PING_FAILURE'
      ],
      endpoint: endpoint.betbashMain,
      method: 'GET',
      headers: {
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json'
      }
    }
  }
}

export function connexionChange(isConnected, connexionType) {
  return {
    type: 'CONNEXION_CHANGE',
    isConnected,
    connexionType,
  }
}

export function serverResponseChange(isServerConnected) {
  return {
    type: 'SERVER_CONNEXION_CHANGE',
    isServerConnected,
  }
}

export function connexionChangeTest(isConnected) {
  return {
    type: 'CONNEXION_CHANGE_TEST',
    isConnected,
  }
}