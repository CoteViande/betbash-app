import React from 'react'
import { connect } from 'react-redux'
import { Text, View, Image } from 'react-native'
import { Actions } from 'react-native-router-flux'

import styles from 'BetBash/src/assets/styles/main'
import * as color from 'BetBash/src/constants/colors'
import FacebookLogin from 'BetBash/src/components/auth/FacebookLogin'

const MainLogin = React.createClass({
  render: function() {
    const goToEmailAuth = () => Actions.RegisterEmail();

    return (
      <View style={ {flex: 1} }>
        <View style={ styles.container }>
          <FacebookLogin />
        </View>
        <View style={ styles.bottomContainer }>
          <Text style={ styles.instructions }
            onPress={ goToEmailAuth }>
            {'Don\'t have Facebook?'}
          </Text>
        </View>
      </View>
    );
  }
});

export default MainLogin