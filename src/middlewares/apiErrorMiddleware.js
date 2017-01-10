import { serverResponseChange } from 'BetBash/src/actions/connexionActions'
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
      console.log('Middleware object: ', error)
      const apiError = error.response.error
      switch(apiError.code) {
        case 'LOGIN_FAILED':
        case 'USERNAME_EMAIL_REQUIRED':
          if (state.user.isLoggedIn) {
            dispatch(forcedLogoutFromApp())
          }
        break
        default:
          if (apiError.message === 'could not find accessToken') {
            let userToken = await refreshUserToken(state, dispatch)
          } // BACKEND better error with code
          console.log('API Error: ', apiError, 'code: ', apiError.code)
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
    let userToken = refreshUserToken(state, dispatch)
  }

  return next(action)
}

export default apiErrorMiddleware