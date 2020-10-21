import React, {useEffect, useState} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {Headline, Card, Text} from 'react-native-paper';
import axios from 'axios';
import globalStyles from '../styles/global';
import EventoItem from '../components/ui/EventoItem';
import Maticons from 'react-native-vector-icons/MaterialCommunityIcons';

const Eventos = ({navigation, route}) => {
  const [eventos, guardarEventos] = useState([]);
  const [consultarEventos, gConsultoEvento] = useState(true);
  useEffect(() => {
    const obtenerEventos = async () => {
      try {
        const url = `https://adoptameapp.herokuapp.com/adoptame/mobile/eventos`;
        const resultado = await axios.get(url);
        console.log(resultado.data);
        console.log('paso por obetener los eventos');
        guardarEventos(resultado.data);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerEventos();
  }, [consultarEventos]);

  //<Headline style={globalStyles.titulo}>
  //{eventos.length > 0 ? 'Eventos del mes' : 'No hay eventos este mes!'}{' '}
  //</Headline>

  return (
    <View style={globalStyles.base}>
      <Card style={styles.titulo}>
        <View style={styles.viewTitulo}>
          <Maticons
            style={styles.tituloIcon}
            name="calendar-multiple"
            size={30}
            color="#252932"
          />
          <Text style={styles.tituloTxt}>Eventos</Text>
        </View>
      </Card>
      <View>
          {eventos.length === 0  && (
              <Text style={globalStyles.msjAdvertencia} >No hay eventos disponibles</Text>
            )}
          </View>
      <FlatList
        data={eventos}
        renderItem={({item}) => <EventoItem evento={item} />}
        keyExtractor={(item) => JSON.stringify(item.id)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
  viewTitulo: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  tituloIcon: {
    margin: 10,
  },
});

export default Eventos;
