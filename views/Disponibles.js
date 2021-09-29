import React, {useEffect, useState, useRef} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import axios from 'axios';
import CardMascota from '../components/ui/CardMascota';
import globalStyle from '../styles/global';
import {ScrollView} from 'react-native-gesture-handler';
import GetLocation from 'react-native-get-location';
import {Text, Button, IconButton, Modal, Portal, ActivityIndicator} from 'react-native-paper';
import globalStyles from '../styles/global';
import constantes from '../components/context/Constantes';
import BarraFiltro from '../components/ui/BarraFiltro';
import BarraSuperior from '../components/ui/BarraSuperior';
import Swiper from 'react-native-deck-swiper';
import { Transitioning, Transition } from 'react-native-reanimated';
import AsyncStorage from '@react-native-community/async-storage';

const Disponibles = ({navigation, route, props}) => {
  const data = route.params;
  console.log('params');
  console.log(data?.data);
  const [mascotasDisp, gDisponibles] = useState([]);
  const [primerCarga, gPrimerCarga] = useState(true);
  const [consultarDisponibles, gConsDisponibles] = useState(true);
  const [estado, setEstado] = useState('ADOPCION');
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
  const [colorBL, setColorBL] = useState('#D0800A');
  const [colorBR, setColorBR] = useState('#FFAD00');
  const [colorBC, setColorBC] = useState('#FFAD00');

  const transition = (
    <Transition.Sequence>
      <Transition.Out
        type='slide-bottom'
        durationMs={ANIMATION_DURATION}
        interpolation='easeIn'
      />
      <Transition.Together>
        <Transition.In
          type='fade'
          durationMs={ANIMATION_DURATION}
          delayMs={ANIMATION_DURATION / 2}
        />
        <Transition.In
          type='slide-bottom'
          durationMs={ANIMATION_DURATION}
          delayMs={ANIMATION_DURATION / 2}
          interpolation='easeOut'
        />
      </Transition.Together>
    </Transition.Sequence>
  );
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
    paramsDefault.append('latitud', latitud);
    paramsDefault.append('longitud', longitud);
    paramsDefault.append('estado', estado);

    
      console.log();
      var request = {
        params: primerCarga === true ? paramsDefault : data.data,
      };
      console.log('request');
      console.log(request.params);
      const url = constantes.BASE_URL + 'mascotasPorFiltro';
    axios
      .get(url, request)
      .then((response) => {
        const resultado = response.data;
        console.log(resultado.data);
        console.log('paso por obetener mascotas Disponibles');
        gDisponibles(response.data);
        hideModal();
      })
    .catch((error) => {
        console.log(error);
        hideModal();
    });
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

  useEffect(() => {
    console.log(index);
    if (index === 2) {
      setIndex(0);
    }
  }, [index]);

  const tipoBusqueda = (accion) => {
    switch (accion) {
      case 'ADOPCION':
        setColorBL('#D0800A');
        setColorBC('#FFAD00');
        setColorBR('#FFAD00');
        break;
      case 'ENCONTRADO':
        setColorBL('#FFAD00');
        setColorBC('#D0800A');
        setColorBR('#FFAD00');
        break;
      case 'BUSCADO':
        setColorBL('#FFAD00');
        setColorBC('#FFAD00');
        setColorBR('#D0800A');
        break;
    }

    setEstado(accion);
  };

  return (
    <View style={globalStyle.base}>
      <View style={styles.header}>
        <BarraSuperior
          {...props}
          navigation={navigation}
          route={route}
          style={styles.barraSup}
        />
        <Text style={styles.title}>Portal Pet</Text>
        <IconButton
          icon="filter"
          color="#FFFFFF"
          style={styles.iconEdit}
          onPress={() =>{
            gPrimerCarga(false);
            navigation.navigate('filtros', {filtros: paramsDefault});
          }}
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
        <View style={styles.containerSwiper}>
          <Swiper
            cards={mascotasDisp}
            cardIndex={index}
            renderCard={(card) => (
              <CardMascota mascota={card} navigation={navigation} />
            )}
            onSwiper={onSwiped}
            infinite
            backgroundColor="#FFFFFF"
            //onTapCard={() => onSwiped()}
            cardVerticalMargin={50}
            stackSize={3}
            stackScale={10}
            stackSeparation={14}
            animateOverlayLabelsOpacity
            animateCardOpacity
            disableTopSwipe
            disableBottomSwipe
            overlayLabels={{
              left: {
                title: 'NOPE',
                style: {
                  label: {
                    backgroundColor: colors.red,
                    borderColor: colors.red,
                    color: colors.red,
                    borderWidth: 1,
                    fontSize: 24
                  },
                  wrapper: {
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    justifyContent: 'flex-start',
                    marginTop: 20,
                    marginLeft: -20
                  }
                }
              },
              right: {
                title: 'LIKE',
                style: {
                  label: {
                    backgroundColor: colors.blue,
                    borderColor: colors.blue,
                    color: colors.blue,
                    borderWidth: 1,
                    fontSize: 24
                  },
                  wrapper: {
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    marginTop: 20,
                    marginLeft: 20
                  }
                }
              }
            }}
          />
        </View>
      )}
       <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.modal}>
          <View style={styles.viewLogo}>
            <Image source={require('../img/casita.png')} style={styles.imglogo} /> 
            <Text style={styles.cargarText}>Buscando Mascotas</Text>
          </View>
          <ActivityIndicator animating={true} color="#FFAD00" size={50} />
        </Modal>
      </Portal>
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
    marginBottom: 1,
  },
   containerSwiper: {
    flex: 11,
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
  iconEdit: {
    marginTop: 'auto',
    alignItems: 'baseline',
    alignContent: 'center',
    justifyContent: 'flex-end'
  },
});
export default Disponibles;
