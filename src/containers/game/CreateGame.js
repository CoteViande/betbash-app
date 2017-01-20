import React from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  Picker,
} from 'react-native'

import styles from 'BetBash/src/assets/styles/main'

const Item = Picker.Item

class CreateGame extends React.Component {
  componentWillMount() {
    this.state = { competition: '' }
  }

  // Check for proper dimensions: https://material.io/guidelines/components/text-fields.html
  render() {
    return (
      <View style={styles.navBarContainer}>
        <View style={[styles.box, styles.thinBox]}>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: '#E0E0E0',
              marginTop: 16,
              marginBottom: 8,
            }}
          >
            <Text style={{ fontSize: 12 }}>
              Choose a competition
            </Text>
            <Picker
              style={{ alignSelf: 'stretch', height: 32, color: '#E0E0E0' }}
              selectedValue={this.state.competition}
              onValueChange={competition => this.setState({ competition })}
              prompt={'Choose your competition!'}
              mode={'dialog'}
            >
              <Item label="Premier League - Football" value="FOOTBALL.PREMIER_LEAGUE" />
              <Item label="Ligue 1 - Football" value="FOOTBALL.LIGUE_1" />
              <Item label="NBA - Basketball" value="BASKETBALL.NBA" />
            </Picker>
          </View>
          <Text style={styles.defaultText}>
            Invite your friends!
          </Text>
          <Text style={styles.defaultText}>
            Search on BetBash
          </Text>
          <Text style={styles.defaultText}>
            OR
          </Text>
          <Text style={styles.defaultText}>
            Send them a BetBashCode
          </Text>
        </View>
      </View>
    )
  }
}

export default connect()(CreateGame)