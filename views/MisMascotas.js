import React, {useEffect, useState} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {Headline, FAB} from 'react-native-paper';
import axios from 'axios';
import globalStyles from '../styles/global';
import MascotaItem from '../components/ui/MascotaItem';
import AsyncStorage from '@react-native-community/async-storage';

const MisMascotas = (props) => {
  const {navigation} = props;
  const [mascotas, guardarMascotas] = useState({});
  const [userId, gUserId] = useState('');

  const [consultarMascotas, gConsMascotaApi] = useState(true);
  //const id = route.params;
  useEffect(() => {
    obtenerDatosStorage();
    const obtenerMascotas = async () => {
      try {
        const url = `http://10.0.2.2:8090/adoptame/mobile/mascotasUsuario/{userId}`;
        console.log(userId);
        const resultado = await axios.get(url);
        console.log(resultado.data);
        console.log('paso por obetener mascotas');
        guardarMascotas(resultado.data);
      } catch (error) {
        console.loge(error);
      }
    };
    if (consultarMascotas) {
      obtenerMascotas();
      gConsMascotaApi(false);
    }
  }, [consultarMascotas]);

  const obtenerDatosStorage = async () => {
    try {
      const id = await AsyncStorage.getItem('userId');
      console.log('id storage');
      console.log(id);
      gUserId(id);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View>
      <View>
        <Headline style={globalStyles.titulo}>
          {mascotas.length > 0 ? 'Mis mascotas' : 'Aún no cargaste mascotas'}
        </Headline>
        <FlatList
          data={mascotas}
          renderItem={({item}) => <MascotaItem mascota={item} />}
          keyExtractor={(item) => item.id}
          onPress={(item) => {
            navigation.navigate('VerMascota', {item});
          }}
        />
      </View>
      <View>
        <FAB
          icon="plus"
          style={styles.fab}
          onPress={() => {
            navigation.navigate('CrearMascota', {gConsMascotaApi});
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
  },
});

export default MisMascotas;
