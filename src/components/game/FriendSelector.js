import React from 'react'
import {
  View, Text, Share,
  Modal, ScrollView, TouchableOpacity,
  TextInput,
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import styles from 'BetBash/src/assets/styles/main'
import * as color from 'BetBash/src/assets/styles/colors.settings'
import BBButton from 'BetBash/src/components/general/BBButton'

class FriendSelector extends React.Component {
  componentWillMount() {
    this.state = {
      isModalVisible: false,
      searchString: '',
    }
  }

  render() {
    const {
      suggestionsList,
      onSuggestionTextChange,
    } = this.props

    const shareMessage = async () => {
      try {
        const result = await Share.share({
          message: 'React Native | A framework for building native apps using React',
        }) // IOS: can add url, title, and dialog color
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

    const renderFriendRow = suggestion => (
      <TouchableOpacity key={suggestion.userId} onPress={() => {}}>
        <View style={styles.friendSuggestionRow}>
          <View style={styles.friendSuggestionCircle}>
            <Text style={styles.friendSuggestionInitials}>
              VA
            </Text>
          </View>
          <View style={styles.friendSuggestionTextContainer}>
            <Text style={styles.friendSuggestionText}>
              {suggestion.full_name}
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
              onChangeText={text => {
                onSuggestionTextChange(text)
                this.setState({ searchString: text })
              }}
              onFocus={() => onSuggestionTextChange(this.state.searchString)}
              value={this.state.searchString}
            />
            <TouchableOpacity
              onPress={() => {
                this.setState({ isModalVisible: false })
              }}
            >
              <Icon name="done" style={styles.greenRoundIcon} />
            </TouchableOpacity>
          </View>
          <ScrollView
            keyboardDismissMode="on-drag"
            keyboardShouldPersistTaps="always"
          >
            {suggestionsList.map(renderFriendRow)}
          </ScrollView>
        </Modal>
      </View>
    )
  }
}

export default FriendSelector