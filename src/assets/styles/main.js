import { StyleSheet } from 'react-native'

// general
import ContainerStyles from 'BetBash/src/assets/styles/containers.general.style'
import ButtonStyles from 'BetBash/src/assets/styles/buttons.general.style'
import TextStyles from 'BetBash/src/assets/styles/texts.general.style'
// components
import InputStyles from 'BetBash/src/assets/styles/inputs.style'
import SnackbarStyles from 'BetBash/src/assets/styles/snackbar.style'
import NavbarStyles from 'BetBash/src/assets/styles/navbar.style'

const MainStyles = {}

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