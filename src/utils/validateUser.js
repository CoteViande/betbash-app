import { getFullUser } from 'BetBash/src/actions/auth.actions'

export const checkIfProfileComplete = ({ getState, dispatch }) => {
  return new Promise(async (resolve, reject) => {
    const state = getState()
    // const user = state.auth.user
    try {
      const response = await dispatch(getFullUser())
      const profileComplete = isProfileComplete(response.payload)
      resolve(profileComplete)
    } catch (error) {
      reject(error)
    }
  })
}

const isProfileComplete = user => (
  !!user.id
  && userHasValidName(user)
  && userHasProfilePicture(user)
)

const userHasProfilePicture = () => true // TODO

const userHasValidName = user => (
  !!user.personalDetails
  && !!user.personalDetails.first_name
  && !!user.personalDetails.last_name
)