import React, {useEffect, useState,useRef} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import axios from 'axios';
import CardMascota from '../components/ui/CardMascota';
import globalStyle from '../styles/global';
import {ScrollView} from 'react-native-gesture-handler';
import GetLocation from 'react-native-get-location';
import {Text} from 'react-native-paper';
import globalStyles from '../styles/global';


const Disponibles = ({navigation, route}) => {
  const data = route.params;
  console.log('params');
  console.log(data);
  const [mascotasDisp, gDisponibles] = useState([]);
  const [primerCarga, gPrimerCarga] = useState(true);
  const [consultarDisponibles, gConsDisponibles] = useState(true);
  const [parametros, gParametros] = useState('');
  const isFirstTime = useRef(true);
  const [distancia, gDistancia] = useState(100);
  const paramsDefault = new URLSearchParams();


 


  const obtenerMasDisponilbes = async (latitud,longitud) => {


    paramsDefault.append('tamanio', 'CHICO');
    paramsDefault.append('tamanio', 'MEDIANO');
    paramsDefault.append('tamanio', 'GRANDE');
  
    paramsDefault.append('sexo', 'MACHO');
    paramsDefault.append('sexo', 'HEMBRA');
  
    paramsDefault.append('edad', 30);
    paramsDefault.append("latitud",latitud);
    paramsDefault.append("longitud",longitud);
    paramsDefault.append("distancia",distancia);


    try {
      
      var request = {
        params: primerCarga === true ? paramsDefault : data.data,
      };
      console.log('request');
      console.log(request.params);
      const resultado = await axios.get(
        'http://10.0.2.2:8090/adoptame/mobile/listaMascotasDisponible',
        request,
      );
      console.log(resultado.data);
      console.log('paso por obetener mascotas Disponibles');
      gDisponibles(resultado.data);
      gPrimerCarga(false);
    } catch (error) {
      console.log(error);
    }
  };


  const   getCurrentPosition = async () =>{
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then((location) => {
        console.log(location);

       
          console.log(location);
         
          obtenerMasDisponilbes(location.latitude,location.longitude); 
      })
      .catch((error) => {
        const {code, message} = error;
        console.warn(code, message);
      });

      
  }


  useEffect(() => {
     

    if (consultarDisponibles) {
      console.log('entra a consultar');
   //   obtenerMasDisponilbes();
     getCurrentPosition();
      gConsDisponibles(false);
    }
  }, [consultarDisponibles]);


  useEffect(() => {

    if (isFirstTime.current) {
      isFirstTime.current = false;
    } else {
      gConsDisponibles(true);
    }    
  //  obtenerMasDisponilbes();
  }, [data]);

  return (
    <View style={globalStyle.base}>
       <View>
          {mascotasDisp.length === 0  && (
              <Text style={globalStyles.msjDisponibles} >No hay mascotas disponibles para los filtros aplicados</Text>
            )}
          </View>
      <FlatList
        data={mascotasDisp}
        renderItem={({item}) => <CardMascota mascota={item} />}
        keyExtractor={(item) => JSON.stringify(item.id)}
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
export default Disponibles;
