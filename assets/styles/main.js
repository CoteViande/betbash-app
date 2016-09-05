import { StyleSheet } from 'react-native'

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
    // backgroundColor: 'transparent',
    paddingTop: 20,
    paddingBottom: 20,
  },
  instructions: {
    textAlign: 'center',
    color: '#FFFFFF'
  },
  fullWidthButtton: {
    backgroundColor: 'blue',
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  fullWidthButttonText: {
    color: 'white',
  }
});

export default styles;