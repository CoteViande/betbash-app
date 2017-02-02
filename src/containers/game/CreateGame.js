import React from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'

import styles from 'BetBash/src/assets/styles/main'
import BBPicker from 'BetBash/src/components/general/BBPicker'
import FriendSelector from 'BetBash/src/components/game/FriendSelector'

import { updateFriendSuggestions } from 'BetBash/src/actions/friendSelector.actions'

class CreateGame extends React.Component {
  static navigationOptions = {
    title: 'Create a game',
    header: {
      visible: true,
    },
  }

  componentWillMount() {
    this.state = {
      competition: '',
      friends: [],
    }
  }

  render() {
    const {
      usersList,
      updateFriendSuggestions,
      isUsersListLoading,
    } = this.props

    return (
      <View style={styles.navBarContainer}>
        <View style={[styles.box, styles.thinBox]}>
          <BBPicker
            label="Choose a competition"
            selectedValue={this.state.competition}
            onValueChange={competition => this.setState({ competition })}
            modalLabel={'Choose your competition!'}
            values={[
              { title: 'Premier League - Football', id: 'FOOTBALL.PREMIER_LEAGUE' },
              { title: 'Ligue 1 - Football', id: 'FOOTBALL.LIGUE_1' },
              { title: 'NBA - Basketball', id: 'BASKETBALL.NBA' },
            ]}
          />
          <FriendSelector
            suggestionsList={usersList}
            isSuggestionsListLoading={isUsersListLoading}
            onSuggestionTextChange={searchString => updateFriendSuggestions(searchString)}
            onItemAdd={friend => this.setState({ friends: [
              ...this.state.friends,
              friend,
            ] })}
            onItemRemove={friendToRemove => {
              const friends = this.state.friends
              this.setState({ friends: friends.filter(
                friend => friend !== friendToRemove,
              ) })
            }}
          />
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  usersList: state.friendSuggestions.suggestions.users,
  isUsersListLoading: state.friendSuggestions.isLoading,
})

const mapDispatchToProps = {
  updateFriendSuggestions,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateGame)