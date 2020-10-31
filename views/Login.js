import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import FacebookLoginBtn from '../components/ui/FacebookLoginManager';
import constantes from '../components/context/Constantes'; 
import {
  TextInput,
  Headline,
  Button,
  Dialog,
  Paragraph,
  Portal,
  Text,
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
    navigation.navigate('crearUsuario');
  };

  const logIn = async () => {
    if (usuario === '' || password === '') {
      guardaMensaje('Todos los campos son requeridos');
      ingresarAlerta(true);
      return;
    }
    const postUsuarios = {usuario, password};
    
    const url=constantes.BASE_URL+'ingresarMobile';
    console.log(url);
    try {
      const resultado = await axios.post(
      //  'http://10.0.2.2:8090/adoptame/mobile/ingresarMobile
    //  'https://adoptameapp.herokuapp.com/adoptame/mobile/ingresarMobile',
         url,
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
      guardaMensaje('Ha ocurrido un error intente nuevamente' + error);
      ingresarAlerta(true);
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
    <View style={globalStyles.base}>
      <View style={globalStyles.contenedor}>
        <Text style={globalStyles.titulo}> Adopta.Me!</Text>
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
          secureTextEntry={true}
        />

        <Button style={style.ingresar} mode="contained" onPress={() => logIn()}>
          Ingresar
        </Button>
        <FacebookLoginBtn {...props} />
        <View style={style.viewNuevaCuenta}>
          <Text style={style.registrate}>Registrate acá</Text>
          <Button
            style={style.nuevaCuenta}
            mode="text"
            color="#FFFFFF"
            onPress={() => crearUsuario()}>
            Nueva Cuenta
          </Button>
        </View>
        <Portal>
          <Dialog visible={alerta} >
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
    </View>
  );
};
const style = StyleSheet.create({
  input: {
    marginBottom: 20,
    backgroundColor: 'transparent',
  },
  ingresar: {
    backgroundColor: '#FF9D4E',
    padding: 3,
    borderRadius: 50,
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: {width: 1, height: 13},
    marginHorizontal: 40,
    marginVertical: 10,
    marginTop: 10,
  },
  viewNuevaCuenta: {
    marginVertical: 50,
  },
  registrate: {
    color: '#FFFFFF',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  dialogBack: {
    backgroundColor: '#ffffff',
  }
});
export default Login;
