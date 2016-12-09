## .then() vs await

### Working case!

`Netinfo.fetch()` est awaited, le `async (resolve,reject) => {}` fonctionne !

```javascript
export const isConnectedToTheInternet = (store) => {
  return new Promise((resolve, reject) => {
    NetInfo.fetch()
      .then((reach) => {
        let connected = true
        switch (reach.toUpperCase()) {
          case 'NONE':
            connected = false
            store.dispatch(notConnectedToInternet())
            break;
          case 'WIFI':
            store.dispatch(connectedToInternet(reach))
            break;
          default:
            store.dispatch(connectedToInternet(reach))
            break;
        }
        resolve(connected);
      })
      .catch((error) => {
        reject(error)
      })
  })
}
```

```javascript
export const isConnectedToTheInternet = (store) => {
  return new Promise(async (resolve, reject) => {
    try {
      let reach = await NetInfo.fetch()
      let connected = true
      switch (reach.toUpperCase()) {
        case 'NONE':
          connected = false
          store.dispatch(notConnectedToInternet())
          break;
        case 'WIFI':
          store.dispatch(connectedToInternet(reach))
          break;
        default:
          store.dispatch(connectedToInternet(reach))
          break;
      }
      resolve(connected);
    } catch(error) {
      reject(error)
    }
  })
}
```

### Not working =(

Voilà une tentative de transfo en await que je n'arrive pas à faire fonctionner. Des idées ?

```javascript
function fetchBetBashTokenFromFacebookToken(token) {
  return (dispatch) => {
    return timeout(5000,
      fetch(endpoint.facebookAuthenticateUrl(token))
        .then((response) => {
          response.json().then((fullToken) => {
            let bbToken = fullToken.access_token
            dispatch(refreshBetBashToken(bbToken))
          })
        })
        .catch((error) => {
          console.log(error)
        })
    )
  }
}
```

Ma tentative :

```javascript
function fetchBetBashTokenFromFacebookToken(token) {
  return async (dispatch) => {
    return
      console.log('NE SE LOG MEME PAS');
      try {
        let response = await timeout(5000, fetch(endpoint.facebookAuthenticateUrl(token)))
        let fullToken = await response.json()
        let bbToken = fullToken.access_token
        dispatch(refreshBetBashToken(bbToken))
      } catch(error) {
        console.log(error)
      }
  }
}
```