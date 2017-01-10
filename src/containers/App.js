import React from 'react'
import { StatusBar, StyleSheet, Text, View } from 'react-native'
import { Actions, Scene, Router, TabBar, Switch, ActionConst } from 'react-native-router-flux'
import { connect } from 'react-redux'

import AuthMain from 'BetBash/src/containers/auth/AuthMain'
import RegisterEmail from 'BetBash/src/containers/auth/RegisterEmail'
import LoginEmail from 'BetBash/src/containers/auth/LoginEmail'
import Home from 'BetBash/src/containers/main/Home'
import Games from 'BetBash/src/containers/main/Games'
import Profile from 'BetBash/src/containers/main/Profile'

import BetBashNavbar from 'BetBash/src/components/general/Navbar'
import BetBashTabIcon from 'BetBash/src/components/general/TabIcon'
import Snackbar from 'BetBash/src/components/general/Snackbar'
import * as color from 'BetBash/src/constants/colors'

import { pingServer } from 'BetBash/src/actions/connexionActions'

const tabbarStyle = { position: 'absolute', left: 0, right: 0, top: 0, bottom: 60, backgroundColor: color.red500 }

const RouterWithRedux = connect()(Router);

const scenes = Actions.create(
  <Scene
    key="LoginAccessControl" hideNavBar={true} tabs={true}
    component={
      connect(
        state => ({ isLoggedIn: state.auth.user.isLoggedIn })
      )(Switch)
    }
    selector={
      props => props.isLoggedIn ? "BetBash" : "BetBashAuth"
    }
    unmountScenes={true}
  >

    <Scene
      key="BetBashAuth" default="AuthMain" hideNavBar={true}
    >
      <Scene
        key="AuthMain" initial={true} component={AuthMain} title="Login" hideNavBar={true} direction="vertical" type={ActionConst.RESET}
      />
      <Scene
        key="RegisterEmail" component={RegisterEmail} title="Register" hideNavBar={false} navBar={BetBashNavbar} direction="vertical"
        onRight={() => Actions.LoginEmail()} rightTitle="Login"
        backTitle="Back"
      />
      <Scene
        key="LoginEmail" component={LoginEmail} title="Login" hideNavBar={false} navBar={BetBashNavbar}
        backTitle="Register"
      />
    </Scene>

    <Scene
      key="BetBash" default="Home" tabs={true} tabBarStyle={ tabbarStyle } hideNavBar={true}
    >
      <Scene
        key="Home" component={Home} title="Home" icon={BetBashTabIcon} hideNavBar={true} initial={true}
      />
      <Scene
        key="Games" component={Games} title="Games" icon={BetBashTabIcon} hideNavBar={true}
      />
      <Scene
        key="Profile" component={Profile} title="Profile" icon={BetBashTabIcon} hideNavBar={true}
      />
    </Scene>

  </Scene>
);

class App extends React.Component {
  render() {
    const {
      initializationFinished,
      isConnected,
      isServerConnected,
      pingServer,
    } = this.props

    if (!initializationFinished) {
      return (
        <View style={{ flexGrow:1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
            BETBASH
          </Text>
        </View>
      )
    }

    return (
      <View style={{ flexGrow: 1 }}>
        <StatusBar translucent={false} backgroundColor={ color.red900 } barStyle="default" />
        <RouterWithRedux scenes={scenes} />
        <Snackbar isSnack={ !isConnected } snackMessage={ "No internet connexion" } />
        <Snackbar isSnack={ isConnected && !isServerConnected } snackMessage={ "Server seems to be down" }
          snackButtonText="Retry" onSnackButtonPress={() => pingServer()}
        />
      </View>
    )
  }
}

const mapStateToProps = (state, { params }) => {
  return {
    initializationFinished: state.initialization.finished,
    isConnected: state.connexion.isConnected,
    isServerConnected: state.connexion.isServerConnected,
  };
};

const mapDispatchToProps = {
  pingServer,
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
