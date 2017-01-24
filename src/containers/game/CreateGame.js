import React from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'

import styles from 'BetBash/src/assets/styles/main'
import BBPicker from 'BetBash/src/components/general/BBPicker'
import FriendSelector from 'BetBash/src/components/game/FriendSelector'

import { updateFriendSuggestions } from 'BetBash/src/actions/friendSelector.actions'

class CreateGame extends React.Component {
  componentWillMount() {
    this.state = {
      competition: '',
    }
  }

  render() {
    const {
      usersList,
      updateFriendSuggestions,
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
            onSuggestionTextChange={searchString => updateFriendSuggestions(searchString)}
          />
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  usersList: state.friendSuggestions.suggestions.users,
})

const mapDispatchToProps = {
  updateFriendSuggestions,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateGame)