import React, { PropTypes } from 'react'
import { StyleSheet, Text, View, Animated } from 'react-native'

import styles from '../../assets/styles/main'
import * as duration from '../../assets/constants/animations'

class Snackbar extends React.Component {
  static propTypes = {
    isSnack: PropTypes.bool.isRequired,
    snackMessage: PropTypes.string.isRequired,
  }
  static defaultProps = {
    isSnack: false,
  }

  componentWillMount() {
    this._animState = this.props.isSnack ? new Animated.Value(0) : new Animated.Value(1)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isSnack !== nextProps.isSnack) {
      let nextAnimState = nextProps.isSnack ? 0 : 1

      Animated.timing(this._animState, {
        toValue: nextAnimState,
        duration: duration.oneBeat,
      }).start()
    }
  }

  render() {
    const { snackMessage } = this.props

    return (
      <Animated.View style={[
        styles.snackbarContainer,
        { transform: [{ translateY: this._animState.interpolate({
          inputRange: [0,1],
          outputRange: [0,100],
        }) }] }
      ]}>
        <Animated.Text style={[
          styles.snackbarMessage,
          { opacity: this._animState.interpolate({
            inputRange: [0,1],
            outputRange: [1,0],
          }) }
        ]}>
          { snackMessage }
        </Animated.Text>
      </Animated.View>
    )
  }
}

export default Snackbar