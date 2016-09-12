const ROOT_URL = process.env.NODE_ENV === 'production' ?
  'http://betbash.com' :
  'http://192.168.1.34:3000';
const BASE_URL = ROOT_URL + '/api';

export const facebookAuthenticateUrl = (accessToken) => {
  return ROOT_URL + '/auth/facebook-token/callback?access_token=' + accessToken
};

export const userLoginUrl = BASE_URL + '/BaseUsers/login';
export const userLogoutUrl = BASE_URL + '/BaseUsers/logout';
export const userByIdUrl = (userId) => {
  return BASE_URL + '/BaseUsers/' + userId
};
