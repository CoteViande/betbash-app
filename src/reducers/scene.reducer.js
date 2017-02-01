import Navigator from 'BetBash/src/components/router/Navigator'

const navigationReducer = (state, action) => Navigator.router.getStateForAction(action, state)

export default navigationReducer