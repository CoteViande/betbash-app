export const email = (inputName, values, errors) => {
  if (!values[inputName]) {
    errors[inputName] = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values[inputName])) {
    errors[inputName] = 'Invalid email address'
  }

  return errors
}

export const password = (inputName, values, errors) => {
  if (!values[inputName]) {
    errors[inputName] = 'Required'
  } else if (values[inputName].length < 6) {
    errors[inputName] = 'Password must be at least 6 characters long'
  }

  return errors
}