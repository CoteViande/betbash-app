import React from 'react';
import { AppRegistry, Navigator, StyleSheet, View, Text } from 'react-native';
import { Provider, connect } from 'react-redux';
import { Actions, Router, Scene, TabBar} from 'react-native-router-flux';
import configureStore from './store/configureStore';

/**
 * All the top level containers
 */
import App from './containers/App';
import Login from './containers/AuthMain';
// import Logout from './containers/RegisterEmail';
// import Register from './containers/LoginEmail';
// import ForgotPassword from './containers/Home';
// import Profile from './containers/Profile';

const RouterWithRedux = connect()(Router);
const scenes = Actions.create(
  <Scene key="root" hideNavBar={true}>
  // setup the router table with App selected as the initial component
  // note: See https://github.com/aksonov/react-native-router-flux/issues/948
    <Scene key="App" component={App} title="App main" /> // TODO: maybe not
    <Scene key="AuthMain" component={AuthMain} title="Login" hideNavBar={true} />
    <Scene key="AuthEmail" component={RegisterEmail} title="Register" />
    <Scene key="LoginEmail" component={LoginEmail} title="Login with email" />

    <Scene key="Tabbar" tabs={true} hideNavBar={true} /*tabBarStyle={ styles.tabBar }*/ default="Main">
      <Scene key="Home" component={Home} title="BetBash" />
      <Scene key="Profile" component={Profile} title="BetBash" />
    </Scene>
  </Scene>
);

/**
 * ## Actions
 */
// import { setStore } from './reducers/global/globalActions'; // TODO

// import authInitialState from './reducers/inits/authInit';

function getInitialState() {
  const _initState = {
    scene: {}
  };
  return _initState;
}

/**
 * ## Native
 *
 * ```configureStore``` with the ```initialState``` and set the
 * ```platform``` and ```version``` into the store by ```dispatch```.
 * *Note* the ```store``` itself is set into the ```store```.  This
 * will be used when doing hot loading
 */
export default function native(platform) {
  let BetBash = React.createClass( {
    render() {
      const store = configureStore(getInitialState());
      // const store = configureStore(getInitialState());
      // store.dispatch(setStore(store)); // TODO

      return (
        <Provider store={store}>
          <RouterWithRedux scenes={scenes} />
        </Provider>
      );
    }
  });

  AppRegistry.registerComponent('betbash', () => BetBash);
}