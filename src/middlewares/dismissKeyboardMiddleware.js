import { Keyboard } from 'react-native'

const dismissKeyboardMiddleware = store => next => action => {
  if (action.type === 'REACT_NATIVE_ROUTER_FLUX_FOCUS') {
    Keyboard.dismiss()
  }

  return next(action)
}

export default dismissKeyboardMiddleware