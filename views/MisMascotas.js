import React, {useEffect, useState, useRef} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {Headline, FAB} from 'react-native-paper';
import axios from 'axios';
import globalStyles from '../styles/global';
import MascotaItem from '../components/ui/MascotaItem';
import AsyncStorage from '@react-native-community/async-storage';
import {Text, Card, IconButton} from 'react-native-paper';
import Maticons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ScrollView} from 'react-native-gesture-handler';
import {useIsFocused} from '@react-navigation/native';
import constantes from '../components/context/Constantes'; 

const MisMascotas = (props) => {
  const {navigation} = props;
  const [mascotas, guardarMascotas] = useState([]);
  const [userId, gUserId] = useState('');
  const mascotasRef = useRef(null);

  const [consultarMascotas, gConsMascotaApi] = useState(false); //si adopto una mascota es para saber si recargo la pagina
  const isFocused = useIsFocused(); //devuelve true si la pantalla tiene foco

  //const id = route.params;
  useEffect(() => {
    console.log('pase por el effect');
      obtenerDatosStorage();
      gConsMascotaApi(false);
  }, [isFocused, consultarMascotas]); //cuando la pantalla tiene el foco

  const obtenerDatosStorage = async () => {
    try {
      await AsyncStorage.getItem('userId');
      AsyncStorage.getItem('userId').then((value) => {
        gUserId(value);
        //voy a buscar las mascotas una vez que tengo cargado el id, ya que es asincrono
        obtenerMascotas(value);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerMascotas = async (value) => {
    try {
      const url = constantes.BASE_URL + `mascotasUsuario/${value}`;
      console.log(url);
      const resultado = await axios.get(url);
      console.log(resultado.data);
      console.log('paso por obetener mascotas');
      guardarMascotas(resultado.data);
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
        <Text style={globalStyles.title}>Mis mascotas</Text>
        <IconButton
          icon="plus"
          color="#FFFFFF"
          style={styles.iconEdit}
          onPress={() => {
            navigation.navigate('crearMascota', {mascotaItem: {
            activa: true,
            cambioFoto: true,
            descripcion: "",
            edad: "",
            estado: "ADOPCION",
            fechaCalculo: null,
            fechaFin: null,
            fechaInicio: null,
            fechaInicioS: null,
            foto_url: null,
            id: null,
            idAdoptante: null,
            image: null,
            latitud: null,
            longitud: null,
            nombre: null,
            raza: null,
            rescatista: null,
            rescatistaId: null,
            sexo: "MACHO",
            tamanio: "CHICO"
            }});
          }}
          size={30}
         />
      </View>
      <View>
        <View>
          {mascotas.length === 0  && (
            <Text style={globalStyles.msjAdvertencia}>
              Aún no cargaste mascotas
            </Text>
          )}
        </View>
      </View>

      <FlatList
        data={mascotas}
        renderItem={({item}) => (
          <MascotaItem
            mascota={item}
            consultarMascotas={gConsMascotaApi}
            navigation={navigation}
          />
        )}
        keyExtractor={(item) => JSON.stringify(item.id)}
      />
      <View style={styles.container}>
        <FAB
          icon="plus"
          style={styles.fab}
          color="#FFFFFF"
          onPress={() => {
            navigation.navigate('crearMascota', {mascotaItem: {
            activa: true,
            cambioFoto: true,
            descripcion: "",
            edad: "",
            estado: "ADOPCION",
            fechaCalculo: null,
            fechaFin: null,
            fechaInicio: null,
            fechaInicioS: null,
            foto_url: null,
            id: null,
            idAdoptante: null,
            image: null,
            latitud: null,
            longitud: null,
            nombre: null,
            raza: null,
            rescatista: null,
            rescatistaId: null,
            sexo: "MACHO",
            tamanio: "CHICO"
            }});
          }}
          animated="true"
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#9575cd',
  },
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
  iconEdit: {
    alignItems: 'baseline',
    alignContent: 'center',
    justifyContent: 'flex-end',
    marginEnd: 20,
    marginTop: 10
  },
});

export default MisMascotas;
