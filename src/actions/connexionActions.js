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