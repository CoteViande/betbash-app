import { serverResponseChange } from '../actions/connexionActions'
import { isFSA, isRequestFSA, isSuccessFSA, isFailureFSA } from './api-middleware/index'

const apiErrorMiddleware = store => next => action => {
  if (!isFSA(action)) {
    return next(action)
  }

  let dispatch = store.dispatch
  let state = store.getState()

  if (isFailureFSA(action)) {
    let error = action.payload
    console.log('action.error', error, error.name)
    if (error.name === 'InvalidRSAA') { console.log(error.name, ': ', error.validationErrors) }

    if (error.name === 'ApiError') { // FIXME find better test
      dispatch(serverResponseChange(true))
      console.log('Middleware object: ', error)
      const apiError = error.response.error
      switch(apiError.code) {
        case 'LOGIN_FAILED':
        break
        default:
          console.log('API Error: ', apiError, 'code: ', apiError.code)
        break
      }
      // TODO backend error 500 "could not find accessToken"
    }

    if (error.name === 'FetchError') { // FIXME find better test
      dispatch(serverResponseChange(false))
    }
  }

  if (!state.connexion.isConnectedServer
    && isSuccessFSA(action)
  ) {
    dispatch(serverResponseChange(true))
    // refresh token when ttl is low?
  }

  return next(action)
}

export default apiErrorMiddleware