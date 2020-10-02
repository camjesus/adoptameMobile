import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import axios from 'axios';
import {Button, Text, Card} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CardMascota from '../components/ui/CardMascota';

const Disponibles = ({navigation, route}) => {
  const [mascotasDisp, gDisponibles] = useState([]);
  const [filtro, gFiltro] = useState('');
  const [consultarDisponibles, gConsDisponibles] = useState(true);
  const [parametros, gParametros] = useState('');

  const obtenerMasDisponilbes = async () => {
    gFiltro(route.params);

    try {
      parametrosAPI();
      const url = `http://10.0.2.2:8090/adoptame/mobile/listaMascotasDisponible`;
      const resultado = await axios.get(url);
      console.log(resultado.data);
      console.log('paso por obetener mascotas Disponibles');
      gDisponibles(resultado.data);
    } catch (error) {
      console.loge(error);
    }
  };

  const parametrosAPI = () => {
    if (filtro) {
      console.log('filtro ' + filtro);
    }
  };

  useEffect(() => {
    if (consultarDisponibles) {
      obtenerMasDisponilbes();
      gConsDisponibles(false);
    }
  }, [consultarDisponibles]);

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

export default Disponibles;
