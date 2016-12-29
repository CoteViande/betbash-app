import { StyleSheet } from 'react-native'
// general
import ContainerStyles from './containers.general.style'
import ButtonStyles from './buttons.general.style'
import TextStyles from './texts.general.style'
// components
import SnackbarStyles from './snackbar.style'

const MainStyle = {}

const styles = StyleSheet.create({
  ...MainStyle,
  ...ContainerStyles,
  ...TextStyles,
  ...ButtonStyles,
  ...SnackbarStyles,
})

export default styles