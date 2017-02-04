import { StackNavigator, TabNavigator } from 'react-navigation'

// TODO import * as containers from 'BetBash/src/containers/index'
import FacebookAuthentication from 'BetBash/src/containers/auth/FacebookAuthentication'
import RegisterEmail from 'BetBash/src/containers/auth/RegisterEmail'
import LoginEmail from 'BetBash/src/containers/auth/LoginEmail'
import CompleteProfile from 'BetBash/src/containers/auth/CompleteProfile'
import Home from 'BetBash/src/containers/main/Home'
import Games from 'BetBash/src/containers/main/Games'
import Profile from 'BetBash/src/containers/main/Profile'
import CreateGame from 'BetBash/src/containers/game/CreateGame'

import * as styles from 'BetBash/src/assets/styles/main'
import * as color from 'BetBash/src/assets/styles/colors.settings'

// TODO switchRules
//     ? isUserProfileComplete
//       : 'CompleteProfile'
const MainScreenTabs = TabNavigator({
  Home: { screen: Home },
  Games: { screen: Games },
  Profile: { screen: Profile },
}, {
  initialTab: 'Home',
  tabBarOptions: { // default
    activeTintColor: 'white',
    style: {
      backgroundColor: color.red500,
      elevation: 0,
    },
  },
})

const Navigator = StackNavigator({
  FacebookAuthentication: { screen: FacebookAuthentication },
  EmailRegister: { screen: RegisterEmail }, // TODO rename to EmailRegister
  EmailLogin: { screen: LoginEmail }, // TODO rename to EmailLogin
  Main: { screen: MainScreenTabs },
  CompleteProfile: { screen: CompleteProfile },
  GameCreate: { screen: CreateGame },
}, {
  headerMode: 'screen', // float or screen or none
  initialRouteName: 'FacebookAuthentication',
  navigationOptions: {
    header: {
      style: {
        backgroundColor: color.red500,
        elevation: 0,
      }, // TODO make this work
      visible: false,
    },
  },
})
export default Navigator

export const isCurrentRouteInRightSection = (targetRouteName, currentNavState) => {
  const currentRouteName = getCurrentRoute(currentNavState).routeName
  // TODO AuthenticationGroup.includes(targetRouteName) && AuthenticationGroup.includes(currentRouteName)
  if (AuthenticationGroup.includes(targetRouteName)) {
    return AuthenticationGroup.includes(currentRouteName)
  } else {
    return !AuthenticationGroup.includes(currentRouteName)
  }
}

export const isCurrentRouteAlready = (targetRouteName, currentNavState) => {
  const currentRouteName = getCurrentRoute(currentNavState).routeName
  return (targetRouteName === currentRouteName)
}

const AuthenticationGroup = [
  'FacebookAuthentication',
  'EmailLogin',
  'EmailRegister',
]

export const backAndroidHandler = (dispatch, nav) => {
  if (shouldCloseApp(nav)) return false
  dispatch({ type: 'Back' })
  return true
}

const shouldCloseApp = nav => (
  isAuthenticationInitialScreen(nav)
  || isHomeInitialScreen(nav)
  || isCompleteProfileScreen(nav)
)

const isAuthenticationInitialScreen = nav => (
  getCurrentRoute(nav).routeName === 'FacebookAuthentication'
)

const isCompleteProfileScreen = nav => (
  getCurrentRoute(nav).routeName === 'CompleteProfile'
)

const isHomeInitialScreen = nav => {
  const childRoute = getChildCurrentRoute(nav)
  return (childRoute && childRoute.routeName === 'Home')
}

const getCurrentRoute = nav => (nav.routes[nav.index])
const getChildCurrentRoute = nav => {
  if (!getCurrentRoute(nav).routes) return false
  return getCurrentRoute(getCurrentRoute(nav))
}
