import React from 'react'
import { View, Text } from 'react-native'
import TextField from './TextField'

import styles from 'BetBash/src/assets/styles/main'
import * as color from 'BetBash/src/assets/styles/colors.settings'

const TextFieldWithError = ({ input, meta: { touched, error }, label, type }) => {
  let keyboardType = 'default'
  if (type === 'email') {
    keyboardType = 'email-address'
  }
  const secureTextEntry = type === 'password'

  return (
    <View>
      <TextField
        label={label}
        highlightColor={color.green500}
        dense={false}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        autoGrow={false}
        multiline={false}
        keepHightlightColor={false}
        inputError={touched && Boolean(error)}
        errorColor={color.redA700}
        {...input}
      />
      <Text style={styles.textInputError}>
        { touched && error }
      </Text>
    </View>
  )
}

export default TextFieldWithError