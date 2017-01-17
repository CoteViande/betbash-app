import { GoogleAnalyticsTracker } from 'react-native-google-analytics-bridge'

import { isFSA, isAnalyticsFSA } from 'BetBash/src/utils/fsaValidator'

const analyticsMiddleware = store => next => action => {
  let tracker = new GoogleAnalyticsTracker('UA-89953573-1')
  tracker.setSamplingRate(100)

  if (isFSA(action) && action.error) {
    tracker.trackException(action.payload && action.payload.message, false)
  }

  if (!isAnalyticsFSA(action) && !isTrackedScene(action)) {
    return next(action)
  }

  if (isTrackedScene(action)) {
    const sceneName = action.scene.name
    tracker.trackScreenView(sceneName)
    return next(action)
  }

  const types = Array.isArray(action.meta.analytics.types)
    ? action.meta.analytics.types
    : [action.meta.analytics.types]
  types.forEach(type => track(tracker, type, action))

  return next(action)
}

const track = (tracker, type, action) => {
  switch (type) {
    case 'indentify':
    //   let userId = action.payload.userId
    //   tracker.setUser(userId)
      break // TODO https://support.google.com/analytics/answer/3123666?hl=en
    case 'event':
      let extraValues = action.meta.analytics.payload
      tracker.trackEvent('redux_event', action.type, extraValues)
      break
    default:
      break
  }
  return
}

const isTrackedScene = action => (action.type === 'REACT_NATIVE_ROUTER_FLUX_FOCUS')

export default analyticsMiddleware