import React from 'react'
import ActionButton from 'react-native-action-button'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/MaterialIcons'

const Item = ActionButton.Item

const BetBashActionButton = () => {
  const goToGameCreation = () => Actions.CreateGame()

  return (
    <ActionButton
      buttonColor="rgba(231,76,60,1)"
      bgColor="rgba(0,0,0,0.3)"
      hideShadow={true}
    >
      <Item
        title="Start a new game"
        buttonColor="#9b59b6"
        size={44}
        onPress={() => goToGameCreation()}
      >
        <Icon
          name="add-circle"
          size={20}
          color="white"
        />
      </Item>
      <Item
        title="Join an existing game"
        buttonColor="#3498db"
        size={44}
        onPress={() => {}}
      >
        <Icon
          name="forward"
          size={20}
          color="white"
        />
      </Item>
    </ActionButton>
  )
}

export default BetBashActionButton