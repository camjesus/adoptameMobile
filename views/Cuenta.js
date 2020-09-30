import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, Card, HelperText, Button} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import  { LoginManager} from 'react-native-fbsdk';

const Cuenta = ({navigation}) => {
  const [nombre, gNombre] = useState('');
  const [apellido, gApellido] = useState('');
  const [email, gEmail] = useState('');
  const [telefono, gTelefono] = useState('');

  useEffect(() => {
    console.log("entre a cuena");
    obtenerDatosStorage();
  }, []);

  const obtenerDatosStorage = async () => {
    try {

       await AsyncStorage.getItem('nombre').then((value) => {
        gNombre(value);
      });
     
      await AsyncStorage.getItem('telefono').then((value) => {
        gTelefono(value);
      });

      await AsyncStorage.getItem('apellido').then((value) => {
        gApellido(value);
      });

      await AsyncStorage.getItem('email').then((value) => {
        gEmail(value);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const logOut = () => {
    eliminoStorage();
  };

  const eliminoStorage = async () => {
    try {
      console.log("borro del storage")
      
      await AsyncStorage.removeItem('nombre');
      await AsyncStorage.removeItem('apellido');
      await AsyncStorage.removeItem('email');
      await AsyncStorage.removeItem('telefono');
      await AsyncStorage.removeItem('userId').then((value)=>{
       // navigation.navigate('Login');
       // navigation.navigate('Login');
     //  LoginManager.logOut(); no seria necesario 

       navigation.navigate('Login');


      });
    } catch (error) {
      console.log("error eliminando del storage"+error);
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
          <Button mode="contained" onPress={() => logOut()}>
        Cerrar sesion
      </Button>
        </View>
        
      </Card>
      
     
    </View>
  );
};

const style = StyleSheet.create({
  contenedor: {
    justifyContent: 'center',
  },
});
export default Cuenta;
