import parse from 'url-parse'

// const ROOT_URL = 'https://cascade-requin.herokuapp.com'
const ROOT_URL = 'http://192.168.0.247:3000'
const BASE_URL = `${ROOT_URL}/api`

export const betbashMain = ROOT_URL

export const facebookAuthenticateUrl = accessToken => (
  `${ROOT_URL}/auth/facebook-token/callback?access_token=${accessToken}`
)

export const userUrl = `${BASE_URL}/BaseUsers`
export const userLoginUrl = `${userUrl}/login`
export const userLogoutUrl = state => addAccessToken(
  `${userUrl}/logout`,
  state,
)
export const userByIdUrl = state => addAccessToken(
  `${userUrl}/${state.auth.user.id}`,
  state,
)
export const fullUserByIdUrl = state => addAccessToken(
  addParamToUrl(
    `${userUrl}/${state.auth.user.id}`,
    'filter[include]', 'personalDetails',
  ),
  state,
)
export const personalDetailsByUserIdUrl = state => addAccessToken(
  `${userUrl}/${state.auth.user.id}/personalDetails`,
  state,
)

export const personalDetailsUrl = `${BASE_URL}/PersonalDetails`
export const getUsersByFullNameFromString = searchString => state => addAccessToken(
  addParamToUrl(
    `${personalDetailsUrl}/suggestions`,
    'searchString', searchString,
  ),
  state,
)


const addAccessToken = (url, state) => addParamToUrl(url, 'access_token', state.auth.user.accessToken.id)

// addParamsToUrl = (url, keyValues) => {
//   keyValues.forEach((key, value) => {
//     url = addParamToUrl(url, key, value)
//   })
//   return url
// }

const addParamToUrl = (url, key, value) => {
  const parsed = parse(url)
  const newQuery = addParamToQuery(parsed.query, key, value)
  parsed.set('query', newQuery)
  return parsed.toString()
}

const addParamToQuery = (query, key, value) => {
  const questionOrAnd = query === '' ? '?' : '&'
  return (`${query + questionOrAnd + key}=${value}`)
}

// const ROOT_URL = process.env.NODE_ENV === 'production'
// ? 'https://cascade-requin.herokuapp.com'
// : 'http://192.168.0.247:3000'