import React from 'react'
import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'

class Home extends React.Component {
  componentWillMount() {
    this._flag = false
  }

  render() {
    const { isConnected } = this.props

    return(
      <View style={ {flex: 1,
      justifyContent: 'center',
      alignItems: 'center',} }>
        <Text>
          Home Landing
        </Text>
        <TouchableHighlight
        onPress={()=>{
          console.warn('Button!')
        }}>
          <View style={{width: 150, height: 100, backgroundColor: 'red'}}>
            <Text style={{margin: 30}}>Button</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isConnected: state.connexion.isConnected
  }
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Home);