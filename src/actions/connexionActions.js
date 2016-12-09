export function notConnectedToInternet() {
  return {
    type: 'NO_INTERNET_CONNEXION',
  };
}

export function connectedToInternet(connexionType) {
  return {
    type: 'CONNECTED_TO_INTERNET',
    connexionType: connexionType,
  };
}