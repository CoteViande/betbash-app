import React from 'react'
import {
  View,
  Text,
  Picker,
} from 'react-native'

import styles from 'BetBash/src/assets/styles/main'

const Item = Picker.Item

class BBPicker extends React.Component {
  componentWillMount() {
    this.state = { selectedValue: '' }
  }

  // Check for proper dimensions: https://material.io/guidelines/components/text-fields.html
  render() {
    const {
      label,
      modalLabel,
      values,
      onValueChange,
      selectedValue,
    } = this.props

    return (
      <View style={styles.pickerWrapper}>
        <Text style={styles.pickerLabel}>
          {label}
        </Text>
        <Picker
          style={styles.picker}
          selectedValue={selectedValue}
          onValueChange={onValueChange}
          prompt={modalLabel}
          mode={'dialog'}
        >
          {values.map(value => (
            <Item
              label={value.title}
              value={value.id}
              key={value.id}
            />
          ))}
        </Picker>
      </View>
    )
  }
}

BBPicker.propTypes = {
  label: React.PropTypes.string.isRequired,
  modalLabel: React.PropTypes.string,
  values: React.PropTypes.any.isRequired,
  onValueChange: React.PropTypes.func,
  selectedValue: React.PropTypes.any.isRequired,
}

BBPicker.defaultProps = {
  modalLabel: null,
  onValueChange: selectedValue => this.setState({ selectedValue }),
}

export default BBPicker