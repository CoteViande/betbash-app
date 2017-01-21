import * as color from 'BetBash/src/assets/styles/colors.settings'

const btnStates = (onPress, labelIdle, labelBusy, labelSuccess, labelError) => {
  return {
    idle: {
      text: labelIdle,
      onPress: onPress,
      backgroundColor: color.green500,
    },
    busy: {
      text: labelBusy,
      backgroundColor: color.green700,
      spinner: true,
    },
    success: {
      text: labelSuccess,
      backgroundColor: color.green500,
    },
    error: {
      text: labelError,
      onPress: onPress,
      backgroundColor: color.green500,
    }
  }
}

export default btnStates