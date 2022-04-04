import React, {useEffect, useState, useRef} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import axios from 'axios';
import globalStyle from '../styles/global';
import GetLocation from 'react-native-get-location';
import {Text, Button, IconButton} from 'react-native-paper';
import globalStyles from '../styles/global';
import constantes from '../components/context/Constantes';
import AsyncStorage from '@react-native-community/async-storage';
import SwiperCard from '../components/ui/SwiperCard';
import HeaderDisponible from '../components/ui/HeaderDisponible';

const Home = ({navigation, route, props}) => {
  const data = route.params;
  console.log('params');
  console.log(data?.data);
  const [mascotasDisp, gDisponibles] = useState([]);
  const [primerCarga, gPrimerCarga] = useState(true);
  const [consultarHome, gConsHome] = useState(true);
  const [estado, setEstado] = useState('ADOPCION');
  const isFirstTime = useRef(true);
  const [distancia] = useState(100);
  const paramsDefault = new URLSearchParams();
  const [index, setIndex] = useState(0);

  //Botones accion mascota

  paramsDefault.append('sexo', 'MACHO');
  paramsDefault.append('sexo', 'HEMBRA');
  paramsDefault.append('edad', 30);
  paramsDefault.append('tamanio', 'CHICO');
  paramsDefault.append('tamanio', 'MEDIANO');
  paramsDefault.append('tamanio', 'GRANDE');
  paramsDefault.append('tipoMascota', 'PERRO');
  paramsDefault.append('tipoMascota', 'GATO');
  paramsDefault.append('distancia', distancia);

  useEffect(() => {
    gConsHome(true);
  }, [estado]);

  const onSwiped = () => {
    setIndex(index + 1);
  };

  const obtenerMasDisponilbes = async (latitud, longitud) => {
    paramsDefault.append('latitud', -34.634491); //latitud);
    paramsDefault.append('longitud', -58.4648853); //longitud);
    paramsDefault.append('estado', estado);

    console.log();
    var request = {
      params: primerCarga === true ? paramsDefault : data.data,
    };
    console.log('request');
    console.log(request.params);
    const url = constantes.BASE_URL + 'mascotasPorFiltro';
    try {
      const resultado = await axios.get(url, request);
      console.log(resultado.data);
      console.log('paso por obetener mascotas Home');
      gDisponibles(resultado.data);
    } catch (error) {
      console.log(error);
    }
  };

  const goToFiltros = () => {
    gPrimerCarga(false);
    navigation.navigate('filtros', {filtros: paramsDefault});
  };

  const heandlePress = () => {
    navigation.toggleDrawer();
  };

  const getCurrentPosition = async () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then((location) => {
        console.log(location);
        obtenerMasDisponilbes(location.latitude, location.longitude);
      })
      .catch((error) => {
        const {code, message} = error;
        console.warn(code, message);
      });
  };

  useEffect(() => {
    setIndex(0);
    if (consultarHome) {
      console.log('entra a disponi');
      //   obtenerMasDisponilbes();
      getCurrentPosition();
      gConsHome(false);
    }
  }, [consultarHome]);

  useEffect(() => {
    console.log('entro por la data');
    console.log(data);
    if (isFirstTime.current) {
      isFirstTime.current = false;
    } else {
      gConsHome(true);
    }
    //obtenerMasDisponilbes();
  }, [data]);

return (
    <View style={globalStyle.base}>
      <HeaderDisponible
      heandlePress={heandlePress}
      goToFiltros={goToFiltros}
      estado={estado}
      styles={styles}
      setEstado={setEstado}
      />
      {mascotasDisp.length === 0 && (
        <View>
          <Text style={globalStyles.msjAdvertencia}>
            No hay mascotas disponibles para los filtros aplicados
          </Text>
        </View>
      )}
      {mascotasDisp.length > 0 && (
        <SwiperCard
          {...props}
          navigation={navigation}
          mascotasDisp={mascotasDisp}
          onSwiped={onSwiped}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cargarText: {
    textAlign: 'center',
    fontSize: 16,
    marginVertical: 5,
    marginBottom: 10,
  },
  viewLogo: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imglogo: {
    width: 120,
    height: 120,
  },
  modal: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    flex: 1,
  },
  tipoBusqueda: {
    flexDirection: 'row',
    margin: 0,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  title: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 30,
    marginTop: 20,
    padding: 0,
    fontFamily: 'ArchitectsDaughter-Regular',
    flex: 5,
    marginBottom: 0,
  },
  text: {
    textAlign: 'center',
    fontSize: 50,
  },
  header: {
    backgroundColor: '#FFAD00',
    flexDirection: 'row',
    margin: 0,
    paddingBottom: 5,
  },
  containerSwiper: {
    backgroundColor: '#FFFFFF',
    margin: 0,
    padding: 0,
  },
  labelStyleGroup: {
    fontSize: 15,
    color: '#FFFFFF',
    padding: 0,
    margin: 0,
  },
  buttonGL: {
    borderBottomLeftRadius: 30,
    flex: 2,
  },
  buttonGR: {
    borderBottomRightRadius: 30,
    flex: 2,
  },
  buttonG: {
    marginHorizontal: 1,
  },
});
export default Home;
