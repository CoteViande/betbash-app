import React from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'

import styles from 'BetBash/src/assets/styles/main'
import BetBashActionButton from 'BetBash/src/components/general/ActionButton'
import BBButton from 'BetBash/src/components/general/BBButton'

class Home extends React.Component {
  static navigationOptions = {
    tabBar: {
      label: 'Home',
    },
  }

  render() {
    const { navigate } = this.props.navigation
    const goToGameCreation = () => navigate('GameCreate')

    return (
      <View
        style={{ flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={styles.defaultText}>
          { 'Welcome to BetBash' }
        </Text>
        <View style={styles.topSpacerContainer}>
          <BBButton
            text="TEST ZONE"
            onPress={goToGameCreation}
            iconName="fingerprint"
          />
        </View>
        <BetBashActionButton
          navigate={navigate}
        />
      </View>
    )
  }
}

export default Home