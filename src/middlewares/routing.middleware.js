import {
  isCurrentRouteInRightSection,
  isCurrentRouteAlready,
} from 'BetBash/src/components/router/Navigator'

const routingMiddleware = store => next => action => {
  let dispatch = store.dispatch
  let prevState = store.getState()
  let result = next(action)
  let nextState = store.getState()

  if (prevState.auth.user.isLoggedIn !== nextState.auth.user.isLoggedIn) {
    const nextRouteName = getNextRouteName(nextState)
    if (nextRouteName) {
      dispatch({
        type: 'Reset',
        index: 0,
        actions: [{
          type: 'Navigate',
          routeName: nextRouteName,
        }],
      })
      return result
    }
  }

  if (shouldRedirectToCompleteProfile(nextState)) {
    dispatch({
      type: 'Navigate',
      routeName: 'CompleteProfile',
    })
    return result
  }

  if (prevState.auth.isUserProfileComplete !== nextState.auth.isUserProfileComplete
    && nextState.auth.isUserProfileComplete
    && isCurrentRouteAlready('CompleteProfile', nextState.nav)
  ) {
    dispatch({
      type: 'Reset',
      index: 0,
      actions: [{
        type: 'Navigate',
        routeName: 'Main',
      }],
    })
  }

  return result
}

const getNextRouteName = nextState => {
  if (shouldRedirectToCompleteProfile(nextState)) {
    return 'CompleteProfile'
  }
  const nextRouteName = nextState.auth.user.isLoggedIn
    ? 'Main'
    : 'FacebookAuthentication'
  if (!isCurrentRouteInRightSection(nextRouteName, nextState.nav)) {
    return nextRouteName
  }
  return null
}

const shouldRedirectToCompleteProfile = nextState => (
  nextState.auth.user.isLoggedIn
  && !nextState.auth.isUserProfileComplete
  && !isCurrentRouteAlready('CompleteProfile', nextState.nav)
)

export default routingMiddleware