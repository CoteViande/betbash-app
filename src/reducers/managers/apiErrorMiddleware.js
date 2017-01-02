import { serverResponseChange } from '../../actions/connexionActions'
import { RSAA, isRSAA } from '../../utils/api-middleware/index'

const apiErrorMiddleware = store => next => action => {
  if (action.error && action.payload) {
    let dispatch = store.dispatch
    let state = store.getState()

    let error = action.payload
    console.log('action.error', error, error.name)

    if (error.name === 'ApiError') {
      let apiError = error.response
      console.log('Middleware object: ', error)
      console.log('API Error: ', apiError, 'code: ', apiError.code)
    }

    if (error.name === 'FetchError') {
      dispatch(serverResponseChange(false))
    } else {
      if (!state.connexion.isServerConnected) {
        dispatch(serverResponseChange(true))
      }
    }
  }

  return next(action)
}

export default apiErrorMiddleware