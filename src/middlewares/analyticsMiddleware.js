import { GoogleAnalyticsTracker } from 'react-native-google-analytics-bridge'

import { isAnalyticsFSA } from 'BetBash/src/utils/fsaValidator'

const analyticsMiddleware = store => next => action => {
  if (!isAnalyticsFSA(action) && !isTrackedContainerFocus(action)) {
    return next(action)
  }

  let tracker = new GoogleAnalyticsTracker('UA-89953573-1')

  if (isTrackedContainerFocus(action)) {
    const sceneName = action.scene.name
    tracker.trackScreenView(sceneName)
    return next(action)
  }

  const event = action.meta.analytics
  // const eventType = event.type
  // const eventPayload = event.payload

  return next(action)
}

const isTrackedContainerFocus = action => (
  action.type === 'REACT_NATIVE_ROUTER_FLUX_FOCUS'
)

export default analyticsMiddleware