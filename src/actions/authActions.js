import { CALL_API } from `redux-api-middleware`
import * as endpoint from '../constants/apiEndpoint'

export function failureFacebookToken(error) {
  return {
    type: 'FACEBOOK_TOKEN_FAILURE',
    message: error.message || 'Something went wrong.',
  };
}

export function successFacebookToken(token) {
  return {
    type: 'FACEBOOK_TOKEN_SUCCESS',
    token,
  };
}

export function authenticateWithFacebookToken(accessToken) {
  return {
    [CALL_API]: {
      types: [
        'FACEBOOK_AUTHENTICATE_REQUEST',
        'FACEBOOK_AUTHENTICATE_SUCCESS',
        'FACEBOOK_AUTHENTICATE_FAILURE',
      ],
      endpoint: endpoint.facebookAuthenticateUrl,
      method: 'POST',
      body: JSON.stringify({
        access_token: accessToken
      }),
      headers: {
        // 'Cache-Control': 'no-cache',
        'Content-Type': 'application/json'
      },
    }
  }
}

export function saveFacebookTokenToKeyChain() {

}