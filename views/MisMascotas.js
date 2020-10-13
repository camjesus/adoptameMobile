import React, {useEffect, useState} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {Headline, FAB} from 'react-native-paper';
import axios from 'axios';
import globalStyles from '../styles/global';
import MascotaItem from '../components/ui/MascotaItem';
import AsyncStorage from '@react-native-community/async-storage';
import {ScrollView} from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';



const MisMascotas = (props) => {
  const {navigation} = props;
  const [mascotas, guardarMascotas] = useState({});
  const [userId, gUserId] = useState('');

  const [consultarMascotas, gConsMascotaApi] = useState(false); //si adopto una mascota es para saber si recargo la pagina
  const isFocused = useIsFocused();//devuelve true si la pantalla tiene foco

  //const id = route.params;
  useEffect(() => {
    console.log('pase por el effect');
    if (isFocused) {
      obtenerDatosStorage();
      gConsMascotaApi(false);

    }
  }, [isFocused,consultarMascotas]);//cuando la pantalla tiene el foco 

 
 
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
      const url = `http://10.0.2.2:8090/adoptame/mobile/mascotasUsuario/${value}`;
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
      <View>
        <FlatList 
        ListHeaderComponent={ //cabecera, sino lo pongo asi no puedo usar scroll con flatlist

        <Headline style={globalStyles.titulo}>
          {mascotas.length > 0 ? 'Mis mascotas' : 'Aún no cargaste mascotas'}
        </Headline>

        }
          data={mascotas}
          ListEmptyComponent={<View></View>}
          renderItem={({item}) => <MascotaItem mascota={item} consultarMascotas={gConsMascotaApi} />}
          keyExtractor={(item) => JSON.stringify(item.id)}

        
        />
      <FAB
            icon="plus"
            style={styles.fab}
            onPress={() => {
              navigation.navigate('crearMascota');
            }}
            animated="true"
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

export default MisMascotas;
