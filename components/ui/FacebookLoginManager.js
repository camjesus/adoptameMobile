import React, { Component } from 'react';
import { View ,StyleSheet,Button} from 'react-native';
import  { LoginManager, AccessToken, GraphRequestManager, GraphRequest } from 'react-native-fbsdk';

export default class LoginFBKMgr extends Component {


  facebookAuth = () => {
    LoginManager.logInWithPermissions(["email", "public_profile"])
      .then((result) => {
        if (result.isCancelled) {
          console.log('login canceldo');
        } else {
          AccessToken.getCurrentAccessToken().then((data) => {
            let accessToken = data.accessToken;
            let facebookId = data.userID;

            const responseInfoCallback = (error, result) => {
              if (error) {
                console.log(error)
                alert('Error trayendo data: ' + error.toString());
              } else {
                let user = {
                  name: result.name,
                  email: result.email,
                  providerId: facebookId
                }
                //llamar al signin para loguearse
                //guardar en asynsctorage
                //navegar a login o a account deberia ser lo mesmo
                


                alert(JSON.stringify(user ));
              }
            }

            const infoRequest = new GraphRequest(
              '/me',
              {
                accessToken: accessToken,
                parameters: {
                  fields: {
                    string: 'email,name,first_name,middle_name,last_name,password'
                  }
                }
              },
              responseInfoCallback
            );
            new GraphRequestManager().addRequest(infoRequest).start();
          });
        }
      }, function (error) {
        console.log('Ocurrio un error: ' + error);
      });
  }

  render() {
    return (
      <View>
       <Button onPress={this.facebookAuth} title="Ingresa con Facebook" /> 
      </View>
    );
  }
};



