import * as color from 'BetBash/src/assets/styles/colors.settings'
import * as constant from 'BetBash/src/assets/styles/constants.settings'

const ContainerStyles = {
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
    margin: constant.doubleUnit,
  },
  thinBox: {
    marginLeft: constant.quadUnit,
    marginRight: constant.quadUnit,
  },
  navBarContainer: {
    paddingTop: constant.navbarHeight,
    flexGrow: 1,
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
}

export default ContainerStyles