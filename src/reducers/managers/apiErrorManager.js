import { serverResponseChange } from '../../actions/connexionActions'
import { RSAA, isRSAA } from '../../utils/api-middleware/index'

const apiErrorManager = (prevState, nextState, action, dispatch) => {
  if (action.error && action.payload) {
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
      if (!prevState.connexion.isServerConnected) {
        dispatch(serverResponseChange(true))
      }
    }
  }
}

export default apiErrorManager