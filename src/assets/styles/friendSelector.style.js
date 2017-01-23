import * as color from 'BetBash/src/assets/styles/colors.settings'
import * as constant from 'BetBash/src/assets/styles/constants.settings'

const generalStyles = {
  selectorLabel: {
    fontFamily: constant.defaultTextFont,
    fontSize: 12,
    color: color.blackTwo,
  },
  selectorWrapper: {
    marginTop: 16,
  },
  greenRoundIcon: {
    color: color.white,
    backgroundColor: color.green500,
    margin: 2,
    fontSize: 24,
    padding: 10,
    borderRadius: 22,
    alignSelf: 'center',
    textAlign: 'center',
  },
}

const friendSelectorStyles = {
  friendSelectorInputContainer: {
    backgroundColor: color.red700,
    paddingLeft: 16,
    paddingRight: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  friendSelectorInputText: {
    height: 56,
    fontSize: 16,
    flex: 1,
    color: color.whiteOne,
  },
  friendSuggestionRow: {
    height: 72,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  friendSuggestionCircle: {
    margin: 16,
    width: 40,
    height: 40,
    backgroundColor: color.redA400,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  friendSuggestionInitials: {
    color: 'white',
    fontFamily: 'sans-serif-medium',
  },
  friendSuggestionTextContainer: {
    flex: 1,
  },
  friendSuggestionText: {
    fontFamily: constant.defaultTextFont,
    fontSize: constant.defaultTextSize,
    color: color.blackOne,
  },
}

const addPeopleComponentStyles = {
  ...generalStyles,
  ...friendSelectorStyles,
}

export default addPeopleComponentStyles