import React from 'react'
import { TouchableHighlight, View, Text } from 'react-native'
import { Field, reduxForm } from 'redux-form'

import styles from 'BetBash/src/assets/styles/main'
import * as duration from 'BetBash/src/constants/animations'
import AwesomeButton from 'BetBash/src/components/general/awesome-button/AwesomeButton'
import TextFieldWithError from 'BetBash/src/components/general/md-textfield/TextFieldWithError'
import * as validator from 'BetBash/src/utils/inputValidator'
import btnStates from 'BetBash/src/components/general/awesome-button/buttonStates'

import { registerWithEmail } from 'BetBash/src/actions/auth.actions'

const validate = values => {
  let errors = {}

  errors = validator.email('email', values, errors)
  errors = validator.password('password', values, errors)

  return errors
}

const EmailRegisterForm = props => {
  const {
    handleSubmit,
    registerError,
    isLoading,
    loginSuccess,
  } = props

  const buttonState = (isLoading, loginSuccess, registerError) => {
    if (isLoading) return 'busy'
    if (loginSuccess) return 'success'
    if (registerError) return 'error'
    return 'idle'
  }

  return (
    <View style={[styles.box, styles.thinBox]}>

      <Field name="email" type="email" component={TextFieldWithError} label="Email" />
      <Field name="password" type="password" component={TextFieldWithError} label="Password" />

      <Text style={styles.errorText}>
        { registerError }
      </Text>

      <AwesomeButton
        backgroundStyle={styles.defaultButton}
        labelStyle={styles.defaultButtonText}
        transitionDuration={duration.halfBeat}
        states={
          btnStates(handleSubmit, 'Register', 'Registering', 'Registered!', 'Try again?')
        }
        buttonState={
          buttonState(isLoading, loginSuccess, registerError)
        }
      />

    </View>
  )
}

EmailRegisterForm = reduxForm({
  form: 'emailRegister',
  validate: validate,
  touchOnBlur: true,
  touchOnChange: false,
  onSubmit: (fields, dispatch) => {
    dispatch(registerWithEmail(
      fields.email,
      fields.password,
    ))
  },
})(EmailRegisterForm)

export default EmailRegisterForm