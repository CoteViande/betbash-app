import React from 'react'
import { connect } from 'react-redux'
import { View, Image } from 'react-native'
const FBSDK = require('react-native-fbsdk');
const {
  LoginManager,
} = FBSDK; // TODO: move inside facebook login

import MainLogin from '../components/MainLogin'
import LoadingPage from '../components/LoadingPage'
import ErrorMessage from '../components/ErrorMessage'

import styles from '../../assets/styles/main'

let AuthMain = React.createClass({
  render() {
    const { isLoading, errorMessage, isLoggedInOnFacebook, isLoggedIn } = this.props;

    if ( isLoading || isLoggedIn ) { // isLoggedIn to avoid seeing auth screen during redirection to landing
      return(
        <LoadingPage />
      )
    }

    if ( errorMessage && isLoggedInOnFacebook ) {
      LoginManager.logOut();
    }

    return(
      <Image
        source={ require('../../assets/images/jeteedecran.png') }
        style={ styles.imageBgContainer }>
        <ErrorMessage
          message={ errorMessage }
        />
        <MainLogin
          shouldDisconnect
        />
      </Image>
    );
  }
});

const mapStateToProps = (state, { params }) => {
  return {
    isLoggedInOnFacebook: state.auth.authenticatedOnFacebook,
    isLoggedIn: state.auth.user.isLoggedIn,
    errorMessage: state.auth.errorMessage,
    isLoading: state.auth.isLoading,
  };
};

export default connect(
  mapStateToProps
)(AuthMain)