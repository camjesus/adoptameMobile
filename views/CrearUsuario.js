import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  TextInput,
  Button,
  Portal,
  Dialog,
  Paragraph,
  Text,
} from 'react-native-paper';
import globalStyles from '../styles/global';
import axios from 'axios';
import {ScrollView} from 'react-native-gesture-handler';


const CrearUsuario = ({navigation}) => {
  const [nombre, gNombre] = useState('');
  const [apellido, gApellido] = useState('');
  const [email, gEmail] = useState('');
  const [password, gPassword] = useState('');
  const [passwordRep, gPasswordRep] = useState('');
  const [alerta, ingresarAlerta] = useState(false);
  const [mensaje, guardaMensaje] = useState('');

  const guardarUsuario = async () => {
    const ubicacion = '';
    if (
      nombre === '' ||
      apellido === '' ||
      email === '' ||
      password === ''
    ) {
      guardaMensaje('Todos los campos son requeridos');
      ingresarAlerta(true);
      return;
    }
    //password con una mayuscula , un numero y 8 caracteres
    let reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

    if (reg.test(password) === false) { 
      guardaMensaje('Las contraseñasdebe tener 8 caracteres una mayuscula y un numero');
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
    };
    console.log(nuevoUsuario);
    const resultado = await axios.post(
      'http://10.0.2.2:8090/adoptame/mobile/signInUser/',
      nuevoUsuario,
    );
    console.log(resultado.data.result);
    guardaMensaje(resultado.data.result);
    ingresarAlerta(true);
    if (resultado.data.status === 'SUCESS') {
      navigation.navigate('Login');
    }
  };
  return (
      <View style={globalStyles.base}>
        <View style={globalStyles.contenedor}>
          <Text style={style.titulo}> Nueva cuenta</Text>
          <TextInput
            label="Nombre"
            onChangeText={(texto) => gNombre(texto)}
            style={style.input}
            value={nombre}
          />
          <TextInput
            label="Apellido"
            onChangeText={(texto) => gApellido(texto)}
            style={style.input}
            value={apellido}
          />
   
          <TextInput
            label="E-Mail"
            onChangeText={(texto) => gEmail(texto)}
            style={style.input}
            value={email}
          />
          <TextInput
            label="Contraseña"
            onChangeText={(texto) => gPassword(texto)}
            style={style.input}
            value={password}
            secureTextEntry={true}

          />
        
          <TextInput
            label="Repetir contraseña"
            onChangeText={(texto) => gPasswordRep(texto)}
            style={style.input}
            value={passwordRep}
            secureTextEntry={true}

          />

          <Button
            style={style.ingresar}
            mode="contained"
            onPress={() => guardarUsuario()}>
            Crear
          </Button>

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
  titulo: {
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 30,
    color: '#FFFFFF',
  },
});
export default CrearUsuario;
