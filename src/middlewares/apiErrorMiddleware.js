import { serverResponseChange } from '../../actions/connexionActions'
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

    if (error.name === 'ApiError') { // FIXME find better test
      dispatch(serverResponseChange(true))
      let apiError = error.response
      console.log('Middleware object: ', error)
      console.log('API Error: ', apiError, 'code: ', apiError.code)
    }

    if (error.name === 'FetchError') { // FIXME find better test
      dispatch(serverResponseChange(false))
    }
  }

  if (!state.connexion.isConnectedServer
    && isSuccessFSA(action)
  ) {
    dispatch(serverResponseChange(true))
  }

  return next(action)
}

export default apiErrorMiddleware