import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import axios from 'axios';
import CardMascota from '../components/ui/CardMascota';

const Disponibles = ({navigation, route}) => {
  const data = route.params;
  console.log('params');
  console.log(data);
  const pruebaString = '?tamanio=Mediano&tamanio=Grande&sexo=Macho&edad=15';
  const [mascotasDisp, gDisponibles] = useState([]);
  const [primerCarga, gPrimerCarga] = useState(true);
  const [consultarDisponibles, gConsDisponibles] = useState(true);
  const [parametros, gParametros] = useState('');
  const paramsDefault = new URLSearchParams();
  const paramsFiltro = new URLSearchParams();

  paramsDefault.append('tamanio', 'Pequenio');
  paramsDefault.append('tamanio', 'Mediano');
  paramsDefault.append('tamanio', 'Grande');

  paramsDefault.append('sexo', 'Macho');
  paramsDefault.append('sexo', 'Hembra');

  paramsDefault.append('edad', 30);
  console.log('default');

  console.log(paramsDefault);

  const obtenerMasDisponilbes = async () => {
    try {
      var request = {
        params: primerCarga === true ? paramsDefault : data.data,
      };
      console.log('request');
      console.log(request.params);
      const resultado = await axios.get(
        'http://10.0.2.2:8090/adoptame/mobile/listaMascotasDisponible',
        request,
      );
      console.log(resultado.data);
      console.log('paso por obetener mascotas Disponibles');
      gDisponibles(resultado.data);
      gPrimerCarga(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (consultarDisponibles) {
      console.log('entra a consultar');
      obtenerMasDisponilbes();
      gConsDisponibles(false);
    }
  }, [consultarDisponibles]);

  useEffect(() => {
    gConsDisponibles(true);
    obtenerMasDisponilbes();
  }, [data]);

  return (
    <View>
      <FlatList
        data={mascotasDisp}
        renderItem={({item}) => <CardMascota mascota={item} />}
        keyExtractor={(item) => JSON.stringify(item.id)}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  container: {
    flex: 1,
  },
});
export default Disponibles;
