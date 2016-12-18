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
    this._translateY = this.props.isSnack ? new Animated.Value(0) : new Animated.Value(100)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isSnack !== nextProps.isSnack) {
      let nextTranslateYValue = nextProps.isSnack ? 0 : 100

      Animated.timing(this._translateY, {
        toValue: nextTranslateYValue,
        duration: duration.oneBeat,
      }).start()
    }
  }

  render() {
    const { snackMessage } = this.props

    return (
      <Animated.View style={[
        styles.snackbarContainer,
        { transform: [{ translateY: this._translateY }] }
      ]}>
        <Text style={ styles.snackbarMessage }>
          { snackMessage }
        </Text>
      </Animated.View>
    )
  }
}

export default Snackbar