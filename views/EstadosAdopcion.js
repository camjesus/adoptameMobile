
import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, View, ActivityIndicator, Image} from 'react-native';
import Maticons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Button,
  Text,
  IconButton,
  Portal,
  Dialog,
  Paragraph,
  Modal,
} from 'react-native-paper';
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
  const [porcentajeAnima, setPorcentajeAnima] = useState(100);
  const [visible, setVisible] = React.useState(false);
  const [adoptado, setAdoptado] = useState(0);
  const [botonLabel, setBotonLabel] = useState('');
  const setInfo = useRef(false);
  const [msjModal, setmsjModal] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);


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
    var date = new Date(mascotaItem.fechaCalculo);
    var now = new Date();
    console.log('date' + date);
    if (mascotaItem.estado == 'ADOPCION') {
      setBotonLabel('Comenzar adaptación');
    }
    if (mascotaItem.estado == 'ADOPTADA') {
      setBotonLabel('ADOPTADA!');
      setPorcentajeDias(100);
      setAdoptado(100);
    }

    if (mascotaItem.estado == 'SEGUIMIENTO') {
      var dias = Math.round(Math.abs(date - now) / (1000 * 60 * 60 * 24));
      setDiasAdaptacion(dias === 0 ? 1 : dias);
      setPorcentajeDias(
        dias === 0 ? Math.round((1 * 100) / 15) : Math.round((dias * 100) / 15),
      );
      console.log(diasAdaptacion);
      setBotonLabel('CAMBIAR A ADOPTADO');
    }
  };


  const cambiarEstado = async (id, estado, finSeguimiento) => {
    if (estado == 'ADOPCION') {
      mascotaItem.fechaCalculo = new Date();
      estado = 'SEGUIMIENTO';
    } else if (estado == 'SEGUIMIENTO') {
      estado = 'ADOPTADA';
      if (finSeguimiento) {
        estado = 'ADOPCION';
        setPorcentajeDias(0);
        setDiasAdaptacion(0);
      } else {
        if (diasAdaptacion < 15) {
          setmsjModal(true);
          return;
        } else {
          setAdoptado(100);
          setBotonLabel('Comenzar adaptación');
        }
      }
    }

    const postEstado = {id, estado: estado};
    mascotaItem.estado = estado;
    const url = constantes.BASE_URL + 'estadoMascota';

    const resultado = await axios.post(url, postEstado);
    console.log('DATA ' + resultado.data);
    mascotaItem.current = resultado.data;
    aplicoEstados();
  };

  return (
      <View>
    <View style={style.header}>
    <IconButton
        icon="arrow-left"
        color="#FFFFFF"
        style={globalStyles.iconBack}
        onPress={() => navigation.navigate('misMascotas', {consultarMascotas: true})}
        size={30}
    />
    <Text style={globalStyles.title}>{mascotaItem.nombre}</Text>
    <IconButton
          icon="information-outline"
          color="#FFFFFF"
          style={style.iconEdit}
          onPress={() => showModal()}
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
            <Text style={style.edad}>, {mascotaItem.edad} años</Text>
            <Maticons
              style={style.iconSexo}
              name={nombreSexo}
              size={30}
              color="#FFAD00"
            />
          </View>
        </View>
        </View>
        <View style={style.viewDes}>
            <Text style={style.tituloDes}>
                Descripción:
            </Text>
          <Text style={style.descripcion}>{mascotaItem.descripcion}</Text>
        </View>
        <View style={style.rowEstado}>
        <View style={style.columnEstado}>
        <ProgressCircle
            percent={porcentajeAnima}
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
            style={style.cancelar}
            color="#BE0238"
            mode="contained"
            icon="close"
            compact={true}
            onPress={() =>
              cambiarEstado(mascotaItem.id, mascotaItem.estado, true)
            }>
            CANCELAR adaptación
          </Button>
        )}
          <Button
            labelStyle={style.label}
            style={style.guardar}
            color="#FFAD00"
            mode="contained"
            compact={true}
            onPress={() =>
              cambiarEstado(mascotaItem.id, mascotaItem.estado, false)
            }>
            {botonLabel}
          </Button>
        </View>
        <Portal>
          <Dialog visible={msjModal} style={globalStyles.dialog} >
              <Dialog.Title style={globalStyles.dialogTitle}>Mensaje</Dialog.Title>
            <Dialog.Content>
              <Paragraph style={globalStyles.dialogMsj}>Se deben cumplir al menos 15 días del periodo de adaptación.</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
                <Button
                color="#FFAD00"
                  mode="contained"
                  onPress={() => setmsjModal(false)}>
                  Ok
                </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={style.modal}>
            <View style={style.InfoContent}>
            <View style={style.rowinfo}>
            <View style={style.columncenter}>
            <Image source={require('../img/home-search.png')} style={style.imglogoInfo} /> 
              </View>
              <View>

              <Text style={style.sub}>Búsqueda</Text>
              <Text style={style.texto}>La mascota esta en bùsqueda de su nueva familia</Text>
              </View>

            </View>
            <View style={style.rowinfo}>
            <View style={style.columncenter}>
            <Image source={require('../img/dots-horizontal.png')} style={style.imglogoInfo} /> 
              </View>
              <View>

              <Text style={style.sub}>Adaptación</Text>
              <Text style={style.texto}>Es un periodo de mínimo 15 días para que la mascota y su nueva familia se conozcan y que sean compatibles</Text>
              </View>

            </View>
            <View style={style.rowinfo}>
            <View style={style.columncenter}>
            <Image source={require('../img/home-heart.png')} style={style.imglogoInfo} /> 
              </View>
              <View>
              <Text style={style.sub}>Adoptado</Text>
              <Text style={style.texto}>Tu mascota consiguió su nuevo hogar!</Text>
              </View>
              </View>
                </View>
                <Button
                labelStyle={style.label}
                style={style.guardar}
                color="#FFAD00"
                  mode="contained"
                  onPress={() => hideModal()}>
                  Entendido
                </Button>
             
        </Modal>
      </Portal>
    </View>
  );
};

