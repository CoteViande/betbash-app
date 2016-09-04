import React from 'react'
import { Text, View, Image } from 'react-native'

import styles from '../../assets/styles/main'

const LoadingPage = React.createClass({
  render: function() {
    return (
      <View style={ styles.container }>
        <Text>
          Loading...
        </Text>
      </View>
    );
  }
});

export default LoadingPage