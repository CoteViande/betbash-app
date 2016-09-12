import { Schema, normalize } from 'normalizr'
import * as endpoint from '../constants/apiEndpoints'
import { RSAA } from '../utils/api-middleware/index'

export function failureFacebookToken(error) {
  return {
    type: 'FACEBOOK_TOKEN_FAILURE',
    message: error.message || 'Something went wrong.',
  };
}

export function successFacebookToken(token) {
  return {
    type: 'FACEBOOK_TOKEN_SUCCESS',
  };
}

export function logoutFromFacebook() {
  return {
    type: 'FACEBOOK_LOGOUT',
  };
}

const userToken = new Schema('userToken');
export function authenticateWithFacebookToken(accessToken) {
  return {
    [RSAA]: {
      types: [
        'FACEBOOK_AUTHENTICATE_REQUEST',
        {
          type: 'FACEBOOK_AUTHENTICATE_SUCCESS',
          payload: (action, state, res) => {
            const contentType = res.headers.get('Content-Type');
            if (contentType && ~contentType.indexOf('json')) {
              return res.json().then((json) => normalize(json, { userToken: userToken }));
            }
          }
        },
        'FACEBOOK_AUTHENTICATE_FAILURE'
      ],
      endpoint: endpoint.facebookAuthenticateUrl(accessToken),
      method: 'GET',
      headers: {
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json'
      }
    }
  }
}

export function loginWithEmail(email, password) {
  return {
    [RSAA]: {
      types: [
        'EMAIL_LOGIN_REQUEST',
        {
          type: 'EMAIL_LOGIN_SUCCESS',
          payload: (action, state, res) => {
            const contentType = res.headers.get('Content-Type');
            if (contentType && ~contentType.indexOf('json')) {
              return res.json().then((json) => normalize(json, { userToken: userToken }));
            }
          }
        },
        'EMAIL_LOGIN_FAILURE'
      ],
      endpoint: endpoint.userLoginUrl,
      method: 'POST',
      body: JSON.stringify({ email: email, password: password }),
      headers: {
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json'
      }
    }
  }
}