const style = StyleSheet.create({
  InfoContent: {
    flexDirection: 'column',
    padding: 20
  },
  rowinfo: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  sub: {
    textAlign: 'left',
    fontSize: 16,
    marginStart: 10,
    padding: 0,
    marginTop: 10,
    color: '#D0800A'
  },
  texto: {
    alignItems: 'flex-start',
    paddingHorizontal: 5,
  },
  modal: {
    backgroundColor: '#FFFFFF', 
    padding: 20,
    marginHorizontal: '10%',
    marginVertical: '12%',
    elevation: 10,
    borderRadius: 10,
    justifyContent: 'center'
  },
  descripcion: {
    fontSize: 15,
    marginTop: 0,
    marginHorizontal: 10,
  },
  tituloDes: {
    fontSize: 18,
    marginStart: 5,
    fontWeight: 'bold',
  },
  viewDetalle: {
    marginHorizontal: 10,
    padding: 0,
    paddingTop: 0,
  },
  viewDes: {
    marginVertical: 'auto',
    marginHorizontal: 20,
    marginBottom: 0,
  },
  columnEstadoCen: {
    flexDirection: 'column',
    marginHorizontal: 10,
  },
  columncenter:{
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  icoCal: {
    marginStart: 5,
  },
  colDia: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
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
    marginTop: '5%',
  },
  textNumber: {
    fontSize: 30,
  },
  label: {
    color: "#FFFFFF"
    },
  guardar: {
    justifyContent: 'flex-end',
    padding: 3,
    borderRadius: 5,
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: {width: 1, height: 13},
    marginHorizontal: 40,
    marginTop: '5%',
    marginBottom: '10%',
  },
  cancelar: {
    padding: 3,
    borderRadius: 5,
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: {width: 1, height: 13},
    marginHorizontal: 40,
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
    marginTop: '5%'
    },
    imglogoInfo: {
      height: 50,
      width: 50,
      opacity: 0.3,
    },
    imglogo: {
      height: 40,
      width: 40,
      opacity: 0.3,
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
