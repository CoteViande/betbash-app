import parse from 'url-parse'

const ROOT_URL = 'http://192.168.0.247:3000'
const BASE_URL = ROOT_URL + '/api'

export const betbashMain = ROOT_URL

export const facebookAuthenticateUrl = (accessToken) => {
  return ROOT_URL + '/auth/facebook-token/callback?access_token=' + accessToken
}

export const userUrl = BASE_URL + '/BaseUsers'
export const userLoginUrl = userUrl + '/login'
export const userLogoutUrl = (accessToken) => addAccessToken(userUrl + '/logout', accessToken)
export const userByIdUrl = (userId) => {
  return userUrl + '/' + userId
}

const addAccessToken = (url, accessToken) => addParamToUrl(url, 'access_token', accessToken)

const addParamToUrl = (url, key, value) => {
  let parsed = parse(url)
  const newQuery = addParamToQuery(parsed.query, key, value)
  parsed.set('query', newQuery)
  return parsed.toString()
}

const addParamToQuery = (query, key, value) => {
  const questionOrAnd = query === '' ? '?' : '&'
  return (query + questionOrAnd + key + '=' + value)
}

// const ROOT_URL = process.env.NODE_ENV === 'production'
// ? 'https://cascade-requin.herokuapp.com'
// : 'http://192.168.0.247:3000'