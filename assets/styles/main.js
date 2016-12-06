import { StyleSheet } from 'react-native'
import * as color from './colors'

const styles = StyleSheet.create({
  imageBgContainer: {
    flex: 1,
    width: null,
    height: null,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    margin: 20,
  },
  navBarContainer: {
    paddingTop: 60,
  },
  topBarContainer: {
    paddingTop: 60,
  },
  tabBarContainer: {
    marginBottom: 60,
  },
  leftAlignContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  topRedContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    paddingTop: 20,
    paddingBottom: 20,
  },
  bottomContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  },
  instructions: {
    textAlign: 'center',
    color: '#FFFFFF'
  },
  fullWidthButtton: {
    backgroundColor: color.green500,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  fullWidthButttonText: {
    color: color.white,
  },
  textError: {
    color: 'red',
    paddingBottom: 10,
  },
  abContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonBackground: {
    flex: 1,
    height: 40,
    borderRadius: 5,
  },
  loginButtonLabel: {
    color: color.white,
  }
});

export default styles;