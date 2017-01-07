import * as color from 'BetBash/src/constants/colors'

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
    fontWeight: 'bold',
  },
}

export default SnackbarStyles