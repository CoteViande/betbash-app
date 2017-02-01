import { isCurrentRouteInRightSection } from 'BetBash/src/components/router/Navigator'

const middleware = store => next => action => {
  let dispatch = store.dispatch
  let prevState = store.getState()
  let result = next(action)
  let nextState = store.getState()

  // care for init // only at init???
  if (prevState.auth.user.isLoggedIn !== nextState.auth.user.isLoggedIn) {
    const nextRouteName = nextState.auth.user.isLoggedIn
      ? 'Main'
      : 'FacebookAuthentication'
    if (!isCurrentRouteInRightSection(nextRouteName, nextState.nav)) {
      dispatch({
        type: 'Reset',
        index: 0,
        actions: [{
          type: 'Navigate',
          routeName: nextRouteName,
        }],
      })
    }
  }
  return result
}

export default middleware