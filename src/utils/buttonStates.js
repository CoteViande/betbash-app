const btnStates = (onPress) => {
  return {
    idle: {
      text: 'Log In',
      onPress: onPress,
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
      onPress: onPress,
      backgroundColor: '#000000'
    }
  }
}

export default btnStates