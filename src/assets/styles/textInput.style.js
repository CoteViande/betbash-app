import * as color from 'BetBash/src/constants/colors'
import { defaultTextStyle } from 'BetBash/src/assets/styles/texts.general.style'

const InputStyles = {
  textInputWrapper: {
    paddingTop: 16,
    paddingBottom: 8,
    position: 'relative',
  },
  textInput: {
    fontFamily: defaultTextStyle.fontFamily,
    fontSize: 16,
    height: 44,
    paddingBottom: 0,
    paddingLeft: 0,
  },
  textInputLabel: {
    fontFamily: defaultTextStyle.fontFamily,
    position: 'absolute',
    left: 0,
    backgroundColor: color.transparent,
  },
  underlineWrapper: {
    height: 1,
    alignItems: 'center',
  },
  textInputError: {
    color: color.redA700,
    fontSize: 12,
  },
  denseTextInputWrapper: {
    paddingTop: 12,
    paddingBottom: 4,
    position: 'relative',
  },
  denseTextInput: {
    fontFamily: defaultTextStyle.fontFamily,
    fontSize: 12,
    height: 36,
    paddingBottom: 0,
  },
}

export default InputStyles