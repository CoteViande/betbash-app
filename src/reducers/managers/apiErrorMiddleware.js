import { serverResponseChange } from '../../actions/connexionActions'

const apiErrorMiddleware = store => next => action => {
  if (!action.meta || !action.meta.hasOwnProperty('CALL_API')) {
    return next(action)
  }

  let dispatch = store.dispatch
  let state = store.getState()

  if (action.error && action.payload) {
    let error = action.payload
    console.log('action.error', error, error.name)

    if (error.name === 'ApiError') { // FIXME find better test
      let apiError = error.response
      console.log('Middleware object: ', error)
      console.log('API Error: ', apiError, 'code: ', apiError.code)
    }

    if (error.name === 'FetchError') { // FIXME find better test
      dispatch(serverResponseChange(false))
    }
  }

  if (!state.connexion.isConnectedServer
    && (
      action.type.endsWith('SUCCESS')
      || (action.type.endsWith('FAILURE') && action.payload.name !== 'FetchError')
    )
  ) { // FIXME find better test, not using action.error because of action REQUEST
    dispatch(serverResponseChange(true))
  }

  return next(action)
}

export default apiErrorMiddleware