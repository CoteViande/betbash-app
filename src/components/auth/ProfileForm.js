import React from 'react'
import { TouchableHighlight, View, Text } from 'react-native'
import { Field, reduxForm } from 'redux-form'

import styles from 'BetBash/src/assets/styles/main'
import * as duration from 'BetBash/src/constants/animations'
import AwesomeButton from 'BetBash/src/components/general/awesome-button/AwesomeButton'
import TextFieldWithError from 'BetBash/src/components/general/md-textfield/TextFieldWithError'
import * as validator from 'BetBash/src/utils/inputValidator'
import btnStates from 'BetBash/src/components/general/awesome-button/buttonStates'

import { saveUserProfile } from 'BetBash/src/actions/auth.actions'

const validate = (values, props) => {
  let errors = {}
  errors = validator.notNull('firstName', values, errors)
  errors = validator.notNull('lastName', values, errors)
  return errors
}

const ProfileForm = (props) => {
  const { handleSubmit, name, sendError, isLoading, sendSuccess } = props;

  let buttonState = (isLoading, sendSuccess, sendError) => {
    if (isLoading) return 'busy'
    if (sendSuccess) return 'success'
    if (sendError) return 'error'
    return 'idle'
  }

  return (
    <View style={[ styles.box, styles.thinBox ]}>
      <Field
        name={ 'firstName' } type={ 'text' } component={ TextFieldWithError }
        label={ 'First name' } value={ name ? name.firstName : null }
      />
      <Field
        name={ 'lastName' } type={ 'text' } component={ TextFieldWithError }
        label={ 'Family name' } value={ name ? name.lastName : null }
      />

      <Text style={ styles.errorText }>
        { sendError }
      </Text>
      <AwesomeButton
        backgroundStyle={ styles.loginButtonBackground }
        labelStyle={ styles.loginButtonLabel }
        transitionDuration={ duration.halfBeat }
        states={
          btnStates(
            handleSubmit,
            'Complete registration',
            'Completing...',
            'Completed!',
            'Error. Try again?'
          )
        }
        buttonState={ buttonState(isLoading, sendSuccess, sendError) }
      />
    </View>
  )
}

ProfileForm = reduxForm({
  form: 'profile',
  validate: validate,
  touchOnBlur: true,
  touchOnChange: false,
  onSubmit: (fields, dispatch) => {
    dispatch(
      saveUserProfile(fields.firstName, fields.lastName)
    )
  }
})(ProfileForm)

export default ProfileForm