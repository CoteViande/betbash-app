import React from 'react'
import { Text, View, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'

import BetBashActionButton from 'BetBash/src/components/general/ActionButton'

const Home = () => {
  const goToGameCreation = () => Actions.CreateGame()

  return (
    <View
      style={{ flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>
        { 'Welcome to BetBash' }
      </Text>
      <TouchableHighlight onPress={goToGameCreation}>
        <View style={{ width: 150, height: 100, backgroundColor: 'red' }}>
          <Text style={{ margin: 30 }}>
            New Game!
          </Text>
        </View>
      </TouchableHighlight>
      <BetBashActionButton />
    </View>
  )
}

export default connect()(Home)