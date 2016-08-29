const ROOT_URL = process.env.NODE_ENV === 'production' ?
  'http://betbash.com' :
  'http://192.168.1.34:3000';
const BASE_URL = ROOT_URL + '/api';

export const facebookAuthenticateUrl = ROOT_URL + '/auth/facebook-token/callback';