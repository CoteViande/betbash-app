import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Actions, Scene, Router, TabBar, Switch } from 'react-native-router-flux'
import { connect } from 'react-redux'

import AuthMain from './AuthMain'
import RegisterEmail from './RegisterEmail'
import LoginEmail from './LoginEmail'
import Home from './Home'
import Profile from './Profile'

import BetBashNavbar from '../components/Navbar'

class TabIcon extends React.Component {
  render(){
    var color = this.props.selected ? '#FF3366' : '#FFB3B3';
    return (
      <View style={{flex:1, flexDirection:'column', alignItems:'center', alignSelf:'center'}}>
        <Text style={{color: color}}>{this.props.title}</Text>
      </View>
    );
  }
}

const RouterWithRedux = connect()(Router);
// setup the router table with App selected as the initial component
// note: See https://github.com/aksonov/react-native-router-flux/issues/948
  // <Scene key="App" component={App} title="App main" /> maybe not
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
        key="BetBashAuth" default="AuthMain" hideNavBar={false} tabs={true}
      >
        <Scene
          key="AuthMain" component={AuthMain} title="Login" hideNavBar={true}
        />
        <Scene
          key="RegisterEmail" component={RegisterEmail} title="Register" hideNavBar={false} navBar={BetBashNavbar}
          onLeft={() => Actions.AuthMain()} leftTitle="Back"
          onRight={() => Actions.LoginEmail()} rightTitle="Login"
        />
        <Scene
          key="LoginEmail" component={LoginEmail} title="Login" hideNavBar={false} navBar={BetBashNavbar}
          onLeft={() => Actions.RegisterEmail()} leftTitle="Register"
        />
      </Scene>

      <Scene
        key="BetBash" default="Home" tabs={true} tabBarStyle={ { backgroundColor: '#000' } } hideNavBar={true}
      >
        <Scene
          key="Home" component={Home} title="Home" icon={TabIcon} hideNavBar={true} initial={true}
        />
        <Scene
          key="Games" component={Profile} title="Games" icon={TabIcon} hideNavBar={true}
        />
        <Scene
          key="Profile" component={Profile} title="Profile" icon={TabIcon} hideNavBar={true}
        />
      </Scene>

    </Scene>
  </Scene>
);

class App extends React.Component {
  render() {
    return (<RouterWithRedux scenes={scenes} />)
  }
}



export default connect()(App);
