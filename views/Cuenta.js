import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, Card, HelperText, Button} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';

const Cuenta = ({navigation}) => {
  const [nombre, gNombre] = useState('');
  const [apellido, gApellido] = useState('');
  const [email, gEmail] = useState('');
  const [telefono, gTelefono] = useState('');

  useEffect(() => {
    obtenerDatosStorage();
  }, []);

  const obtenerDatosStorage = async () => {
    try {
      gNombre(await AsyncStorage.getItem('nombre'));
      gTelefono(await AsyncStorage.getItem('telefono'));
      gApellido(await AsyncStorage.getItem('apellido'));
      gEmail(await AsyncStorage.getItem('email'));
    } catch (error) {
      console.log(error);
    }
  };

  const logOut = () => {
    eliminoStorage();
  };

  const eliminoStorage = async () => {
    try {
      await AsyncStorage.removeItem('userId');
      await AsyncStorage.removeItem('nombre');
      await AsyncStorage.removeItem('apellido');
      await AsyncStorage.removeItem('email');
      await AsyncStorage.removeItem('telefono');
      navigation.navigate('Login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <Card containerStyle={{padding: 0}}>
        <HelperText>Mis datos</HelperText>
        <View style={style.contenedor}>
          <Text>Nombre: {nombre}</Text>
          <Text>Apellido: {apellido}</Text>
          <Text>Email: {email}</Text>
          <Text>Telefono: {telefono}</Text>
        </View>
      </Card>
      <Button mode="contained" onPress={() => logOut()}>
        Cerrar sesion
      </Button>
    </View>
  );
};

const style = StyleSheet.create({
  contenedor: {
    justifyContent: 'center',
  },
});
export default Cuenta;
