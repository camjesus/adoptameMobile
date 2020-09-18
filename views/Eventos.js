import React, {useEffect, useState} from 'react';
import {View, FlatList} from 'react-native';
import {Headline} from 'react-native-paper';
import axios from 'axios';
import globalStyles from '../styles/global';
import EventoItem from '../components/ui/EventoItem';

const Eventos = ({navigation, route}) => {
  const [eventos, guardarEventos] = useState([]);
  const [consultarEventos, gConsultoEvento] = useState(true);
  useEffect(() => {
    const obtenerEventos = async () => {
      try {
        const url = `http://10.0.2.2:8090/adoptame/mobile/eventos`;
        const resultado = await axios.get(url);
        console.log(resultado.data);
        console.log('paso por obetener los eventos');
        guardarEventos(resultado.data);
      } catch (error) {
        console.loge(error);
      }
    };
    obtenerEventos();
  }, [consultarEventos]);

  return (
    <View>
      <Headline style={globalStyles.titulo}>
        {eventos.length > 0 ? 'Eventos del mes' : 'No hay eventos este mes!'}{' '}
      </Headline>
      <FlatList
        data={eventos}
        renderItem={({item}) => <EventoItem evento={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default Eventos;
