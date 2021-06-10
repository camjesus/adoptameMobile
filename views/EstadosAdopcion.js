
import React, {useState, useEffect} from 'react';
import {StyleSheet, View, ActivityIndicator, Image} from 'react-native';
import Maticons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button, Text, ToggleButton, IconButton, FAB} from 'react-native-paper';
import {Icon} from 'react-native-elements';
import globalStyles from '../styles/global';
import ProgressCircle from 'react-native-progress-circle';
import constantes from '../components/context/Constantes';
import axios from 'axios';


const EstadosAdopcion = ({navigation, route, props}) => {
  const {params} = route;
  const {mascotaItem} = params;
  const [nombreSexo, gNombreSexo] = useState('gender-male');
  const [diasAdaptacion, setDiasAdaptacion] = useState(0);
  const [porcentajeDias, setPorcentajeDias] = useState(0);
  const [adoptado, setAdoptado] = useState(0);
  const [botonLabel, setBotonLabel] = useState('');
  const [botonDisabled, setBotonDisabled] = useState(false);

  useEffect(() => {
    tomoNombreIcon();
    aplicoEstados();
  }, []);

  const tomoNombreIcon = () => {
    if (mascotaItem.sexo.toUpperCase() === 'MACHO') {
      gNombreSexo('gender-male');
    } else {
      gNombreSexo('gender-female');
    }
  };

  const aplicoEstados = () => {
    var date = new Date('05/31/2021');
    //var date = new Date(mascotaItem.fechaInicio);
    var now = new Date();
    if (mascotaItem.estado == 'ADOPCION') {
      setBotonLabel('Comenzar adaptación');
    }
    if (mascotaItem.estado == 'ADOPTADA') {
      setBotonLabel('ADOPTADA!');
      setBotonDisabled(true);
      setAdoptado(100);
    }

    if (mascotaItem.estado == 'SEGUIMIENTO') {
      var dias = Math.round(Math.abs(date - now) / (1000 * 60 * 60 * 24));
      setPorcentajeDias(Math.round((dias * 100) / 15));
      setDiasAdaptacion(dias);
      console.log(diasAdaptacion);
      if (dias >= 15) {
        setBotonLabel('ADOPTADO!');
      } else {
        setBotonLabel('Cancelar Adaptación');
      }
    }
  };


  const cambiarEstado = async (id, estado, finSeguimiento) => {
    if (estado == 'ADOPCION') {
      estado = 'SEGUIMIENTO';
    } else if (estado == 'SEGUIMIENTO') {
      estado = 'ADOPTADA';
      setBotonDisabled(true);
      if (finSeguimiento) {
        estado = 'ADOPCION';
        setAdoptado(100);
        setBotonDisabled(false);
        setBotonLabel('Comenzar adaptación');
      }
    }

    const postEstado = {id, estado: estado};
    mascotaItem.estado = estado;
    const url = constantes.BASE_URL + 'estadoMascota';

    const resultado = await axios.post(url, postEstado);
    aplicoEstados();
  };

  return (
      <View>
    <View style={style.header}>
    <IconButton
        icon="arrow-left"
        color="#FFFFFF"
        style={globalStyles.iconBack}
        onPress={() => navigation.goBack()}
        size={30}
    />
    <Text style={globalStyles.title}>{mascotaItem.nombre}</Text>
    <IconButton
          icon="pencil"
          color="#FFFFFF"
          style={style.iconEdit}
          onPress={() =>
            navigation.navigate('crearMascota', {mascotaItem: mascotaItem})
          }
          size={30}
         />
    </View>
    <View style={style.cardNew}>
        <View style={style.viewMascota}>
          <Image
            style={style.imgMascota}
            source={{
              uri: mascotaItem.foto_url,
            }}
          />
        </View>
          <View style={style.viewDetalle}>
         <View style={style.infoMascota}>
          <View style={style.containerH1}>
            <Text style={style.nombre}>{mascotaItem.nombre}</Text>
            <Text style={style.edad}>,{mascotaItem.edad} años</Text>
            <Maticons
              style={style.iconSexo}
              name={nombreSexo}
              size={30}
              color="#FFAD00"
            />
          </View>
        </View>
        </View>
        <View style={style.rowEstado}>
        <View style={style.columnEstado}>
        <ProgressCircle
            percent={100}
            radius={40}
            borderWidth={8}
            color="#FFAD00"
            shadowColor="#999"
            bgColor="#fff"
            >
            <Image source={require('../img/home-search.png')} style={style.imglogo} /> 
        </ProgressCircle>
        <Text style={style.textEstado}>Búsqueda</Text>
        </View>
        <View style={style.columnEstadoCen}>
        <ProgressCircle
            percent={porcentajeDias}
            radius={40}
            borderWidth={8}
            color="#FFAD00"
            shadowColor="#999"
            bgColor="#fff"
            >
            <Image source={require('../img/dots-horizontal.png')} style={style.imglogo} /> 
        </ProgressCircle>
        <Text style={style.textEstado}>Adaptación</Text>
        </View>
        <View style={style.columnEstado}>
        <ProgressCircle
            percent={adoptado}
            radius={40}
            borderWidth={8}
            color="#FFAD00"
            shadowColor="#999"
            bgColor="#fff"
            >
            <Image source={require('../img/home-heart.png')} style={style.imglogo} /> 
        </ProgressCircle>
        <Text style={style.textEstado}>Adoptado</Text>
        </View>
        </View>
        <View style={style.rowDias}>
        <View style={style.colDia}>
            <Text style={style.textDia}>Día:</Text>
            <Maticons
            style={style.icoCal}
              name="calendar"
              size={24}
              color="#000000"
            />
            </View>
            <Text style={style.textNumber}>{diasAdaptacion}</Text>
        </View>
        {mascotaItem.estado == 'SEGUIMIENTO' && (
            <Button
            labelStyle={style.label}
            color="#000000"
            mode="contained"
            compact={true}
            onPress={() =>
              cambiarEstado(mascotaItem.id, mascotaItem.estado, true)
            }>
            CANCELAR
          </Button>
        )}
        <Button
          labelStyle={style.label}
          style={style.guardar}
          disabled={botonDisabled}
          mode="contained"
          compact={true}
          onPress={() =>
            cambiarEstado(mascotaItem.id, mascotaItem.estado, false)
          }>
          {botonLabel}
        </Button>
        </View>
    </View>
  );
};

