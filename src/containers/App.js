import React from 'react'
import { StatusBar, View, BackAndroid } from 'react-native'
import { connect } from 'react-redux'
import { addNavigationHelpers } from 'react-navigation'
import SplashScreen from 'react-native-splash-screen'

import Navigator, { backAndroidHandler } from 'BetBash/src/components/router/Navigator'

import Snackbar from 'BetBash/src/components/general/Snackbar'
import * as color from 'BetBash/src/assets/styles/colors.settings'

import { pingServer } from 'BetBash/src/actions/connexion.actions'

class App extends React.Component {
  componentDidMount() {
    BackAndroid.addEventListener('backPress', () => {
      const { dispatch, nav } = this.props
      return backAndroidHandler(dispatch, nav)
    })
    if (this.props.isHydrationComplete) {
      SplashScreen.hide()
    }
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('backPress')
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isHydrationComplete !== nextProps.isHydrationComplete) {
      SplashScreen.hide()
    }
  }

  render() {
    const {
      initializationFinished,
      isConnected,
      isServerConnected,
      dispatch,
      nav,
    } = this.props

    return (
      <View style={{ flexGrow: 1 }}>
        <StatusBar translucent={false} backgroundColor={color.red900} barStyle="default" />
        <Navigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
        <Snackbar isSnack={initializationFinished && !isConnected} snackMessage={'No internet connexion'} />
        <Snackbar
          isSnack={initializationFinished && isConnected && !isServerConnected} snackMessage={'Server seems to be down'}
          snackButtonText="Retry" onSnackButtonPress={() => dispatch(pingServer())}
        />
      </View>
    )
  }
}

const mapStateToProps = state => ({
  isHydrationComplete: state.initialization.isHydrationComplete,
  initializationFinished: state.initialization.isFinished,
  isConnected: state.connexion.isConnected,
  isServerConnected: state.connexion.isServerConnected,
  nav: state.nav,
})

export default connect(mapStateToProps)(App)
