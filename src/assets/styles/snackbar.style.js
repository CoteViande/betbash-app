import * as color from 'BetBash/src/assets/styles/colors.settings'
import * as constant from 'BetBash/src/assets/styles/constants.settings'

const SnackbarStyles = {
  snackbarContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: color.grey850,
    padding: 24,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  snackbarMessageContainer: {
    flex: 1,
  },
  snackbarMessage: {
    color: color.white,
  },
  snackbarButtonContainer: {
    marginLeft: 24,
  },
  snackbarButton: {
    color: color.blue500,
    fontFamily: constant.mediumTextFont,
    fontSize: 14,
  },
}

export default SnackbarStyles