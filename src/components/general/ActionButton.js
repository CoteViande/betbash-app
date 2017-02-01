import React from 'react'
import ActionButton from 'react-native-action-button'
import Icon from 'react-native-vector-icons/MaterialIcons'

const Item = ActionButton.Item

class BetBashActionButton extends React.Component {
  render() {
    const { navigate } = this.props
    const goToGameCreation = () => navigate('GameCreate')

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
          onPress={goToGameCreation}
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
}

export default BetBashActionButton