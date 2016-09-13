const ROOT_URL = process.env.NODE_ENV === 'production' ?
  'http://betbash.com' :
  'http://192.168.1.34:3000';
const BASE_URL = ROOT_URL + '/api';

export const facebookAuthenticateUrl = (accessToken) => {
  return ROOT_URL + '/auth/facebook-token/callback?access_token=' + accessToken
};

export const userUrl = BASE_URL + '/BaseUsers';
export const userLoginUrl = userUrl + '/login';
export const userLogoutUrl = userUrl + '/logout';
export const userByIdUrl = (userId) => {
  return userUrl + '/' + userId
};
