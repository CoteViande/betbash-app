import React from 'react'
import { connect } from 'react-redux'
import { Text, View } from 'react-native'
import AwesomeButton from 'BetBash/src/components/general/awesome-button/AwesomeButton'

import styles from 'BetBash/src/assets/styles/main'
import btnStates from 'BetBash/src/components/general/awesome-button/buttonStates'
import { logoutFromApp } from 'BetBash/src/actions/auth.actions'

class Profile extends React.Component {
  render() {
    const { logoutFromApp, isLoading, error, success } = this.props
    const buttonState = (isLoading, success, error) => {
      if (success) return 'success'
      if (error) return 'error'
      if (isLoading) return 'busy'
      return 'idle'
    }

    return (
      <View style={styles.navBarContainer}>
        <View style={styles.box}>
          <AwesomeButton
            backgroundStyle={styles.loginButtonBackground}
            labelStyle={styles.loginButtonLabel}
            transitionDuration={200}
            states={btnStates(
              () => {
                logoutFromApp()
              },
              'Log me out!',
              'Logging out...',
              'Logged out!',
              'Log me out I said!',
            )}
            buttonState={buttonState(isLoading, success, error)}
          />
          <Text style={styles.defaultText}>
            { error }
          </Text>
        </View>

      </View>
    )
  }
}

const mapStateToProps = state => ({
  success: !state.auth.user.isLoggedIn,
  isLoading: state.auth.isLoading,
  error: state.auth.error.logout,
})

export default connect(
  mapStateToProps,
  { logoutFromApp },
)(Profile)