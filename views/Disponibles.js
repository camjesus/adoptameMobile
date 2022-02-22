import React, {useEffect, useState, useRef} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import axios from 'axios';
import globalStyle from '../styles/global';
import GetLocation from 'react-native-get-location';
import {Text, Button, IconButton} from 'react-native-paper';
import globalStyles from '../styles/global';
import constantes from '../components/context/Constantes';
import Transition from 'react-native-reanimated';
import AsyncStorage from '@react-native-community/async-storage';
import SwiperCard from '../components/ui/SwiperCard';
import HeaderDisponible from '../components/ui/HeaderDisponible';

const Disponibles = ({navigation, route, props}) => {
  const data = route.params;
  console.log('params');
  console.log(data?.data);
  const [mascotasDisp, gDisponibles] = useState([]);
  const [primerCarga, gPrimerCarga] = useState(true);
  const [consultarDisponibles, gConsDisponibles] = useState(true);
  const [estado, setEstado] = useState('DISPONIBLE');
  const isFirstTime = useRef(true);
  const [distancia, gDistancia] = useState(100);
  const paramsDefault = new URLSearchParams();
  const [index, setIndex] = useState(0);
  const [email, gEmail] = useState('none');
  const swiperRef = React.createRef();
  const transitionRef = React.createRef();
  const ANIMATION_DURATION = 200;
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  //const [count, setCount] = useState(0);
  //const [counter, setCounter] = useState(0);
  //const idTime = useRef();

  //Botones accion mascota
  const [colorBL, setColorBL] = useState('#f5bb05');
  const [colorBR, setColorBR] = useState('#9575cd');
  const [colorBC, setColorBC] = useState('#9575cd');

  //paramsDefault.append('estado', estado);
  paramsDefault.append('sexo', 'MACHO');
  paramsDefault.append('sexo', 'HEMBRA');

  paramsDefault.append('edad', 30);

  paramsDefault.append('tamanio', 'CHICO');
  paramsDefault.append('tamanio', 'MEDIANO');
  paramsDefault.append('tamanio', 'GRANDE');
  //paramsDefault.append('activa', true);
  paramsDefault.append('tipoMascota', 'PERRO');
  paramsDefault.append('tipoMascota', 'GATO');

  paramsDefault.append('distancia', distancia);

  const colors = {
    red: '#EC2379',
    blue: '#0070FF',
    gray: '#777777',
    white: '#ffffff',
    black: '#000000',
  };

  useEffect(() => {
    gConsDisponibles(true);
  }, [estado]);

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
      console.log('paso por obetener mascotas Disponibles');
      gDisponibles(resultado.data);
      hideModal();
    } catch (error) {
      console.log(error);
      hideModal();
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
    showModal();
    obtenerDatosStorage();
    setIndex(0);
    if (consultarDisponibles) {
      console.log('entra a disponi');
      //   obtenerMasDisponilbes();
      getCurrentPosition();
      gConsDisponibles(false);
    }
  }, [consultarDisponibles]);

  useEffect(() => {
    console.log('entro por la data');
    console.log(data);
    if (isFirstTime.current) {
      isFirstTime.current = false;
    } else {
      gConsDisponibles(true);
    }
    obtenerDatosStorage();
    //obtenerMasDisponilbes();
  }, [data]);

  const obtenerDatosStorage = async () => {
    try {
      gEmail('none');
      await AsyncStorage.getItem('email').then((value) => {
        gEmail(value);
      });
    } catch (error) {
      console.log(error);
    }
    console.log('email' + email);
    if (email == 'none') {
      navigation.navigate('BuscarStack', {screen: 'Login'});
    }
  };

  const onSwiped = () => {
    console.log(index);
    transitionRef.current.animateNextTransition();
    setIndex(index + 1);
  };

  const tipoBusqueda = (accion) => {
    switch (accion) {
      case 'ADOPCION':
        setColorBL('#f5bb05');
        setColorBC('#9575cd');
        setColorBR('#9575cd');
        break;
      case 'ENCONTRADO':
        setColorBL('#9575cd');
        setColorBC('#f5bb05');
        setColorBR('#9575cd');
        break;
      case 'BUSCADO':
        setColorBL('#9575cd');
        setColorBC('#9575cd');
        setColorBR('#f5bb05');
        break;
    }

    setEstado(accion);
  };

  return (
    <View style={globalStyle.base}>
      <View style={styles.header}>
        <IconButton
          icon="menu"
          color="#FFFFFF"
          style={styles.button}
          onPress={() => heandlePress()}
          size={30}
        />
        <Text style={styles.title}>Portal Pet</Text>
          <IconButton
            icon="filter"
            color="#FFFFFF"
            style={styles.iconEdit}
            onPress={goToFiltros}
            size={30}
          />
      </View>
      <View style={styles.tipoBusqueda}>
        <Button
          style={styles.buttonGL}
          mode="contained"
          color={colorBL}
          labelStyle={styles.labelStyleGroup}
          onPress={() => tipoBusqueda('ADOPCION')}>
          Adopción
        </Button>
        <Button
          style={styles.buttonG}
          mode="contained"
          color={colorBC}
          labelStyle={styles.labelStyleGroup}
          onPress={() => tipoBusqueda('ENCONTRADO')}>
          Encontrados
        </Button>
        <Button
          style={styles.buttonGR}
          mode="contained"
          color={colorBR}
          labelStyle={styles.labelStyleGroup}
          onPress={() => tipoBusqueda('BUSCADO')}>
          Buscados
        </Button>
      </View>
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
          onSwiped={onSwiped}
          codeindex={index}
          mascotasDisp={mascotasDisp}
          colors={colors}
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
    textAlign: "center",
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
export default Disponibles;
