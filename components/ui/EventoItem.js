import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, Card} from 'react-native-paper';

import Maticons from 'react-native-vector-icons/MaterialCommunityIcons';

const EventoItem = ({evento}) => {
  console.log('evento');
  console.log(evento);
  const espacio = ' - ';

  return (
    <Card style={style.titulo}>
      <View style={style.viewHeader}>
        <View>
          <Maticons
            style={style.tituloIcon}
            name="calendar-week"
            size={40}
            color="#252932"
          />
        </View>
        <Text style={style.titHeader}>{evento.lugar}</Text>
      </View>
      <View style={style.viewEvento}>
        <View style={style.viewDesc}>
          <View style={style.viewRow}>
            <Text style={style.nombreText}>Dirección: </Text>
            <Text style={style.descripcionText}>{evento.direccion}</Text>
          </View>

          <View style={style.viewRow}>
            <Text style={style.nombreText}>Barrio: </Text>
            <Text style={style.descripcionText}>{evento.barrio}</Text>
          </View>
          <View style={style.viewRow}>
            <Text style={style.nombreText}>Día y Horario: </Text>
            <Text style={style.descripcionText}>
              {evento.dias}
              {espacio}
              {evento.horarios}
            </Text>
          </View>
          <View style={style.viewRow}>
            <Text style={style.nombreText}>Descripción: </Text>
            <Text style={style.descripcionText}>{evento.consultas}</Text>
          </View>
        </View>
      </View>
    </Card>
  );
};

const style = StyleSheet.create({
  titulo: {
    margin: 10,
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#ffffff',
  },
  nombreText: {
    fontWeight: 'bold',
    color: '#252932',
  },
  descripcionText: {
    fontSize: 13,
    color: '#252932',
  },
  viewEvento: {
    flexDirection: 'row',
    margin: 15,
  },
  viewDesc: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  tituloIcon: {
    margin: 10,
  },
  viewRow: {
    flexDirection: 'row',
  },
  viewHeader: {
    backgroundColor: '#FF9D4E',
    flexDirection: 'row',
    borderBottomColor: '#252932',
    borderBottomWidth: 1,
  },
  titHeader: {
    fontSize: 20,
    marginVertical: 20,
    fontWeight: 'bold',
    color: '#252932',
    paddingStart: 10,
  },
});
export default EventoItem;
