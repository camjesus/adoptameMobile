import React, {Component} from 'react';
import {View, StyleSheet, Button} from 'react-native';
import {
  LoginManager,
  AccessToken,
  GraphRequestManager,
  GraphRequest,
} from 'react-native-fbsdk';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import constantes from '../context/Constantes'; 

export default class LoginFBKMgr extends Component {
  facebookAuth = () => {
    var that = this;

    LoginManager.logInWithPermissions(['email', 'public_profile']).then(
      (result) => {
        if (result.isCancelled) {
          console.log('login canceldo');
        } else {
          AccessToken.getCurrentAccessToken().then((data) => {
            let accessToken = data.accessToken;
            let facebookId = data.userID;

            const responseInfoCallback = (error, result) => {
              if (error) {
                console.log(error);
                alert('Error trayendo data: ' + error.toString());
              } else {
                let user = {
                  name: result.name,
                  email: result.email,
                  providerId: facebookId,
                };
                //llamar al signin para loguearse
                //guardar en asynsctorage
                //navegar a login o a account deberia ser lo mesmo
                const postUsuarios = {
                  usuario: result.email,
                  facebookId: facebookId,
                };

                console.log(postUsuarios);
                try {
                  const url = constantes.BASE_URL+'ingresarMobile'

                  const resultado = axios
                    .post(
                    //  'http://10.0.2.2:8090/adoptame/mobile/ingresarMobile',
                    url,
                      postUsuarios,
                    )
                    .then((resp) => {
                      if (resp.data.id === null) {
                        alert('Usuario no encontrado');
                      } else {
                        saveUserInStorage(resp.data);
                      }
                      console.log('a ver ese login: ' + resp.data);
                    })
                    .catch((error) => {
                      alert('Ha ocurrido un error en el servidor ' + error);
                    });
                } catch (error) {
                  console.log('erro buscanbdo usuario' + error);
                }
                //  console.log(resultado.data);
                // saveUserInStorage(user);

                //  alert(JSON.stringify(user ));
              }
            };

            const saveUserInStorage = async (user) => {
              try {
                console.log('ENTRE user storage login fb');
                await AsyncStorage.setItem('nombre', user.nombre);
                await AsyncStorage.setItem('apellido', user.apellido);
                // await AsyncStorage.setItem('telefono', user.telefono);
                await AsyncStorage.setItem('email', user.email);
                await AsyncStorage.setItem(
                  'userId',
                  JSON.stringify(user.id),
                ).then((value) => {
                  that.props.navigation.navigate({name: 'Menu'});
                });
              } catch (error) {
                console.log('User Storage Error: ' + error);
              }
            };

            const infoRequest = new GraphRequest(
              '/me',
              {
                accessToken: accessToken,
                parameters: {
                  fields: {
                    string: 'email,name,first_name,middle_name,last_name',
                  },
                },
              },
              responseInfoCallback,
            );
            new GraphRequestManager().addRequest(infoRequest).start();
          });
        }
      },
      function (error) {
        console.log('Ocurrio un error: ' + error);
      },
    );
  };

  render() {
    return (
      <View>
        <Button
          onPress={this.facebookAuth.bind(this, 'Menu')}
          title="Ingresa con Facebook"
        />
      </View>
    );
  }
}
