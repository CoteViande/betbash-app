import React from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  TextInput,
  ListView,
} from 'react-native'

import styles from 'BetBash/src/assets/styles/main'
import * as color from 'BetBash/src/assets/styles/colors.settings'
import Divider from 'BetBash/src/components/general/Divider'
import BBPicker from 'BetBash/src/components/general/BBPicker'
import FriendSelector from 'BetBash/src/components/game/FriendSelector'

class CreateGame extends React.Component {
  componentWillMount() {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      competition: '',
      dataSource: ds.cloneWithRows(['row 1', 'row 2']),
    }
  }

  render() {
    return (
      <View style={styles.navBarContainer}>
        <View style={{ position: 'absolute', top: 56, left: 0, right: 0, bottom: 0, zIndex: 10, backgroundColor: 'white' }}>
          <View style={{ backgroundColor: color.white, paddingLeft: 16, paddingRight: 16 }}>
            <TextInput
              multiline={true}
              underlineColorAndroid="transparent"
              placeholder="Enter your friend's name"
              placeholderTextColor={color.blackThree}
              style={{ height: 56, fontSize: 16 }}
            />
          </View>
          <Divider />
          <ListView
            dataSource={this.state.dataSource}
            renderRow={rowData => <Text>{rowData}</Text>}
          />
        </View>
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