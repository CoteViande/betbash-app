import { serverResponseChange } from '../../actions/connexionActions'
import { isRSAA } from '../utils/api-middleware/index'

const apiErrorManager = (prevState, nextState, action, dispatch) => {
  if (isRSAA(action)) {
    if (action.error && action.payload) {
      let error = action.payload
      console.log('action.error', error, error.name)
      if (error.name === 'ApiError') {
        let apiError = error.response
        // for wrong token
        console.log('Middleware object: ', error)
        console.log('API Error: ', apiError, 'code: ', apiError.code)
      }
      if (error.name === 'FetchError') {
        // snack bar with retry option -> activate server error snack bar
        dispatch(serverResponseChange(false))
        console.log('FetchError: ', error)
      }
    } else {
      if (!prevState.connexion.isServerConnected) {
        dispatch(serverResponseChange(true))
      }
    }
  }
}

export default apiErrorManager