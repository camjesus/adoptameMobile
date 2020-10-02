import React, {useEffect, useState} from 'react';
import {View, FlatList} from 'react-native';
import {Headline} from 'react-native-paper';
import axios from 'axios';
import globalStyles from '../styles/global';
import ServicioItem from '../components/ui/ServicioItem';

const Servicios = ({navigation, route}) => {
  const [servicios, guardarServicios] = useState([]);
  const [consultarServicios, gConsultoServicios] = useState(true);
  useEffect(() => {
    const obtenerServicios = async () => {
      try {
        const url = `http://10.0.2.2:8090/adoptame/mobile/servicios`;
        const resultado = await axios.get(url);
        console.log(resultado.data);
        console.log('paso por obetener los Servicios');
        guardarServicios(resultado.data);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerServicios();
  }, [consultarServicios]);

  return (
    <View>
      <Headline style={globalStyles.titulo}>
        {servicios.length > 0 ? 'Servicios' : 'No hay servicios disponibles'}{' '}
      </Headline>
      <FlatList
        data={servicios}
        renderItem={({item}) => <ServicioItem servicio={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default Servicios;
