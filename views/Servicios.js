import React, {useEffect, useState} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {Headline} from 'react-native-paper';
import axios from 'axios';
import globalStyles from '../styles/global';
import ServicioItem from '../components/ui/ServicioItem';
import Maticons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Card, Text} from 'react-native-paper';
import constantes from '../components/context/Constantes'; 
import {useIsFocused} from '@react-navigation/native';

const Servicios = ({navigation, route}) => {
  const [servicios, guardarServicios] = useState([]);
  const [consultarServicios, gConsultoServicios] = useState(true);
  const isFocused = useIsFocused(); //devuelve true si la pantalla tiene foco


  const obtenerServicios = async () => {
    try {
     // const url = `https://adoptameapp.herokuapp.com/ /servicios`;
      const url =constantes.BASE_URL+`servicios`;
      const resultado = await axios.get(url);
      console.log(resultado.data);
      console.log('paso por obetener los Servicios');
      guardarServicios(resultado.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isFocused) {
     obtenerServicios();
    }
  },[isFocused]);

  return (
    <View style={globalStyles.base}>
      <Card style={styles.titulo}>
        <View style={styles.viewTitulo}>
          <Maticons
            style={styles.tituloIcon}
            name="hospital"
            size={30}
            color="#252932"
          />
          <Text style={styles.tituloTxt}>Servicios</Text>
        </View>
      </Card>
      <View>
          {servicios.length === 0  && (
              <Text style={globalStyles.msjAdvertencia} >No hay servicios disponibles</Text>
            )}
          </View>
      <FlatList
        data={servicios}
        renderItem={({item}) => <ServicioItem servicio={item} />}
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

export default Servicios;
