import React from 'react'
import { connect } from 'react-redux'
import SplashScreen from 'react-native-splash-screen'

class BBSplashScreen extends React.Component {
  componentDidMount() {
    SplashScreen.hide()
  }
  render() {
    return null
  }
}

export default connect()(BBSplashScreen)