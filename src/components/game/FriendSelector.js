import React from 'react'
import {
  View, Text, TouchableOpacity,
  Modal, ScrollView, Share,
  TextInput, ActivityIndicator,
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
      suggestions: [],
    }
  }

  render() {
    const {
      suggestionsList,
      isSuggestionsListLoading,
      onSuggestionTextChange,
      onItemAdd,
      onItemRemove,
    } = this.props

    // TODO separate file for sharing
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
          console.log('shared without an activityType')
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('dismissed')
      }
    }

    const renderFriendsInInput = suggestions => suggestions.map(renderFriendInInput)
    const renderFriendInInput = suggestion => (
      <View key={suggestion.userId} style={styles.selectedFriendContainer}>
        <View style={styles.selectedFriendTextContainer}>
          <Text style={styles.selectedFriendText}>
            {suggestion.full_name}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            const suggestions = this.state.suggestions
            this.setState({ suggestions: suggestions.filter(
              item => item !== suggestion,
            ) })
            onItemRemove(suggestion)
          }}
        >
          <Icon name="close" style={styles.smallCloseIcon} />
        </TouchableOpacity>
      </View>
    )

    const renderFriendRow = suggestion => (
      <TouchableOpacity
        key={suggestion.userId}
        onPress={() => {
          if (this.state.suggestions.includes(suggestion)) return

          this.setState({
            suggestions: [
              ...this.state.suggestions,
              suggestion,
            ],
            searchString: '',
          })
          onItemAdd(suggestion)
        }}
      >
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
            text="Search BetBash"
            onPress={() => this.setState({ isModalVisible: true })}
          />
        </View>
        <View style={styles.selectorWrapper}>
          <Text style={styles.selectorLabel}>
            Give friends a secret code so they can join later
          </Text>
          <BBButton
            text="Send secret code"
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
          <View style={styles.friendSelectorTopBar}>
            <View style={styles.selectedFriendsContainer}>
              {renderFriendsInInput(this.state.suggestions)}
            </View>
            <View style={styles.friendSelectorInputContainer}>
              <TextInput
                ref={c => {
                  this.addFriendInput = c
                }}
                multiline={true}
                underlineColorAndroid="transparent"
                placeholder="Enter friend's name"
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
          </View>
          <ScrollView
            keyboardDismissMode="on-drag"
            keyboardShouldPersistTaps="always"
          >
            {
              suggestionsList.length
                ? suggestionsList.map(renderFriendRow)
                : this.state.searchString.length
                  ? isSuggestionsListLoading
                    ? (<ActivityIndicator style={{ margin: 32 }} />)
                    : (<View style={[styles.box, styles.thinBox]}>
                      <Text style={{ paddingBottom: 12 }}>
                        No result match your search, share a secret code with your friend
                      </Text>
                      <BBButton
                        text="Send secret code"
                        onPress={shareMessage}
                      />
                    </View>)
                  : null
            }
          </ScrollView>
        </Modal>
      </View>
    )
  }
}

export default FriendSelector