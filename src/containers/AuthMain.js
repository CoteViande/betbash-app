import React from 'react'
import { connect } from 'react-redux'
import { View, Image } from 'react-native'

import MainLogin from '../components/MainLogin'
import LoadingPage from '../components/LoadingPage'
import ErrorMessage from '../components/ErrorMessage'

import styles from '../../assets/styles/main'

let AuthMain = React.createClass({
  render() {
    const { isLoading, errorMessage, isLoggedIn } = this.props;

    if ( isLoading || isLoggedIn ) { // isLoggedIn to avoid seeing auth screen during redirection to landing
      return(
        <LoadingPage />
      )
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
    isLoggedIn: state.auth.user.isLoggedIn,
    errorMessage: state.auth.errorMessageFBAuth,
    isLoading: state.auth.isLoading,
  };
};

export default connect(
  mapStateToProps
)(AuthMain)