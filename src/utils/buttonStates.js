const btnStates = (onPress, labelIdle, labelBusy, labelSuccess, labelError) => {
  return {
    idle: {
      text: labelIdle,
      onPress: onPress,
      backgroundColor: '#1155DD',
    },
    busy: {
      text: labelBusy,
      backgroundColor: '#002299',
      spinner: true,
    },
    success: {
      text: labelSuccess,
      backgroundColor: '#339944'
    },
    error: {
      text: labelError,
      onPress: onPress,
      backgroundColor: '#000000'
    }
  }
}

export default btnStates