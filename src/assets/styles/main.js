import { StyleSheet } from 'react-native'

// settings
import * as color from 'BetBash/src/assets/styles/colors.settings'
import * as constant from 'BetBash/src/assets/styles/constants.settings'
// general
import ContainerStyles from 'BetBash/src/assets/styles/containers.general.style'
import ButtonStyles from 'BetBash/src/assets/styles/buttons.general.style'
import TextStyles from 'BetBash/src/assets/styles/texts.general.style'
// components
import InputStyles from 'BetBash/src/assets/styles/inputs.style'
import SnackbarStyles from 'BetBash/src/assets/styles/snackbar.style'
import NavbarStyles from 'BetBash/src/assets/styles/navbar.style'

const MainStyles = {
  divider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: color.blackWeak,
  },
}

const styles = StyleSheet.create({
  ...MainStyles,
  ...ContainerStyles,
  ...TextStyles,
  ...ButtonStyles,
  ...InputStyles,
  ...SnackbarStyles,
  ...NavbarStyles,
})

export default styles