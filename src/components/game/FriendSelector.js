import React from 'react'
import {
  View,
  Text,
  Share,
  Button,
} from 'react-native'

import styles from 'BetBash/src/assets/styles/main'
import BBButton from 'BetBash/src/components/general/BBButton'

class FriendSelector extends React.Component {
  componentWillMount() {
    this.state = { searchingForFriends: false }
  }

  render() {
    const shareMessage = async () => {
      try {
        const result = await Share.share({
          message: 'React Native | A framework for building native apps using React',
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
          title: 'React Native',
        }, {
          dialogTitle: 'Share React Native website',
          excludedActivityTypes: [
            'com.apple.UIKit.activity.PostToTwitter',
          ],
          tintColor: 'green',
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
          console.log(`shared with an activityType: ${result.activityType}`)
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
        <BBButton
          text="Search on BetBash"
          onPress={() => this.setState({ searchingForFriends: true })}
        />
        <Text style={styles.defaultText}>
          OR
        </Text>
        <BBButton
          text="Send them a secret code"
          onPress={() => shareMessage()}
        />

      </View>
    )
  }
}

export default FriendSelector