import * as color from 'BetBash/src/constants/colors'
import { defaultTextStyle } from 'BetBash/src/assets/styles/texts.general.style'

const textInputStyles = {
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

const pickerStyles = {
  pickerWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: color.black12p,
    marginTop: 16,
    marginBottom: 8,
  },
  picker: {
    alignSelf: 'stretch',
    height: 31,
  },
  pickerLabel: {
    fontFamily: defaultTextStyle.fontFamily,
    fontSize: 12,
    color: color.black54p,
  },
}

const friendSelectorStyles = {
  selectorLabel: pickerStyles.pickerLabel,
  selectorWrapper: {
    marginTop: 16,
  },
}

const InputStyles = {
  ...textInputStyles,
  ...pickerStyles,
  ...friendSelectorStyles,
}

export default InputStyles