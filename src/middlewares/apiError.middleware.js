import { serverResponseChange } from 'BetBash/src/actions/connexion.actions'
import { forcedLogoutFromApp } from 'BetBash/src/actions/auth.actions'
import { isApiFSA, isRequestFSA, isSuccessFSA, isFailureFSA } from 'BetBash/src/utils/fsaValidator'
import { refreshUserToken } from 'BetBash/src/utils/refreshUserToken'

const apiErrorMiddleware = store => next =>  async action => {
  if (!isApiFSA(action)) {
    return next(action)
  }

  let state = store.getState()
  let dispatch = store.dispatch

  if (isFailureFSA(action)) {
    let error = action.payload
    console.log('action.error: ', error, error.name)
    if (error.name === 'InvalidRSAA') { console.log(error.name, ': ', error.validationErrors) }

    if (error.name === 'ApiError') { // FIXME find better test
      if (!state.connexion.isConnectedServer) { dispatch(serverResponseChange(true)) }
      dealWithApiError(error.response.error, dispatch, state)
    }

    if (error.name === 'FetchError') {
      dispatch(serverResponseChange(false))
    }
  }

  if (isSuccessFSA(action)) {
    if (!state.connexion.isConnectedServer) {
      dispatch(serverResponseChange(true))
    }
    let userToken = await refreshUserToken(state, dispatch)
  }

  return next(action)
}

const dealWithApiError = async (apiError, dispatch, state) => {
  console.log('apiError.middleware // ERROR POPPED: ', apiError)
  const { statusCode, code, message } = apiError
  switch (statusCode) {
    case 404:
      dealWithError404(apiError)
    break
    case 500:
      dealWithError500(apiError)
    break
    default:
      switch(code) {
        case 'LOGIN_FAILED':
        case 'USERNAME_EMAIL_REQUIRED':
          dealWithFailedLogin(state.auth.user.isLoggedIn, dispatch)
        break
        case 'AUTHORIZATION_REQUIRED':
          const force = true
          let userToken = await refreshUserToken(state, dispatch, force)
        break
        default:
          if (message === 'could not find accessToken') {
            let userToken = await refreshUserToken(state, dispatch)
          } // BACKEND better error with code
          console.log('apiError.middleware // UNDEALT WITH API ERROR: ', apiError, 'code: ', code)
        break
      }
    break
  }
}

const dealWithError404 = (apiError) => console.log('apiError.middleware // 404 DETECTED: ', apiError)
const dealWithError500 = (apiError) => console.log('apiError.middleware // 500 DETECTED: ', apiError)
const dealWithFailedLogin = (isLoggedIn, dispatch) => {
  if (isLoggedIn) {
    dispatch(forcedLogoutFromApp())
  }
}

export default apiErrorMiddleware