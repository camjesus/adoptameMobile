import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, Card, HelperText, Button} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import {LoginManager} from 'react-native-fbsdk';
import Maticons from 'react-native-vector-icons/MaterialCommunityIcons';

const Cuenta = ({navigation}) => {
  const [nombre, gNombre] = useState('');
  const [apellido, gApellido] = useState('');
  const [email, gEmail] = useState('');
  const espacio = ' ';
  useEffect(() => {
    console.log('entre a cuena');
    obtenerDatosStorage();
  }, []);

  const obtenerDatosStorage = async () => {
    try {
      await AsyncStorage.getItem('nombre').then((value) => {
        gNombre(value);
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
      console.log('borro del storage');

      await AsyncStorage.removeItem('nombre');
      await AsyncStorage.removeItem('apellido');
      await AsyncStorage.removeItem('email');

      await AsyncStorage.removeItem('userId').then((value) => {
        navigation.navigate('Login');
      });
    } catch (error) {
      console.log('error eliminando del storage' + error);
    }
  };

  return (
    <View style={style.base}>
      <Card style={style.titulo}>
        <View style={style.viewTitulo}>
          <Maticons
            style={style.tituloIcon}
            name="account"
            size={30}
            color="#252932"
          />
          <Text style={style.tituloTxt}>Mis datos</Text>
        </View>
      </Card>
      <Card style={style.cardCont}>
        <View style={style.contenedor}>
          <View style={style.viewItem}>
            <Maticons
              style={style.tituloIcon}
              name="account"
              size={25}
              color="#252932"
            />
            <Text style={style.itemTitulo}>Nombre y Apellido:</Text>
            <Text style={style.itemNombre}>
              {nombre}
              {espacio}
              {apellido}
            </Text>
          </View>

          <View style={style.viewItem}>
            <Maticons
              style={style.tituloIcon}
              name="email"
              size={25}
              color="#252932"
            />
            <Text style={style.itemTitulo}>Email: </Text>
            <Text style={style.itemDato}>{email}</Text>
          </View>
        </View>
      </Card>
      <Button
        style={style.cerrarSesion}
        mode="contained"
        onPress={() => logOut()}>
        Cerrar sesion
      </Button>
    </View>
  );
};

const style = StyleSheet.create({
  base: {
    backgroundColor: '#252932',
    flex: 1,
  },
  contenedor: {
    justifyContent: 'center',
    margin: 10,
  },
  titulo: {
    margin: 10,
    justifyContent: 'center',
    padding: 10,
    flexDirection: 'row',
    backgroundColor: '#ffffff',
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
    fontSize: 15,
    marginTop: 10,
    paddingTop: 5,
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
    flexDirection: 'row',
  },
  cardCont: {
    margin: 10,
    backgroundColor: '#ffffff',
  },
  cerrarSesion: {
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
});
export default Cuenta;
