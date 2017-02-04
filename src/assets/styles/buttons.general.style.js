import * as color from 'BetBash/src/assets/styles/colors.settings'
import * as constant from 'BetBash/src/assets/styles/constants.settings'

const ButtonStyles = {
  defaultButton: {
    backgroundColor: color.blue500,
    padding: 0,
    paddingLeft: 16,
    paddingRight: 16,
    height: 36,
    borderRadius: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  defaultButtonText: {
    color: color.white,
    fontSize: 14,
    fontFamily: constant.mediumTextFont,
    textAlign: 'center',
  },
  defaultButtonIcon: {
    color: color.white,
    fontSize: 14,
    textAlign: 'center',
    marginRight: 8,
  },
  invertedButton: {
    backgroundColor: color.transparent,
  },
  invertedButtonText: {
    color: color.blue500,
  },
  greenButton: {
    backgroundColor: color.green500,
  },
  headerRightButton: {
    marginRight: 8,
    backgroundColor: color.transparent,
  },
  headerRightButtonText: {
    color: color.blue500,
  },
}

export default ButtonStyles