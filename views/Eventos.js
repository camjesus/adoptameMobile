import React, {useEffect, useState} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {IconButton, Text} from 'react-native-paper';
import axios from 'axios';
import globalStyles from '../styles/global';
import EventoItem from '../components/ui/EventoItem';
import constantes from '../components/context/Constantes';
import {useIsFocused} from '@react-navigation/native';

const Eventos = ({navigation, route}) => {
  const [eventos, guardarEventos] = useState([]);
  const isFocused = useIsFocused(); //devuelve true si la pantalla tiene foco

  useEffect(() => {
    if (isFocused) {
      obtenerEventos();
    }
  }, [isFocused]);

  const obtenerEventos = async () => {
    try {
      // const url = `https://adoptameapp.herokuapp.com/adoptame/mobile/eventos`;
      const url = constantes.BASE_URL + 'eventos';
      const resultado = await axios.get(url);
      console.log(resultado.data);
      console.log('paso por obetener los eventos');
      guardarEventos(resultado.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={globalStyles.base}>
     <View style={globalStyles.header}>
        <IconButton
          icon="arrow-left"
          color="#FFFFFF"
          style={globalStyles.iconBack}
          onPress={() => navigation.goBack()}
          size={30}
        />
        <Text style={globalStyles.title}>Eventos</Text>
        <View style={globalStyles.viewR}></View>
      </View>
      <View>
        {eventos.length === 0 && (
          <Text style={globalStyles.msjAdvertencia}>
            No hay eventos disponibles
          </Text>
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
