import React from 'react'
import { View, Text, TouchableHighlight } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import styles from 'BetBash/src/assets/styles/main'

class BBButton extends React.Component {
  render() {
    const {
      text, onPress, iconName,
      buttonStyle, textStyle, iconStyle,
      upperCase,
    } = this.props

    const renderButtonContent = () => {
      const textContent = (
        <Text style={textStyle}>
          {upperCase ? text.toUpperCase() : text}
        </Text>
      )
      if (iconName) {
        return (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Icon
              name={iconName}
              style={iconStyle}
            />
            {textContent}
          </View>
        )
      } else {
        return textContent
      }
    }

    return (
      <TouchableHighlight onPress={onPress}>
        <View style={buttonStyle}>
          {renderButtonContent()}
        </View>
      </TouchableHighlight>
    )
  }
}

BBButton.propTypes = {
  text: React.PropTypes.string.isRequired,
  onPress: React.PropTypes.func,
  buttonStyle: React.PropTypes.any,
  textStyle: React.PropTypes.any,
  upperCase: React.PropTypes.bool,
  iconName: React.PropTypes.string,
  iconStyle: React.PropTypes.any,
}

BBButton.defaultProps = {
  onPress: () => {},
  buttonStyle: styles.defaultButton,
  textStyle: styles.defaultButtonText,
  upperCase: true,
  iconName: null,
  iconStyle: styles.defaultButtonIcon,
}

export default BBButton