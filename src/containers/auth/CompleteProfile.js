import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { connect } from 'react-redux'

import { logoutFromApp } from 'BetBash/src/actions/auth.actions'
import ProfileForm from 'BetBash/src/components/auth/ProfileForm'

import styles from 'BetBash/src/assets/styles/main'

const CompleteProfile = React.createClass({
  render() {
    const { name, isLoading, sendSuccess, sendError, logoutFromApp } = this.props

    const onCancelPress = () => logoutFromApp()

    return(
      <View style={ styles.navBarContainer }>
        <ProfileForm
          name={ name }
          isLoading={ isLoading }
          sendSuccess={ sendSuccess }
          sendError={ sendError }
        />
        <View style={ styles.bottomContainer }>
          <TouchableOpacity onPress={ onCancelPress }>
            <Text style={styles.defaultText}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
})

const mapStateToProps = state => ({
  name: state.auth.user.name,
  isLoading: state.auth.isLoading,
  sendSuccess: state.initialization.isUserProfileComplete,
  sendError: state.auth.error.saveProfile,
})

const mapDispatchToProps = { logoutFromApp }

export default connect(
  mapStateToProps, mapDispatchToProps
)(CompleteProfile)