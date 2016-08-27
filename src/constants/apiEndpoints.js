const ROOT_URL = process.env.NODE_ENV === 'production' ?
  'http://betbash.com' :
  'http://localhost:8080';
const BASE_URL = ROOT_URL + '/api';

export const facebookAuthenticateUrl = ROOT_URL + '/auth/facebook-token/callback';