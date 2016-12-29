export function initializationComplete() {
  return {
    type: 'INITIALIZATION_COMPLETE',
  }
}

export function connectedToInternet() {
  return {
    type: 'INITIALIZATION_CONNECTED_TO_INTERNET',
  }
}

export function connectedToServer() {
  return {
    type: 'INITIALIZATION_CONNECTED_TO_SERVER',
  }
}

export function tokenRefreshed() {
  return {
    type: 'INITIALIZATION_TOKEN_REFRESHED',
  }
}
