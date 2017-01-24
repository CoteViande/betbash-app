import * as endpoint from 'BetBash/src/constants/apiEndpoints'
import { RSAA, generateTypes } from 'BetBash/src/middlewares/api-middleware/index'

const updateFriendSuggestionsType = generateTypes(
  'UPDATE_FRIENDS_SUGGESTIONS',
)
export const updateFriendSuggestions = searchString => {
  const requestedAt = new Date()
  return {
    [RSAA]: {
      types: [
        {
          type: updateFriendSuggestionsType.request,
          meta: { requestedAt },
        },
        {
          type: updateFriendSuggestionsType.success,
          meta: { requestedAt },
        },
        updateFriendSuggestionsType.failure,
      ],
      endpoint: endpoint.getUsersByFullNameFromString(searchString),
      method: 'GET',
      headers: {
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
      },
    },
  }
}