import { StyleSheet } from 'react-native'

// general
import ContainerStyles from 'assets/styles/containers.general.style'
import ButtonStyles from 'assets/styles/buttons.general.style'
import TextStyles from 'assets/styles/texts.general.style'
// components
import SnackbarStyles from 'assets/styles/snackbar.style'

const MainStyle = {}

const styles = StyleSheet.create({
  ...MainStyle,
  ...ContainerStyles,
  ...TextStyles,
  ...ButtonStyles,
  ...SnackbarStyles,
})

export default styles