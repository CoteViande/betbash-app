import { connect } from 'react-redux';
import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';

let Profile = React.createClass({
  render() {
    return(
      <View style={
        {flex: 1,
        justifyContent: 'center',
        alignItems: 'center',}
      }>
        <Text>
          Profile Page
        </Text>
      </View>
    );
  }
});

export default connect()(Profile);