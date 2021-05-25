import React, {useState, useRef} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {
  TextInput,
  Button,
  Portal,
  Dialog,
  Paragraph,
  IconButton,
} from 'react-native-paper';
import globalStyles from '../styles/global';
import axios from 'axios';
import {ScrollView} from 'react-native-gesture-handler';
import constantes from '../components/context/Constantes'; 
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';


const CrearUsuario = ({navigation}) => {
  const [nombre, gNombre] = useState('');
  const [apellido, gApellido] = useState('');
  const [email, gEmail] = useState('');
  const [telefono, gTelefono] = useState('');
  const [password, gPassword] = useState('');
  const [passwordRep, gPasswordRep] = useState('');
  const [alerta, ingresarAlerta] = useState(false);
  const [mensaje, guardaMensaje] = useState('');
  const apellidoImp = useRef();
  const emailRef = useRef();
  const RpassRef = useRef();
  const passRef = useRef();
  const teleRef = useRef();

  const guardarUsuario = async () => {
    const ubicacion = '';
    if (
      nombre === '' ||
      apellido === '' ||
      email === '' ||
      password === ''||
      telefono === '' 
    ) {
      guardaMensaje('Todos los campos son requeridos');
      ingresarAlerta(true);
      return;
    }
    //password con una mayuscula , un numero y 8 caracteres
    let reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

    if (reg.test(password) === false) { 
      guardaMensaje('Las contraseñas deben tener 8 caracteres una mayúscula y un número');
      ingresarAlerta(true);
      return;
    }
    if (password !== passwordRep) {
      guardaMensaje('Las contraseñas no coinciden');
      ingresarAlerta(true);
      return;
    }
    const nuevoUsuario = {
      nombre,
      apellido,
      email,
      password,
      ubicacion,
      telefono
    };
    console.log(nuevoUsuario);
    const url=constantes.BASE_URL+'signInUser/';
    const resultado = await axios.post(
     // 'https://adoptameapp.herokuapp.com/adoptame/mobile/signInUser/',
       url,
      nuevoUsuario,
    );
    console.log(resultado.data.result);
    
    if (resultado.data.status === 'SUCESS') {
      navigation.navigate('Login');
    }else{
      guardaMensaje(resultado.data.result);
    ingresarAlerta(true);
    }
  };
  const backPage = () => {
    navigation.navigate('Login');
  };

  const focusedTextInput = (ref) => {
    ref.current.focus();
  }
  return (
    <View style={globalStyles.base}>
      <View style={style.header}>
        <IconButton
          icon="arrow-left"
          color="#FFFFFF"
          style={globalStyles.iconBack}
          onPress={() => navigation.goBack()}
          size={30}
        />
        <Text style={style.title}>Ingresa tus datos</Text>
        <View style={globalStyles.viewR}></View>
      </View>
      <View style={style.cardNew}>
      <ScrollView style={style.scroll}>
        <View style={style.contenedor}>
<TextInput
            label="Nombre"
            onChangeText={(texto) => gNombre(texto)}
            style={style.input}
            value={nombre}
            onSubmitEditing={(event) => { focusedTextInput(apellidoImp) }}
          />
          <TextInput
            label="Apellido"
            onChangeText={(texto) => gApellido(texto)}
            style={style.input}
            value={apellido}
            ref={apellidoImp}
            onSubmitEditing={(event) => { focusedTextInput(emailRef) }}
          />
   
          <TextInput
            label="Email"
            onChangeText={(texto) => gEmail(texto)}
            style={style.input}
            value={email}
            ref={emailRef}
            onSubmitEditing={(event) => { focusedTextInput(teleRef) }}
          />
          <TextInput
            label="Teléfono"
            onChangeText={(texto) => gPassword(texto)}
            style={style.input}
            value={password}
            secureTextEntry={true}
            ref={teleRef}
            onSubmitEditing={(event) => { focusedTextInput(passRef) }}
          />
          <TextInput
            label="Contraseña"
            onChangeText={(texto) => gPassword(texto)}
            style={style.input}
            value={password}
            secureTextEntry={true}
            ref={passRef}
            onSubmitEditing={(event) => { focusedTextInput(RpassRef) }}
          />

          <TextInput
            label="Repetir contraseña"
            onChangeText={(texto) => gPasswordRep(texto)}
            style={style.input}
            value={passwordRep}
            ref={RpassRef}
            secureTextEntry={true}
          />

            <View style={style.Viewguardar}>
              <Button
                style={style.guardar}
                mode="contained"
                onPress={() => guardarUsuario()}>
                Crear
              </Button>
          </View>
            
		</View>
        </ScrollView>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  Viewguardar: {
    flex: 2,
    bottom: 0,
  },
  scroll: {
    padding: 0,
    margin: 0,
  },
  base: {
    flexDirection: 'column',
    flex: 1,
  },
  contenedor: {
    justifyContent: 'center',
    margin: 10,
    flex: 5,
  },

  tituloTxt: {
    textAlign: 'center',
    fontSize: 35,
    color: '#252932',
  },
  itemDato: {
    fontSize: 15,
    marginTop: 10,
    paddingTop: 5,
    color: '#252932',
  },
  itemNombre: {
    fontSize: 20,
    marginStart: 10,
    color: '#252932',
    textTransform: 'capitalize',
  },

  itemTitulo: {
    fontSize: 15,
    margin: 10,
    paddingTop: 5,
    fontWeight: 'bold',
    color: '#252932',
  },
  tituloIcon: {
    margin: 10,
  },
  viewTitulo: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  viewItem: {
    flexDirection: 'column',
  },
  viewEdit: {
    flexDirection: 'row',
  },
  cardCont: {
    margin: 10,
    backgroundColor: '#ffffff',
  },
  cerrarSesion: {
    backgroundColor: '#FFAD00',
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
  header: {
    paddingBottom: 90,
    backgroundColor: '#FFAD00',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    shadowColor: '#000000',
    shadowOpacity: 1,
    shadowRadius: 30,
    elevation: 10,
    shadowOffset: {width: 1, height: 13},
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  iconBack: {
    left: 10,
    top: 10,
    flex: 1,
  },
  iconEdit: {
    right: 10,
    top: 10,
  },
  title: {
    textAlign: 'left',
    color: '#FFFFFF',
    fontSize: 26,
    marginTop: 30,
    padding: 0,
  },
  cardNew: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 40,
    borderRadius: 25,
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    elevation: 10,
    shadowRadius: 15,
    shadowOffset: {width: 1, height: 13},
    paddingHorizontal: 30,
    paddingBottom: 0,
    marginTop: -50,
    padding: 20,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  input: {
    marginBottom: 10,
    backgroundColor: 'transparent',
  },
  guardar: {
    justifyContent: 'flex-end',
    backgroundColor: '#FFAD00',
    padding: 3,
    borderRadius: 5,
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: {width: 1, height: 13},
    marginHorizontal: 40,
    marginTop: 30,
    marginBottom: 10,
  },
});

export default CrearUsuario;
