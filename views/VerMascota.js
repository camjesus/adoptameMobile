import React from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import {Headline, Text, Button} from 'react-native-paper';
import globalStyle from '../styles/global';
import axios from 'axios';

const VerMascota = ({navigation, route}) => {
  const {nombre, descripcion, id} = route.params.item;
  const {gConsMascotaApi} = route.params;
  console.log(route.params);
  const mostrarConfirmacion = () => {
    Alert.alert(
      'Deseas eliminar esta mascota?',
      'Esta mascota no se podrá recuperar',
      [
        {text: 'Si, eliminar', onPress: () => eliminarMascota()},
        {text: 'Cancelar', style: 'cancel'},
      ],
    );
  };
  const eliminarMascota = async () => {
    const url = `http://10.0.2.2:3000/usuarios/${id}`;
    console.log(url);
    try {
      await axios.delete(url);
      gConsMascotaApi(true);
      navigation.navigate('MisMascotas');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={globalStyle.titulo}>
      <Headline>{nombre}</Headline>
      <Text>{descripcion}</Text>
      <Button
        mode="contained"
        icon="cancel"
        onPress={() => mostrarConfirmacion()}>
        eliminar
      </Button>
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
export default VerMascota;
