import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import FacebookLoginBtn from '../components/ui/FacebookLoginManager';
import {
  TextInput,
  Button,
  Dialog,
  Paragraph,
  Portal,
  Text,
} from 'react-native-paper';
import constantes from '../components/context/Constantes';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import globalStyles from '../styles/global';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import * as firebase from 'firebase';
import {signup} from '../store/actions/auth.action';

const Login = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [usuario, setEmail] = useState('');
  const [password, setPass] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [alerta, ingresarAlerta] = useState(false);
  const userRef = useRef();
  const passRef = useRef();
  const isFirstTime = useRef(true);

  const crearUsuario = () => {
    navigation.navigate('CrearUsuario');
  };

  const focusedTextInput = (ref) => {
    ref.current.focus();
  };

  useEffect(() => {
    //Solo quiero que este hook se ejecute cuando modifico user
    //no quiero que entre la primera vez que renderiza la pantalla
    if (isFirstTime.current) {
      isFirstTime.current = false;
    } else {
      saveUserInStorage();
    }
  }, [user]);

  const logIn = async () => {
    if (usuario === '' || password === '') {
      setMensaje('Todos los campos son requeridos');
      ingresarAlerta(true);
      return;
    }
    const postUsuarios = {usuario, password};

    const url = constantes.BASE_URL + 'ingresarMobile';
    console.log(url);
    try {
      const resultado = await axios.post(url, postUsuarios);
      console.log(resultado.data);
      if (resultado.data.id === null) {
        setMensaje('Usuario no encontrado');
        ingresarAlerta(true);
        return;
      }
      console.log('me logueo bien , guardo el user');
      setUser(resultado.data);
      firebase
        .auth()
        .signInWithEmailAndPassword(usuario, password)
        .then((response) => {
          console.log('correctamente');
          console.log(response);
          dispatch(signup(resultado.data.id));
        })
        .catch((err) => {
          console.log('ERROR');
          console.log(err);
        });
    } catch (error) {
      setMensaje('Ha ocurrido un error intente nuevamente');
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
      await AsyncStorage.setItem('telefono', user.telefono);
      await AsyncStorage.setItem('email', user.email);
    } catch (error) {
      console.log('User Storage Error: ' + error);
    }
  };

  return (
    <View style={globalStyles.base}>
      <View style={style.viewLogo}>
        <Image source={require('../img/casita_b.png')} style={style.imglogo} />
      </View>
      <View style={style.cardLogin}>
        <View style={style.viewBienvenido}>
          <Text style={style.bienvenido}>Bienvenido a </Text>
          <Text style={style.adoptaMe}>Portal Pet</Text>
        </View>
        <KeyboardAwareScrollView>
          <TextInput
            label="E-Mail"
            value={usuario}
            onChangeText={(texto) => setEmail(texto)}
            style={style.input}
            ref={userRef}
            autoCapitalize="none"
            onSubmitEditing={(event) => {
              focusedTextInput(passRef);
            }}
            left={<TextInput.Icon name="email" color="#9575cd" />}
          />
          <TextInput
            label="Contraseña"
            value={password}
            onChangeText={(texto) => setPass(texto)}
            style={style.input}
            ref={passRef}
            left={<TextInput.Icon name="key" color="#9575cd" />}
            secureTextEntry={true}
          />

          <Button
            style={style.ingresar}
            mode="contained"
            onPress={() => logIn()}>
            Ingresar
          </Button>
          <View style={style.viewRow}>
            <FacebookLoginBtn {...props} />
          </View>
          <View style={style.viewNuevaCuenta}>
            <Text style={style.registrate} />
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
        <Dialog visible={alerta} style={globalStyles.dialog}>
          <Dialog.Title style={globalStyles.dialogTitle}>Error</Dialog.Title>
          <Dialog.Content>
            <Paragraph style={globalStyles.dialogMsj}>{mensaje}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button mode="contained" onPress={() => ingresarAlerta(false)}>
              Ok
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};
const style = StyleSheet.create({
  viewRow: {
    flexDirection: 'row',
    alignContent: 'space-between',
    justifyContent: 'center',
  },
  input: {
    marginBottom: 10,
    backgroundColor: 'transparent',
  },
  scroll: {
    padding: 0,
    margin: 0,
    flex: 1,
    backgroundColor: 'transparent',
  },
  ingresar: {
    backgroundColor: '#9575cd',
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
    backgroundColor: '#9575cd',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    shadowColor: '#000000',
    shadowOpacity: 1,
    shadowRadius: 30,
    elevation: 10,
    shadowOffset: {width: 1, height: 13},
  },
  imglogo: {
    marginTop: '10%',
    marginBottom: 160,
    width: 150,
    height: 150,
  },
  cardLogin: {
    backgroundColor: '#ffffff',
    marginHorizontal: 30,
    justifyContent: 'center',
    padding: 20,
    paddingBottom: 0,
    borderRadius: 30,
    marginTop: '-30%',
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
    fontSize: 23,
    color: '#252932',
    fontFamily: 'ArchitectsDaughter-Regular',
  },
});
export default Login;
