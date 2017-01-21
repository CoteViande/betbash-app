import React from 'react'
import { Text, View } from 'react-native'

import * as color from 'BetBash/src/assets/styles/colors.settings'

class TabIcon extends React.Component {
  render(){
    var textColor = this.props.selected ? color.white : color.grey800;
    var bottomWidth = this.props.selected ? 3 : 0;

    return (
      <View style={{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
        borderBottomWidth: bottomWidth,
        borderBottomColor: color.white,
        paddingTop: 15,
      }}>
        <Text style={{
          color: textColor,
          fontWeight: 'bold',
          fontSize: 13 }}>
          { this.props.title.toUpperCase() }
        </Text>
      </View>
    );
  }
}

export default TabIcon;