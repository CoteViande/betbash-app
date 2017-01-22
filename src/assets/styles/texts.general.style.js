import * as color from 'BetBash/src/assets/styles/colors.settings'

export const defaultTextStyle = {
  fontSize: 16,
  fontFamily: 'Roboto',
  color: color.blackOne,
}

const TextStyles = {
  defaultText: defaultTextStyle,
  instructions: {
    textAlign: 'center',
    color: color.white,
  },
  errorText: {
    color: color.redA700,
    paddingBottom: 10,
  },
}

export default TextStyles