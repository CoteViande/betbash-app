import React from 'react'
import {
  View,
  Text,
  Share,
  Modal,
  ListView,
  TouchableOpacity,
  TextInput,
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import styles from 'BetBash/src/assets/styles/main'
import * as color from 'BetBash/src/assets/styles/colors.settings'
import BBButton from 'BetBash/src/components/general/BBButton'

class FriendSelector extends React.Component {
  componentWillMount() {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      searchingForFriends: false,
      isModalVisible: false,
      dataSource: ds.cloneWithRows(['row 1', 'row 2', 'row 2', 'row 2', 'row 2', 'row 2', 'row 2', 'row 2', 'row 2', 'row 2', 'row 2', 'row 2', 'row 2']),
    }
  }

  render() {
    const shareMessage = async () => {
      try {
        const result = await Share.share({
          message: 'React Native | A framework for building native apps using React',
        })
        // IOS STUFF
        // const result = await Share.share({
        //   message: 'A framework for building native apps using React',
        //   url: 'http://facebook.github.io/react-native/',
        //   title: 'React Native',
        // }, {
        //   dialogTitle: 'Share React Native website',
        //   tintColor: 'green',
        // })
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

    const renderFriendRow = data => (
      <TouchableOpacity onPress={() => console.log('yo')}>
        <View style={styles.friendSuggestionRow}>
          <View style={styles.friendSuggestionCircle}>
            <Text style={styles.friendSuggestionInitials}>
              VA
            </Text>
          </View>
          <View style={styles.friendSuggestionTextContainer}>
            <Text style={styles.friendSuggestionText}>
              {data}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    )

    return (
      <View>
        <View style={styles.selectorWrapper}>
          <Text style={styles.selectorLabel}>
            Add friends to your game
          </Text>
          <BBButton
            text="Search on BetBash"
            onPress={() => this.setState({ isModalVisible: true })}
          />
          <Text style={styles.defaultText}>
            OR
          </Text>
          <BBButton
            text="Send them a secret code"
            onPress={shareMessage}
          />
        </View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.isModalVisible}
          onShow={() => {
            this.addFriendInput.focus()
          }}
          onRequestClose={() => {
            this.setState({ isModalVisible: false })
          }}
        >
          <View style={styles.friendSelectorInputContainer}>
            <TextInput
              ref={c => {
                this.addFriendInput = c
              }}
              multiline={true}
              underlineColorAndroid="transparent"
              placeholder="Enter your friend's name"
              placeholderTextColor={color.whiteThree}
              style={styles.friendSelectorInputText}
              onChangeText={userInput => {
                console.log(userInput)
              }}
            />
            <TouchableOpacity
              onPress={() => {
                this.setState({ isModalVisible: false })
              }}
            >
              <Icon name="done" style={styles.greenRoundIcon} />
            </TouchableOpacity>
          </View>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={renderFriendRow}
          />
        </Modal>
      </View>
    )
  }
}

export default FriendSelector