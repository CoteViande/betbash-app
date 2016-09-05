import React from 'react'
import { Actions } from 'react-native-router-flux'

import EmailLoginForm from '../components/EmailLoginForm'

let RegisterEmail = React.createClass({
  render() {
    return(
      <EmailLoginForm handleSubmit={() => console.warn('sent')} />
    );
  }
});

export default RegisterEmail;