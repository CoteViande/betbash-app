import React from 'react'
import { TouchableHighlight, View, Text } from 'react-native'
import { Field, reduxForm } from 'redux-form'

import styles from 'BetBash/src/assets/styles/main'
import AwesomeButton from 'BetBash/src/components/general/awesome-button/AwesomeButton'
import TextFieldWithError from 'BetBash/src/components/general/md-textfield/TextFieldWithError'
import * as validator from 'BetBash/src/utils/inputValidator'
import btnStates from 'BetBash/src/components/general/awesome-button/buttonStates'

import { loginWithEmail } from 'BetBash/src/actions/authActions'

const validate = (values, props) => {
  let errors = {}

  errors = validator.email('email', values, errors)
  errors = validator.password('password', values, errors)

  return errors
}

const EmailLoginForm = (props) => {
  const { handleSubmit, loginError, isLoading, loginSuccess } = props;

  let buttonState = (isLoading, loginSuccess, loginError) => {
    if (isLoading) { return 'busy' }
    if (loginSuccess) { return 'success' }
    if (loginError) { return 'error' }
    return 'idle'
  }

  return (
    <View style={styles.navBarContainer}>

      <View style={styles.box}>
        <Field name="email" type="email" component={TextFieldWithError} label="Email" />
        <Field name="password" type="password" component={TextFieldWithError} label="Password" />

        <Text style={styles.textError}>
          { loginError }
        </Text>
        <AwesomeButton
          backgroundStyle={styles.loginButtonBackground}
          labelStyle={styles.loginButtonLabel}
          transitionDuration={200}
          states={btnStates(
            handleSubmit,
            'Log in',
            'Logging in...',
            'Logged in',
            'Error. Try logging in again?'
          )}
          buttonState={buttonState(isLoading, loginSuccess, loginError)}
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
    dispatch(loginWithEmail(fields.email, fields.password, false))
  }
})(EmailLoginForm);

export default EmailLoginForm;