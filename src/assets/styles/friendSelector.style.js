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
  friendSelectorTopBar: {
    backgroundColor: color.red900,
  },
  friendSelectorInputContainer: {
    paddingLeft: 16,
    paddingRight: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  friendSelectorInputText: {
    height: 56,
    fontSize: 16,
    flex: 1,
    color: color.white,
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
  selectedFriendsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    paddingTop: 6,
    paddingLeft: 6,
  },
  selectedFriendContainer: {
    backgroundColor: color.red500,
    borderRadius: 12,
    marginRight: 6,
    marginBottom: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedFriendTextContainer: {
    paddingLeft: 12,
    paddingRight: 6,
  },
  selectedFriendText: {
    color: color.white,
  },
  smallCloseIcon: {
    color: color.white,
    backgroundColor: color.red500,
    margin: 0,
    fontSize: 16,
    padding: 4,
    borderRadius: 12,
    alignSelf: 'center',
    textAlign: 'center',
  },
}

const addPeopleComponentStyles = {
  ...generalStyles,
  ...friendSelectorStyles,
}

export default addPeopleComponentStyles