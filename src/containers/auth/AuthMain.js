import React from 'react'
import { connect } from 'react-redux'
import { View, Image } from 'react-native'

import MainLogin from 'BetBash/src/components/auth/MainLogin'
import LoadingPage from 'BetBash/src/components/general/LoadingPage'
import ErrorMessage from 'BetBash/src/components/general/ErrorMessage'

import styles from 'BetBash/src/assets/styles/main'

let AuthMain = React.createClass({
  render() {
    const { isLoading, errorMessage, isLoggedIn } = this.props

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
        <MainLogin />
      </Image>
    );
  }
});

const mapStateToProps = (state, { params }) => {
  return {
    isLoggedIn: state.auth.user.isLoggedIn,
    errorMessage: state.auth.error.FBAuth,
    isLoading: state.auth.isLoading,
  };
};

export default connect(
  mapStateToProps
)(AuthMain)