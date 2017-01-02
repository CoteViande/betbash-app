import React, { PropTypes } from 'react'
import { StyleSheet, Text, View, Animated, TouchableOpacity } from 'react-native'

import styles from '../../assets/styles/main'
import * as duration from '../../assets/constants/animations'

class Snackbar extends React.Component {
  static propTypes = {
    isSnack: PropTypes.bool.isRequired,
    snackMessage: PropTypes.string.isRequired,
    snackButtonText: PropTypes.string,
    onSnackButtonPress: PropTypes.func,
  }
  static defaultProps = {
    isSnack: false,
  }

  componentWillMount() {
    this._animState = this.props.isSnack ? new Animated.Value(0) : new Animated.Value(1)
    this.state = { isAnimationInProgress: false }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isSnack !== nextProps.isSnack) {
      let nextAnimState = nextProps.isSnack ? 0 : 1

      this.setState({ isAnimationInProgress: true })
      Animated.timing(this._animState, {
        toValue: nextAnimState,
        duration: duration.oneBeat,
      }).start(() => {
        this.setState({ isAnimationInProgress: false })
      })
    }
  }

  render() {
    const { isSnack, snackMessage, snackButtonText, onSnackButtonPress } = this.props

    if (!isSnack && !this.state.isAnimationInProgress) {
      return null
    }

    let button = null
    if (snackButtonText) {
      button = (
        <View style={styles.snackbarButtonContainer}>
          <TouchableOpacity onPress={onSnackButtonPress}>
            <Text style={styles.snackbarButton}>
              { snackButtonText.toUpperCase() }
            </Text>
          </TouchableOpacity>
        </View>
      )
    }

    let message = (
      <View style={styles.snackbarMessageContainer}>
        <Animated.Text style={[
          styles.snackbarMessage,
          { opacity: this._animState.interpolate({
            inputRange: [0,1],
            outputRange: [1,0],
          }) }
        ]}>
          { snackMessage }
        </Animated.Text>
      </View>
    )

    return (
      <Animated.View style={[
        styles.snackbarContainer,
        { transform: [{ translateY: this._animState.interpolate({
          inputRange: [0,1],
          outputRange: [0,100],
        }) }] }
      ]}>

        { message }
        { button }

      </Animated.View>
    )
  }
}

export default Snackbar