import * as color from 'BetBash/src/constants/colors'

export const defaultTextStyle = {
  fontSize: 16,
  fontFamily: 'Roboto',
  color: color.black87p,
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