const style = StyleSheet.create({
  columnEstadoCen: {
    flexDirection: 'column',
    marginHorizontal: 10,
  },
  icoCal: {
    marginStart: 5,
  },
  colDia: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'baseline'
  },
  textDia: {
    fontSize: 19,
    justifyContent: 'flex-start',
    textAlign: 'right'
  },
  rowDias: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginHorizontal: "30%",
    alignContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    borderWidth: 4,
    padding: 'auto',
    paddingVertical: 5,
    borderColor: "#FFAD00",
    borderRadius: 20,
  },
  textNumber: {
    fontSize: 30,
  },
  label: {
    color: "#FFFFFF"
    },
  guardar: {
    justifyContent: 'flex-end',
    backgroundColor: '#FFAD00',
    padding: 3,
    borderRadius: 5,
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: {width: 1, height: 13},
    marginHorizontal: 40,
    marginTop: 'auto',
    marginBottom: 20,
  },
  iconEdit: {
    right: 10,
    top: 10,
    flex: 2,
  },
  textEstado: {
    textAlign: 'center',
    marginTop: 5,
    color: "#D0800A",
  },
  columnEstado: {
    flexDirection: 'column',
  },
  rowEstado: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: "10%",
    alignContent: 'center',
    alignItems: 'center',
    marginTop: 20
    },
  imglogo: {
    height: 40,
    width: 40,
    opacity: 0.3,
    },
  viewDetalle: {
    marginHorizontal: 10,
    padding: 10,
    paddingTop: 0,
  },
  viewDes: {
    marginVertical: 'auto',
    marginHorizontal: 20,
    marginBottom: 0,
  },
  header: {
    paddingBottom: 90,
    backgroundColor: '#FFAD00',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    shadowColor: '#000000',
    shadowOpacity: 1,
    shadowRadius: 30,
    elevation: 10,
    shadowOffset: {width: 1, height: 13},
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  infoMascota: {
    marginTop: 10,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'baseline'
  },
  cardNew: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 40,
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    elevation: 10,
    shadowRadius: 15,
    shadowOffset: {width: 1, height: 13},
    marginTop: -80,
    flexDirection: 'column',
  },
  imgMascota: {
    height: 200,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    borderRadius: 10,
    margin: 0,
    shadowColor: '#202020',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 5,
  },
  nombre: {
    fontSize: 25,
    marginBottom: 'auto',
  },
  edad: {
    fontSize: 25,
    marginBottom: 'auto',
    },
    iconSexo: {
    marginRight: 'auto',
    marginStart: 5,
    },
    containerH1: {
    flexDirection: 'row',
    flex: 3,
    alignItems: 'baseline',
    alignContent: 'flex-start'
    },
});
export default EstadosAdopcion;
