import React from 'react'
import { Text, View, Image } from 'react-native'

import styles from '../../assets/styles/main'

const ErrorMessage = React.createClass({
  render: function() {
    const { message } = this.props;

    if ( message ) {
      return (
        <View style={ styles.topRedContainer }>
          <Text style={ styles.instructions }>
            { message }
          </Text>
        </View>
      );
    }

    return null;
  }
});

export default ErrorMessage