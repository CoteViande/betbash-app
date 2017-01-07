import { serverResponseChange } from 'BetBash/src/actions/connexionActions'
import { isApiFSA, isRequestFSA, isSuccessFSA, isFailureFSA } from 'BetBash/src/middlewares/api-middleware/index'

const apiErrorMiddleware = store => next => action => {
  if (!isApiFSA(action)) {
    return next(action)
  }

  let dispatch = store.dispatch
  let state = store.getState()

  if (isFailureFSA(action)) {
    let error = action.payload
    console.log('action.error', error, error.name)
    if (error.name === 'InvalidRSAA') { console.log(error.name, ': ', error.validationErrors) }

    if (error.name === 'ApiError') { // FIXME find better test
      if (!state.connexion.isConnectedServer) { dispatch(serverResponseChange(true)) }
      console.log('Middleware object: ', error)
      const apiError = error.response.error
      switch(apiError.code) {
        case 'LOGIN_FAILED':
          // try to refresh token
          // logout user
        break
        default:
          if (apiError.message === 'could not find accessToken') {
            // try to refresh token
            // logout user
          } // TODO backend: better error with code
          console.log('API Error: ', apiError, 'code: ', apiError.code)
        break
      }
    }

    if (error.name === 'FetchError') {
      dispatch(serverResponseChange(false))
    }
  }

  if (!state.connexion.isConnectedServer
    && isSuccessFSA(action)
  ) {
    dispatch(serverResponseChange(true))
    // TODO refresh token when ttl is low
  }

  return next(action)
}

export default apiErrorMiddleware