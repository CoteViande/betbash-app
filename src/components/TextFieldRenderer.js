import React from 'react'
import { View, Text } from 'react-native'
import TextField from '../utils/md-textfield/TextField'

import styles from '../../assets/styles/main'

const TextFieldWithError = ({ input, meta: { touched, error }, label, type }) => {
  let keyboardType = 'default';
  if (type === 'email') {
    keyboardType = 'email-address';
  }
  let secureTextEntry = type === 'password';

  return (
  <View>
    <TextField
      label={label}
      highlightColor={'#1155DD'}
      dense={false}
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
      autoGrow={false}
      multiline={false}
      keepHightlightColor={false}
      inputError={touched && Boolean(error)}
      {...input}
    />
    <Text style={styles.textError}>
      { touched && error }
    </Text>
  </View>
)};

export default TextFieldWithError