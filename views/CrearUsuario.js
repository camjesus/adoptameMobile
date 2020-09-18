import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  TextInput,
  Headline,
  Button,
  Portal,
  Dialog,
  Paragraph,
} from 'react-native-paper';
import globalStyles from '../styles/global';
import axios from 'axios';
import {ScrollView} from 'react-native-gesture-handler';

const CrearUsuario = ({navigation}) => {
  const [nombre, gNombre] = useState('');
  const [apellido, gApellido] = useState('');
  const [email, gEmail] = useState('');
  const [telefono, gTelefono] = useState('');
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
      telefono === '' ||
      password === ''
    ) {
      guardaMensaje('Todos los campos son requeridos');
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
      telefono,
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
    <ScrollView>
      <View style={globalStyles.contenedor}>
        <Headline style={globalStyles.titulo}> Nueva cuenta</Headline>
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
          label="Teléfono"
          onChangeText={(texto) => gTelefono(texto)}
          style={style.input}
          value={telefono}
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
        />
        <TextInput
          label="Repetir contraseña"
          onChangeText={(texto) => gPasswordRep(texto)}
          style={style.input}
          value={passwordRep}
        />

        <Button mode="contained" onPress={() => guardarUsuario()}>
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
    </ScrollView>
  );
};

const style = StyleSheet.create({
  input: {
    marginBottom: 20,
    backgroundColor: 'transparent',
  },
});
export default CrearUsuario;
