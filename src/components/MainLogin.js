import React from 'react'
import { connect } from 'react-redux'
import { Text, View, Image } from 'react-native'
import { Actions } from 'react-native-router-flux'
const FBSDK = require('react-native-fbsdk');
const {
  LoginManager,
} = FBSDK; // TODO: move inside facebook login

import styles from '../../assets/styles/main'
import FacebookLogin from './FacebookLogin'

const MainLogin = React.createClass({
  render: function() {
    const { errorMessage, isLoggedIn, isLoggedInOnFacebook } = this.props;
    const goToEmailAuth = () => Actions.AuthEmail();
    const goToHome = () => Actions.BetBash();

    if ( errorMessage && isLoggedInOnFacebook ) {
      LoginManager.logOut();
    }
    if ( isLoggedIn ) {
      goToHome();
    }

    return (
      <Image
        source={ require('../../assets/images/jeteedecran.png') }
        style={ styles.imageBgContainer }>
        <View style={ styles.container }>
          <FacebookLogin />
        </View>
        <View style={ styles.bottomContainer }>
          <Text style={ styles.instructions }
            onPress={ goToEmailAuth }>
            Log in with your email
          </Text>
        </View>
      </Image>
    );
  }
});

const mapStateToProps = (state, { params }) => {
  return {
    errorMessage: state.auth.errorMessage,
    isLoggedInOnFacebook: state.auth.authenticatedOnFacebook,
    isLoggedIn: state.auth.user.isLoggedIn,
  };
};

export default connect(
  mapStateToProps
)(MainLogin)