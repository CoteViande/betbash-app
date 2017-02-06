import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import styles from 'BetBash/src/assets/styles/main'

class BBButton extends React.Component {
  render() {
    const {
      text, onPress, iconName,
      buttonStyle, textStyle, iconStyle,
      upperCase, fullWidth,
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

    const renderButton = fullWidth => {
      if (fullWidth) {
        return (<TouchableOpacity onPress={onPress}>
          <View style={buttonStyle}>
            {renderButtonContent()}
          </View>
        </TouchableOpacity>)
      } else {
        return (<View style={{ alignItems: 'center' }}>
          <TouchableOpacity onPress={onPress}>
            <View style={buttonStyle}>
              {renderButtonContent()}
            </View>
          </TouchableOpacity>
        </View>)
      }
    }

    return renderButton(fullWidth)
  }
}

BBButton.propTypes = {
  text: React.PropTypes.string.isRequired,
  onPress: React.PropTypes.func,
  buttonStyle: React.PropTypes.any,
  textStyle: React.PropTypes.any,
  iconName: React.PropTypes.string,
  iconStyle: React.PropTypes.any,
  upperCase: React.PropTypes.bool,
  fullWidth: React.PropTypes.bool,
}

BBButton.defaultProps = {
  onPress: () => {},
  buttonStyle: styles.defaultButton,
  textStyle: styles.defaultButtonText,
  iconName: null,
  iconStyle: styles.defaultButtonIcon,
  upperCase: true,
  fullWidth: true,
}

export default BBButton