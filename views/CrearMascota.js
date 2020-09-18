import React from 'react';
import {StyleSheet, View} from 'react-native';
import {TextInput, Headline, Button} from 'react-native-paper';
import globalStyles from '../styles/global';
import axios from 'axios';

const CrearMascota = ({route}) => {
  const {gConsMascotaApi} = route.params;

  const guardarMascota = async () => {
    try {
      await axios.post('url de guardar mascota');
      gConsMascotaApi(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={globalStyles.contenedor}>
      <Headline style={globalStyles.titulo}> Crear nueva mascota</Headline>
      <TextInput label="Nombre" />
      <Button mode="contained" onPress={() => guardarMascota()}>
        Ingresar
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
export default CrearMascota;
