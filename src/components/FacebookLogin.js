import React from 'react';

const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  AccessToken
} = FBSDK;

module.exports = React.createClass({
  render: function() {
    return (
      <LoginButton
        onLoginFinished={
          (error, result) => {
            if (error) {
              console.error("login has error: " + result.error);
            } else if (result.isCancelled) {
              console.warn("login is cancelled.");
            } else {
              AccessToken.getCurrentAccessToken().then(
                (data) => {
                  console.log(data.accessToken.toString())
                }
              )
            }
          }
        }
        onLogoutFinished={() => console.log("logout.")}
      />
    );
  }
});