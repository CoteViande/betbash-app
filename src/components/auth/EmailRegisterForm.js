import React from 'react'
import { TouchableHighlight, View, Text } from 'react-native'
import { Field, reduxForm } from 'redux-form'

import styles from 'BetBash/src/assets/styles/main'
import AwesomeButton from 'BetBash/src/components/general/awesome-button/AwesomeButton'
import TextFieldWithError from 'BetBash/src/components/general/md-textfield/TextFieldWithError'
import * as validator from 'BetBash/src/utils/inputValidator'
import btnStates from 'BetBash/src/components/general/awesome-button/buttonStates'

import { registerWithEmail } from 'BetBash/src/actions/authActions'

const validate = (values, props) => {
  let errors = {}

  errors = validator.email('email', values, errors)
  errors = validator.password('password', values, errors)

  return errors
}

const EmailRegisterForm = (props) => {
  const { handleSubmit, registerError, isLoading, loginSuccess } = props;

  let buttonState = (isLoading, loginSuccess, registerError) => {
    if (isLoading) { return 'busy' }
    if (loginSuccess) { return 'success' }
    if (registerError) { return 'error' }
    return 'idle'
  }

  return (
    <View>

      <View>
        <Field name="email" type="email" component={TextFieldWithError} label="Email" />
        <Field name="password" type="password" component={TextFieldWithError} label="Password" />
      </View>

      <View>
        <Text style={styles.textError}>
          { registerError }
        </Text>
      </View>

      <View>
        <AwesomeButton
          backgroundStyle={ styles.loginButtonBackground }
          labelStyle={ styles.loginButtonLabel }
          transitionDuration={ 200 }
          states={
            btnStates(handleSubmit, 'Register', 'Registering', 'Registered!', 'Try again?')
          }
          buttonState={
            buttonState(isLoading, loginSuccess, registerError)
          }
        />
      </View>

    </View>
  );
}

// Decorate the form component
EmailRegisterForm = reduxForm({
  form: 'emailRegister',
  validate: validate,
  touchOnBlur: true,
  touchOnChange: false,
  onSubmit: (fields, dispatch) => {
    dispatch(registerWithEmail(
      fields.email,
      fields.password
    ))
  }
})(EmailRegisterForm);

export default EmailRegisterForm;