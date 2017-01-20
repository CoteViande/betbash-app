import React, { Component, PropTypes } from 'react'
import { StyleSheet, Animated } from 'react-native'

import styles from 'BetBash/src/assets/styles/main'

export default class FloatingLabel extends Component {
  constructor(props) {
    super(props)
    if (props.dense) {
      this.posTop = 12
      this.posBottom = 32
      this.fontLarge = 13
      this.fontSmall = 13
    } else {
      this.posTop = 16
      this.posBottom = 37
      this.fontLarge = 16
      this.fontSmall = 12
    }
    const posTop = (props.hasValue) ? this.posTop : this.posBottom
    const fontSize = (props.hasValue) ? this.fontSmall : this.fontLarge
    this.state = {
      top: new Animated.Value(posTop),
      fontSize: new Animated.Value(fontSize),
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.hasValue === nextProps.hasValue
  }
  floatLabel() {
    Animated.parallel([
      Animated.timing(this.state.top, {
        toValue: this.posTop,
        duration: this.props.duration,
      }),
      Animated.timing(this.state.fontSize, {
        toValue: this.fontSmall,
        duration: this.props.duration,
      }),
    ]).start()
  }
  sinkLabel() {
    Animated.parallel([
      Animated.timing(this.state.top, {
        toValue: this.posBottom,
        duration: this.props.duration,
      }),
      Animated.timing(this.state.fontSize, {
        toValue: this.fontLarge,
        duration: this.props.duration,
      }),
    ]).start()
  }
  render() {
    const {
			label,
			labelColor,
			highlightColor,
      labelFontFamily,
      keepHightlightColor,
		} = this.props
    return (
      <Animated.Text
        style={[
          keepHightlightColor ? { color: highlightColor } : { color: labelColor },
          {
            fontSize: this.state.fontSize,
            top: this.state.top,
          },
          styles.textInputLabel,
          this.props.isFocused && { color: highlightColor },
        ]}
        onPress={() => {
          this.props.focusHandler()
        }}
      >
        {label}
      </Animated.Text>
    )
  }
}

FloatingLabel.propTypes = {
  duration: PropTypes.number,
  label: PropTypes.string,
  labelColor: PropTypes.string,
  highlightColor: PropTypes.string,
  dense: PropTypes.bool,
  labelFontFamily: PropTypes.string,
  keepHightlightColor: PropTypes.bool,
}
