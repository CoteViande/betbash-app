import React from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'

import styles from 'BetBash/src/assets/styles/main'

class Games extends React.Component {
  static navigationOptions = {
    tabBar: {
      label: 'Games',
    },
  }

  render() {
    return (
      <View style={styles.navBarContainer}>
        <Text style={styles.defaultText}>
          Games
        </Text>
      </View>
    )
  }
}

export default Games