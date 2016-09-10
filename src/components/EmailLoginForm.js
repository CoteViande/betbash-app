"use strict"
import React from 'react'
import { TouchableHighlight, View, Text } from 'react-native'
import { Field, reduxForm } from 'redux-form'

import styles from '../../assets/styles/main'
import TextField from '../utils/md-textfield/TextField';
import * as validator from '../utils/inputValidator'

const validate = (values, props) => {
  let errors = {};

  errors = validator.email('email', values, errors)
  errors = validator.password('password', values, errors)

  return errors
}

const renderTextField = ({ input, meta: { touched, error }, label, type }) => {
  let keyboardType = 'default';
  if (type === 'email') {
    keyboardType = 'email-address';
  }
  let secureTextEntry = type === 'password';

  return (
  <View>
    <TextField
      label={label}
      highlightColor={'blue'}
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

const EmailLoginForm = (props) => {
  const { handleSubmit, } = props;

  return (
    <View style={{padding: 20, paddingTop: 60}}>
      <Field name="email" type="email" component={renderTextField} label="Email" />
      <Field name="password" type="password" component={renderTextField} label="Password" />
      <TouchableHighlight onPress={handleSubmit} style={styles.fullWidthButtton}>
        <Text style={styles.fullWidthButttonText}>
          {"Let's log in"}
        </Text>
      </TouchableHighlight>
    </View>
  );
}

// Decorate the form component
EmailLoginForm = reduxForm({
  form: 'emailLogin',
  validate: validate,
  touchOnBlur: true,
  touchOnChange: false,
  onSubmit: () => {
    console.warn('sent')
  }
})(EmailLoginForm);

export default EmailLoginForm;