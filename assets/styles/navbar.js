import { StyleSheet } from 'react-native'

import * as color from 'assets/constants/colors'

export const NavbarStyles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 60,
    padding: 15,
    paddingTop: 20,
    backgroundColor: color.red500,
  },
  componentContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  leftContainer: {
    alignItems: 'flex-start',
    flex: 1,
  },
  rightContainer: {
    alignItems: 'flex-end',
    flex: 1,
  },
  centerComponent: {
    position: 'absolute',
    left: 0,
    right: 0,
  },
  title: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center',
    flex: -1,
  },
  backButton: {
    flex: 1,
    flexDirection: 'row',
  },
  rightButton: {
    flex: 1,
  },
  leftButton: {
    flex: 1,
  },
  barRightButtonText: {
    color: 'white',
    textAlign: 'right',
    fontSize: 17,
  },
  barBackButtonText: {
    color: color.white,
    textAlign: 'left',
    fontSize: 17,
    marginLeft: 6,
  },
  barLeftButtonText: {
    color: color.white,
    textAlign: 'left',
    fontSize: 17,
  },
  backButtonImage: {
    width: 24,
    height: 24,
  },
  rightButtonIconStyle: {},
  defaultImageStyle: {
    height: 24,
    resizeMode: 'contain',
  },
})