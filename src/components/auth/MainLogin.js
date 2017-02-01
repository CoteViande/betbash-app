import React from 'react'
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native'

import styles from 'BetBash/src/assets/styles/main'
import FacebookLogin from 'BetBash/src/components/auth/FacebookLogin'

class MainLogin extends React.Component {
  render() {
    const goToEmailAuth = this.props.otherLoginPress

    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <FacebookLogin />
        </View>
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            onPress={goToEmailAuth}
          >
            <Text style={styles.instructions}>
              {'Don\'t have Facebook?'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export default MainLogin