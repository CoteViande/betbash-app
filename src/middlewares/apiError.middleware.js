import { serverResponseChange } from 'BetBash/src/actions/connexion.actions'
import { forcedLogoutFromApp } from 'BetBash/src/actions/auth.actions'
import { isApiFSA, isRequestFSA, isSuccessFSA, isFailureFSA } from 'BetBash/src/utils/fsaValidator'
import { refreshUserToken } from 'BetBash/src/utils/refreshUserToken'

const apiErrorMiddleware = store => next =>  async action => {
  if (!isApiFSA(action)) {
    return next(action)
  }
  console.log('ACTION API FSA PAYLOAD: ', action.type)

  let state = store.getState()
  let dispatch = store.dispatch

  if (isFailureFSA(action)) {
    let error = action.payload
    console.log('action.error: ', error, error.name)
    if (error.name === 'InvalidRSAA') { console.log(error.name, ': ', error.validationErrors) }

    if (error.name === 'ApiError') { // FIXME find better test
      if (!state.connexion.isConnectedServer) { dispatch(serverResponseChange(true)) }
      console.log('apiError.middleware // ERROR POPPED: ', error)
      const apiError = error.response.error
      const { statusCode, code, message } = apiError
      switch (statusCode) {
        case 404:
          console.log('apiError.middleware // 404 DETECTED: ', apiError)
        break
        case 500:
          console.log('apiError.middleware // 500 DETECTED: ', apiError)
        break
        default:
          switch(code) {
            case 'LOGIN_FAILED':
            case 'USERNAME_EMAIL_REQUIRED':
            if (state.auth.user.isLoggedIn) {
              dispatch(forcedLogoutFromApp())
            }
            break
            case 'AUTHORIZATION_REQUIRED':
            const force = true
            let userToken = await refreshUserToken(state, dispatch, force)
            break
            default:
            if (apiError.message === 'could not find accessToken') {
              let userToken = await refreshUserToken(state, dispatch)
            } // BACKEND better error with code
            console.log('apiError.middleware // UNDEALT WITH API ERROR: ', apiError, 'code: ', code)
            break
          }
        break
      }
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

export default apiErrorMiddleware