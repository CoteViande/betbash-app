import React from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
} from 'react-native'

import styles from 'BetBash/src/assets/styles/main'
import BBPicker from 'BetBash/src/components/general/BBPicker'
import FriendSelector from 'BetBash/src/components/game/FriendSelector'

class CreateGame extends React.Component {
  componentWillMount() {
    this.state = { competition: '' }
  }

  render() {
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
          <FriendSelector />
        </View>
      </View>
    )
  }
}

export default connect()(CreateGame)