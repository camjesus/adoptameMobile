import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import FacebookLoginBtn from '../components/ui/FacebookLoginManager';

import {
  TextInput,
  Headline,
  Button,
  Dialog,
  Paragraph,
  Portal,
  faceboo
} from 'react-native-paper';
import globalStyles from '../styles/global';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const Login = (props) => {
  const {navigation} = props;
  console.log(navigation);
  const [user, guardoUsuario] = useState(null);
  const [idLogIn, gUserLogIn] = useState('');
  const [usuario, guardarEmail] = useState('');
  const [password, guardarPass] = useState('');
  const [mensaje, guardaMensaje] = useState('');
  const [alerta, ingresarAlerta] = useState(false);
  const isFirstTime = useRef(true);

  useEffect(() => {
    userLoggedGoToDisponibles();
  }, []);

  useEffect(() => {
    //Solo quiero que este hook se ejecute cuando modifico user
    //no quiero que entre la primera vez que renderiza la pantalla
    if (isFirstTime.current) {
      isFirstTime.current = false;
    } else {
      saveUserInStorage();
    }
  }, [user]);

  const crearUsuario = () => {
    navigation.navigate('CrearUsuario');
  };

  const logIn = async () => {
    if (usuario === '' || password === '') {
      guardaMensaje('Todos los campos son requeridos');
      ingresarAlerta(true);
      return;
    }
    const postUsuarios = {usuario, password};
    console.log(postUsuarios);
    try {
      const resultado = await axios.post(
        'http://10.0.2.2:8090/adoptame/mobile/ingresarMobile',
        postUsuarios,
      );
      console.log(resultado.data);
      if (resultado.data.id === null) {
        guardaMensaje('Usuario no encontrado');
        ingresarAlerta(true);
        return;
      }
      console.log('me logueo bien , guardo el user');
      guardoUsuario(resultado.data);
    } catch (error) {
      console.log('erro buscanbdo usuario' + error);
    }
  };

  const saveUserInStorage = async () => {
    try {
      console.log('ENTRE user storage');
      await AsyncStorage.setItem('userId', JSON.stringify(user.id));
      await AsyncStorage.setItem('nombre', user.nombre);
      await AsyncStorage.setItem('apellido', user.apellido);
      //  await AsyncStorage.setItem('telefono', user.telefono);
      await AsyncStorage.setItem('email', user.email);

      await AsyncStorage.setItem('userId', JSON.stringify(user.id)).then(
        (value) => {
          //navigation.navigate('buscar', {screen: 'Disponibles'});
          navigation.navigate('Menu');
        },
      );
    } catch (error) {
      console.log('User Storage Error: ' + error);
    }
  };

  const userLoggedGoToDisponibles = async () => {
    try {
      console.log('entre a userLoggedGoToDisponibles');

      await AsyncStorage.getItem('userId').then((value) => {
        console.log('valor de userId ' + value);

        if (value) {
          console.log(
            'Hay un id guardado me voy a la pantalla de Masc Dis' + value,
          );

          //navigation.navigate('buscar', {screen: 'Disponibles'});
          navigation.navigate('Menu');
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={globalStyles.contenedor}>
      <Headline style={globalStyles.titulo}> Bienvenido!</Headline>
      <TextInput
        label="E-Mail"
        value={usuario}
        onChangeText={(texto) => guardarEmail(texto)}
        style={style.input}
      />
      <TextInput
        label="Contraseña"
        value={password}
        onChangeText={(texto) => guardarPass(texto)}
        style={style.input}
        password={true}
      />

      <Button mode="contained" onPress={() => logIn()}>
        Ingresar
      </Button>
      <Button onPress={() => crearUsuario()}>Nueva Cuenta</Button>

      <FacebookLoginBtn/>
      <Portal>
        <Dialog visible={alerta}>
          <Dialog.Title>Error</Dialog.Title>
          <Dialog.Content>
            <Paragraph>{mensaje}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => ingresarAlerta(false)}>Ok</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};
const style = StyleSheet.create({
  input: {
    marginBottom: 20,
    backgroundColor: 'transparent',
  },
});
export default Login;
