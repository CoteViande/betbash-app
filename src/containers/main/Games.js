import React from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'

import styles from 'BetBash/src/assets/styles/main'

const Home = () => (
  <View
    style={{ flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Text style={styles.defaultText}>
      Games
    </Text>
  </View>
)

export default connect()(Home)