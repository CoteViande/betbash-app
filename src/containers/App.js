import React from 'react'
import { StatusBar, StyleSheet, Text, View } from 'react-native'
import { Actions, Scene, Router, TabBar, Switch, ActionConst } from 'react-native-router-flux'
import { connect } from 'react-redux'

import AuthMain from './AuthMain'
import RegisterEmail from './RegisterEmail'
import LoginEmail from './LoginEmail'
import Home from './Home'
import Games from './Games'
import Profile from './Profile'

import BetBashNavbar from '../components/Navbar'
import BetBashTabIcon from '../components/TabIcon'
import Snackbar from '../components/Snackbar'
import * as color from '../../assets/constants/colors'

const tabbarStyle = { position: 'absolute', left: 0, right: 0, top: 0, bottom: 60, backgroundColor: color.red500 }

const RouterWithRedux = connect()(Router);

const scenes = Actions.create(
  <Scene key="root" hideNavBar={true}>
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
          key="AuthMain" component={AuthMain} title="Login" hideNavBar={true} direction="vertical"
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
  </Scene>
);

class App extends React.Component {
  render() {
    const { initializing, isConnected } = this.props

    if (initializing) {
      return (
        <View style={{ flex:1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
            BETBASH
          </Text>
        </View>
      )
    }

    return (
      <View style={{ flex:1 }}>
        <StatusBar translucent={false} backgroundColor={ color.red900 } barStyle="default" />
        <RouterWithRedux scenes={scenes} />
        <Snackbar isSnack={ !isConnected } snackMessage={ "No internet connexion" } />
        <Snackbar isSnack={ !isConnected } snackMessage={ "No internet connexion" } snackButton="Retry" onPress={()=>true} />
      </View>
    )
  }
}

const mapStateToProps = (state, { params }) => {
  return {
    initializing: state.init.initializing,
    isConnected: state.connexion.isConnected,
  };
};

export default connect(
  mapStateToProps
)(App);
