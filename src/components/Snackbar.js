import React, { PropTypes } from 'react'
import { StyleSheet, Text, View, Animated } from 'react-native'

class Snackbar extends React.Component {
  static propTypes = {
    isSnack: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
  }
  static defaultProps = {
    isSnack: false,
  }

  constructor(props) {
    super(props);
    this.state = {
      transformY: new Animated.Value(-100),
    };
  }

  componentDidMount() {
    Animated.timing(          // Uses easing functions
      this.state.transformY,    // The value to drive
      {toValue: 0}            // Configuration
    ).start();                // Don't forget start!
  }

  render() {
    const { isSnack, text } = this.props

    if (isSnack) {
      return (
        <Animated.View style={{ flex: 1, backgroundColor: color.grey850, padding: 24, position: 'absolute', bottom: 0 }}>
          <Text style={{ color: color.red500 }}>
            Your device appears to be disconnected from the internet. AND { text }
          </Text>
        </Animated.View>
      )
    }
    return null
  }
}

export default Snackbar