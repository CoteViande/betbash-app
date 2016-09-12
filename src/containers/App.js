import React from 'react'
import { Actions, Scene, Router, TabBar, Switch } from 'react-native-router-flux'
import { connect } from 'react-redux'

import AuthMain from './AuthMain'
import RegisterEmail from './RegisterEmail'
import LoginEmail from './LoginEmail'
import Home from './Home'
import Profile from './Profile'

import { StyleSheet, Text, View } from 'react-native'
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
  // <Scene key="App" component={App} title="App main" /> // TODO: maybe not
const scenes = Actions.create(
  <Scene key="root" hideNavBar={true}>
  <Scene
    key="LoginAccessControl" hideNavBar={true}
    tabs={true} component={connect(state=>({ isLoggedIn: state.auth.user.isLoggedIn }))(Switch)}
    unmountScenes
    selector={ props => props.isLoggedIn ? "BetBash" : "BetBashAuth"}
  >

    <Scene
      key="BetBashAuth"
      direction="vertical" default="AuthMain"
      hideNavBar={true}
    >
      <Scene
        key="AuthMain" component={AuthMain}
        title="Login"
        hideNavBar={true}
      />
      <Scene
        key="RegisterEmail" component={RegisterEmail}
        title="Register"
        hideNavBar={false}
      />
      <Scene
        key="LoginEmail" component={RegisterEmail}
        title="Login"
        hideNavBar={false}
      />
    </Scene>

    <Scene
      key="BetBash"
      tabs={true} default="Home"
      hideNavBar={true} tabBarStyle={ { backgroundColor: '#000' } }
    >
      <Scene
        key="Home" component={Home}
        title="Home" icon={TabIcon}
        hideNavBar={true} initial={true}
      />
      <Scene key="Games" component={Profile}
        title="Games" icon={TabIcon}
        hideNavBar={true}
      />
      <Scene
        key="Profile" component={Profile}
        title="Profile" icon={TabIcon}
        hideNavBar={true}
      />
    </Scene>

  </Scene>
  </Scene>
);

class App extends React.Component {
  render() {
    return <RouterWithRedux scenes={scenes}/>
  }
}



export default connect()(App);
