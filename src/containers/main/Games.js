import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { connect } from 'react-redux'

let Home = React.createClass({
  render() {
    return(
      <View style={ {flex: 1,
      justifyContent: 'center',
      alignItems: 'center',} }>
        <Text>
          Games
        </Text>
      </View>
    );
  }
});

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Home);