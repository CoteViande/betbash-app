import * as endpoint from 'BetBash/src/constants/apiEndpoints'
import { RSAA, getJSON } from 'BetBash/src/middlewares/api-middleware/index'

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
    payload: {
      isConnected,
      connexionType,
    },
    meta: {
      analytics: {
        types: ['event'],
        payload: {isConnected, connexionType}
      }
    }
  }
}

export function serverResponseChange(isServerConnected) {
  return {
    type: 'SERVER_CONNEXION_CHANGE',
    payload: {
      isServerConnected,
    }
  }
}

export function connexionChangeTest(isConnected) {
  return {
    type: 'CONNEXION_CHANGE_TEST',
    payload: {
      isConnected,
    }
  }
}