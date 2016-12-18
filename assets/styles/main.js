import { StyleSheet } from 'react-native'

import SnackbarStyles from './snackbar.style'
import ContainerStyles from './containers.general.style'
import ButtonStyles from './buttons.general.style'
import TextStyles from './texts.general.style'

const MainStyle = {}

const styles = StyleSheet.create({
  ...MainStyle,
  ...ContainerStyles,
  ...TextStyles,
  ...ButtonStyles,
  ...SnackbarStyles,
})

export default styles