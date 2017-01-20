import React, { Component, PropTypes } from 'react'
import { View, TextInput } from 'react-native'

import Underline from './Underline'
import FloatingLabel from './FloatingLabel'
import styles from 'BetBash/src/assets/styles/main'

export default class TextField extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      isFocused: false,
      text: props.value,
      height: props.height,
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.text !== undefined && this.props.text != nextProps.value) {
      nextProps.value.length !== 0 ? this.refs.floatingLabel.floatLabel() : this.refs.floatingLabel.sinkLabel()
      this.setState({ text: nextProps.value })
    }
    if (this.props.height !== nextProps.height) {
      this.setState({ height: nextProps.height })
    }
  }
  focus() {
    this.refs.input.focus()
  }

  measureLayout(...args) {
  	this.refs.wrapper.measureLayout(...args)
  }

  render() {
    const {
      label,
      highlightColor,
      duration,
      labelColor,
      borderColor,
      onFocus,
      onBlur,
      onChange,
      value,
      dense,
      multiline,
      autoGrow,
      labelFontFamily,
      keepHightlightColor,
      inputError,
      errorColor,
      ...props
    } = this.props
    return (
      <View style={dense ? styles.denseTextInputWrapper : styles.textInputWrapper} ref="wrapper">
        <TextInput
          style={[
            dense ? styles.denseTextInput : styles.textInput,
            this.state.height ? { height: this.state.height } : {}
          ]}
          multiline={this.props.multiline}
          onFocus={() => {
            this.setState({ isFocused: true })
            this.refs.floatingLabel.floatLabel()
            this.refs.underline.expandLine()
            onFocus && onFocus()
          }}
          onBlur={() => {
            this.setState({ isFocused: false })
            !this.state.text.length && this.refs.floatingLabel.sinkLabel()
            this.refs.underline.shrinkLine()
            onBlur && onBlur()
          }}
          onChange={event => {
            if (autoGrow) {
              this.setState({ text: event.nativeEvent.text, height: event.nativeEvent.contentSize.height })
            } else {
              this.setState({ text: event.nativeEvent.text })
            }
            onChange && onChange(event)
          }}
          ref="input"
          value={this.state.text}
          {...props}
        />
        <Underline
          ref="underline"
          highlightColor={highlightColor}
          duration={duration}
          borderColor={borderColor}
          inputError={inputError}
          errorColor={errorColor}
        />
        <FloatingLabel
          isFocused={this.state.isFocused}
          ref="floatingLabel"
          focusHandler={this.focus.bind(this)}
          label={label}
          labelColor={labelColor}
          highlightColor={highlightColor}
          duration={duration}
          dense={dense}
          keepHightlightColor={keepHightlightColor}
          labelFontFamily={labelFontFamily}
          hasValue={!!(this.state.text.length)}
        />
      </View>
    )
  }
}

TextField.propTypes = {
  duration: PropTypes.number,
  label: PropTypes.string,
  highlightColor: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  value: PropTypes.string,
  dense: PropTypes.bool,
  multiline: PropTypes.bool,
  autoGrow: PropTypes.bool,
  keepHightlightColor: PropTypes.bool,
  inputError: PropTypes.bool,
  errorColor: PropTypes.string,
}

TextField.defaultProps = {
  duration: 200,
  labelColor: '#9E9E9E',
  borderColor: '#E0E0E0',
  value: '',
  dense: false,
  underlineColorAndroid: 'rgba(0,0,0,0)',
  multiline: false,
  autoGrow: false,
  keepHightlightColor: false,
  inputError: false,
  errorColor: 'red',
}