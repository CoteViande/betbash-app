"use strict"
import React from 'react'
import { TouchableHighlight, View, Text } from 'react-native'
import AwesomeButton from 'react-native-awesome-button'
import { Field, reduxForm } from 'redux-form'

import styles from '../../assets/styles/main'
import TextField from '../utils/md-textfield/TextField'
import * as validator from '../utils/inputValidator'
import { loginWithEmail } from '../actions/authActions'

const validate = (values, props) => {
  let errors = {}

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
  const { handleSubmit, loginError, isLoading, loginSuccess } = props;
  let buttonState = (isLoading, loginSuccess) => {
    if (isLoading) { return 'busy' }
    if (loginSuccess) { return 'success' }
    if (loginError) { return 'error' }
    return 'idle'
  }

  return (
    <View style={{padding: 20, paddingTop: 60}}>
      <Field name="email" type="email" component={renderTextField} label="Email" />
      <Field name="password" type="password" component={renderTextField} label="Password" />
      <View>
        <Text style={styles.textError}>
          { loginError }
        </Text>
      </View>
      <View style={styles.abContainer}>
        <AwesomeButton
          backgroundStyle={styles.loginButtonBackground}
          labelStyle={styles.loginButtonLabel}
          transitionDuration={200}
          states={{
            idle: {
              text: 'Log In',
              onPress: handleSubmit,
              backgroundColor: '#1155DD',
            },
            busy: {
              text: 'Logging In',
              backgroundColor: '#002299',
              spinner: true,
            },
            success: {
              text: 'Logged In',
              backgroundColor: '#339944'
            },
            error: {
              text: 'Try Again',
              onPress: handleSubmit,
              backgroundColor: '#000000'
            }
          }}
          buttonState={buttonState(isLoading, loginSuccess)}
        />
      </View>

    </View>
  );
}

// Decorate the form component
EmailLoginForm = reduxForm({
  form: 'emailLogin',
  validate: validate,
  touchOnBlur: true,
  touchOnChange: false,
  onSubmit: (fields, dispatch) => {
    dispatch(loginWithEmail(
      fields.email,
      fields.password
    ));
  }
})(EmailLoginForm);

export default EmailLoginForm;