import React from 'react'
import {
  View,
  Text,
  Share,
  Button,
} from 'react-native'

import styles from 'BetBash/src/assets/styles/main'

class FriendSelector extends React.Component {
  render() {
    const shareMessage = async () => {
      try {
        const result = await Share.share({
          message: 'React Native | A framework for building native apps using React'
        })
        showResult(result)
      } catch (error) {
        console.log('FriendSelector / Share / Error: ', error)
      }
    }

    const shareText = async () => {
      try {
        const result = await Share.share({
          message: 'A framework for building native apps using React',
          url: 'http://facebook.github.io/react-native/',
          title: 'React Native'
        }, {
          dialogTitle: 'Share React Native website',
          excludedActivityTypes: [
            'com.apple.UIKit.activity.PostToTwitter'
          ],
          tintColor: 'green'
        })
        showResult(result)
      } catch (error) {
        console.log('FriendSelector / Share / Error: ', error)
      }
    }

    const showResult = result => {
      console.log(result)
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('shared with an activityType: ' + result.activityType)
        } else {
          console.log('shared')
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('dismissed')
      }
    }

    return (
      <View style={styles.selectorWrapper}>
        <Text style={styles.selectorLabel}>
          Add friends to your game
        </Text>
        <Text style={styles.defaultText}>
          Search on BetBash
        </Text>
        <Text style={styles.defaultText}>
          OR
        </Text>
        <Button title="Send them a secret code" onPress={() => shareMessage()} color="#841584" />
      </View>
    )
  }
}

export default FriendSelector