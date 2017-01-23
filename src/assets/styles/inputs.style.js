import * as color from 'BetBash/src/assets/styles/colors.settings'
import * as constant from 'BetBash/src/assets/styles/constants.settings'

const textInputStyles = {
  textInputWrapper: {
    paddingTop: 16,
    paddingBottom: 8,
    position: 'relative',
  },
  textInput: {
    fontFamily: constant.defaultTextFont,
    fontSize: 16,
    height: 44,
    paddingBottom: 0,
    paddingLeft: 0,
  },
  textInputLabel: {
    fontFamily: constant.defaultTextFont,
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
    fontFamily: constant.defaultTextFont,
    fontSize: 12,
    height: 36,
    paddingBottom: 0,
  },
}

const pickerStyles = {
  pickerWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: color.blackWeak,
    marginTop: 16,
    marginBottom: 8,
  },
  picker: {
    alignSelf: 'stretch',
    height: 31,
  },
  pickerLabel: {
    fontFamily: constant.defaultTextFont,
    fontSize: 12,
    color: color.blackTwo,
  },
}

const InputStyles = {
  ...textInputStyles,
  ...pickerStyles,
}

export default InputStyles