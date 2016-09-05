import React from 'react'
import { TouchableHighlight, View, Text, TextInput } from 'react-native'
import { Field, reduxForm } from 'redux-form'

import styles from '../../assets/styles/main'
import validator from '../utils/inputValidator'

const validate = values => {
  console.log('YOOO', values);
  const errors = {}
  if (!values.username) {
    errors.username = 'Required'
  } else if (values.username.length > 15) {
    errors.username = 'Must be 15 characters or less'
  }
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (!values.age) {
    errors.age = 'Required'
  } else if (isNaN(Number(values.age))) {
    errors.age = 'Must be a number'
  } else if (Number(values.age) < 18) {
    errors.age = 'Sorry, you must be at least 18 years old'
  }
  return errors
}

const EmailLoginForm = React.createClass({
  render: function() {
    const { handleSubmit } = this.props;

    return (
      <View style={ styles.leftAlignContainer }>
        <Field name="email" component={ TextInput } style={{}} placeholder="Email" />
        <Field name="password" component={ TextInput } style={{}} placeholder="Passwrod" />
        <TouchableHighlight onPress={ this.handleSubmit } style={ styles.fullWidthButtton }>
          <Text style={ styles.fullWidthButttonText }>
            {"Let's log in"}
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
});

// Decorate the form component
EmailLoginForm = reduxForm({
  form: 'emailLogin',
  validate
})(EmailLoginForm);

export default EmailLoginForm;