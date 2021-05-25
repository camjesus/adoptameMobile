import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, View, Image} from 'react-native';
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
import Icon from 'react-native-vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';


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
  const userRef = useRef();
  const passRef = useRef();
  
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
    navigation.navigate('BuscarStack', {screen: 'CrearUsuario'});
  };

  const focusedTextInput = (ref) => {
    ref.current.focus();
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
          navigation.navigate('BuscarStack', {screen: 'Disponibles'});
          //navigation.navigate('Disponibles');
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

          navigation.navigate('BuscarStack', {screen: 'Disponibles'});
          //navigation.navigate('Disponibles');
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={globalStyles.base}>
      <View style={style.viewLogo}>
        <Image source={require('../img/casita.png')} style={style.imglogo} /> 
      </View>
      <View style={style.cardLogin}>
        <View style={style.viewBienvenido}>
          <Text style={style.bienvenido}>Bienvenido a </Text>
          <Text style={style.adoptaMe}>Adopta.Me</Text>
        </View>
        <KeyboardAwareScrollView>
          <TextInput
            label="E-Mail"
            value={usuario}
            onChangeText={(texto) => guardarEmail(texto)}
            style={style.input}
            ref={userRef}
            onSubmitEditing={(event) => {
              focusedTextInput(passRef);
            }}
            left={<TextInput.Icon name="email" color="#FFAD00" />}
          />
          <TextInput
            label="Contraseña"
            value={password}
            onChangeText={(texto) => guardarPass(texto)}
            style={style.input}
            ref={passRef}
            left={<TextInput.Icon name="key" color="#FFAD00" />}
            secureTextEntry={true}
          />

          <Button
            style={style.ingresar}
            mode="contained"
            onPress={() => logIn()}>
            Ingresar
          </Button>
          <FacebookLoginBtn {...props} />
          <View style={style.viewNuevaCuenta}>
            <Text style={style.registrate}></Text>
            <Button
              style={style.nuevaCuenta}
              mode="outlined"
              color="#252932"
              onPress={() => crearUsuario()}>
              Registrate acá
            </Button>
          </View>
        </KeyboardAwareScrollView>
      </View>
      
      <Portal>
          <Dialog visible={alerta} style={style.dialog} >
              <Dialog.Title style={style.dialogTitle}>Error</Dialog.Title>
            <Dialog.Content>
              <Paragraph style={style.dialogMsj}>{mensaje}</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
                <Button
                  mode="contained"
                  onPress={() => ingresarAlerta(false)}>
                  Ok
                </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
    </View>

  );
};
const style = StyleSheet.create({
  dialog: {
    color: '#FFAD00',
    borderRadius: 5,
  },
  dialogTitle: {
    color: '#FFAD00',
    fontSize: 20,
  },
  dialogMsj: {
    color: '#FFAD00',
    fontSize: 17,
  },
  input: {
    marginBottom: 10,
    backgroundColor: 'transparent',
  },
  scroll: {
    padding: 0,
    margin: 0,
    flex: 1,
    backgroundColor: 'transparent'
  },
  ingresar: {
    backgroundColor: '#FFAD00',
    padding: 3,
    borderRadius: 5,
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: {width: 1, height: 13},
    marginHorizontal: 40,
    marginVertical: 10,
    marginTop: 20,
  },
  viewNuevaCuenta: {
    marginVertical: 10,
  },
  nuevaCuenta: {
    padding: 0,
    borderColor: '#FFFFFF',
  },
  registrate: {
    color: '#252932',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  dialogBack: {
    backgroundColor: '#ffffff',
  },
  viewLogo: {
    alignItems: 'center',
    margin: 0,
    padding: 0,
    backgroundColor: '#FFAD00',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    shadowColor: '#000000',
    shadowOpacity: 1,
    shadowRadius: 30,
    elevation: 10,
    shadowOffset: {width: 1, height: 13},
  },
  imglogo: {
    marginTop: 30,
    marginBottom: 150,
    width: 160,
    height: 160,
  },
  cardLogin: {
    backgroundColor: '#ffffff',
    marginHorizontal: 30,
    justifyContent: 'center',
    padding: 20,
    paddingBottom: 0,
    borderRadius: 30,
    marginTop: '-40%',
    shadowColor: '#000000',
    shadowOpacity: 1,
    shadowRadius: 30,
    elevation: 15,
    shadowOffset: {width: 1, height: 13},
    marginBottom: 10,
  },
  bienvenido: {
    fontSize: 18,
    color: '#252932',
    fontFamily: 'MostWazted',
  },
  viewBienvenido: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  adoptaMe: {
    fontSize: 20,
    color: '#252932',
    fontFamily: 'ArchitectsDaughter-Regular',
  },
});
export default Login;
