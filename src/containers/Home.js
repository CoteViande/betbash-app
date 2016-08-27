import { connect } from 'react-redux';
import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';

let Home = React.createClass({
  render() {
    return(
      <View style={ {flex: 1,
      justifyContent: 'center',
      alignItems: 'center',} }>
        <Text>
          Home Landing
        </Text>
      </View>
    );
  }
});

export default connect()(Home);