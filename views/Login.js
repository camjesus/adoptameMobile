import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  TextInput,
  Headline,
  Button,
  Dialog,
  Paragraph,
  Portal,
} from 'react-native-paper';
import globalStyles from '../styles/global';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const Login = ({navigation}) => {
  const [user, guardoUsuario] = useState(userDefault);
  const [idLogIn, gUserLogIn] = useState('');
  const [usuario, guardarEmail] = useState('');
  const [password, guardarPass] = useState('');
  const [mensaje, guardaMensaje] = useState('');
  const [alerta, ingresarAlerta] = useState(false);
  const userDefault = {
    id: '',
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
  };

  useEffect(() => {
    obtenerDatosStorage();
    if (idLogIn !== '') {
      navigation.navigate('Disponibles');
    }
  });

  useEffect(() => {
    userStorage();
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
      guardoUsuario(resultado.data);
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };

  const userStorage = async () => {
    try {
      await AsyncStorage.setItem('userId', user.id.toString());
      await AsyncStorage.setItem('nombre', user.nombre);
      await AsyncStorage.setItem('apellido', user.apellido);
      await AsyncStorage.setItem('telefono', user.telefono);
      await AsyncStorage.setItem('email', user.email);
      navigation.navigate('Disponibles');
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerDatosStorage = async () => {
    try {
      gUserLogIn(await AsyncStorage.getItem('userId'));
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
      />

      <Button mode="contained" onPress={() => logIn()}>
        Ingresar
      </Button>
      <Button onPress={() => crearUsuario()}>Nueva Cuenta</Button>

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
