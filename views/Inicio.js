import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, View, Button} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const Inicio = ({navigation}) => {
  const [email, gEmail] = useState('none');
  const [first, setFirst] = useState();

  const irALogin = () => {
    setFirst(false);
    navigation.navigate('Login');
  };

  useEffect(() => {
    //obtenerDatosStorage();
  }, [])

  const obtenerDatosStorage = async () => {
    try {
      gEmail('none');
      await AsyncStorage.getItem('email').then((value) => {
        gEmail(value);
      });
    } catch (error) {
      console.log(error);
    }
    console.log('email' + email);
    if (first && email != 'none') {
      navigation.navigate('BuscarStack', {screen: 'Disponibles'});
    }
    if (first == false && email == 'none') {
      navigation.navigate('BuscarStack', {screen: 'Login'});
    }
  };

  return (
    <View style={style.contenedor}>
      <Text>Bienvenido a Portal Pet</Text>
      <Button title="Empezar" onPress={() => irALogin()} />
    </View>
  );
};

const style = StyleSheet.create({
  contenedor: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default Inicio;
