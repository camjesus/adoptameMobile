import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import Maticons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Button,
  Text,
  IconButton,
  Portal,
  Dialog,
  Paragraph,
} from 'react-native-paper';
import globalStyles from '../styles/global';
import ProgressStatus from '../components/ui/ProgressStatus';
import InfoAdopcion from '../components/ui/InfoAdopcion';
import CardDetalle from '../components/ui/CardDetalle';
import HeaderStatus from '../components/ui/HeaderStatus';
import {useDispatch} from 'react-redux';
import {changeStatus} from '../store/actions/pet.action';

const EstadosAdopcion = ({navigation, route, props}) => {
  const {params} = route;
  const {mascotaItem} = params;
  const dispatch = useDispatch();
  const [nombreSexo, gNombreSexo] = useState('gender-male');
  const [diasAdaptacion, setDiasAdaptacion] = useState(0);
  const [porcentajeDias, setPorcentajeDias] = useState(0);
  const [porcentajeAnima, setPorcentajeAnima] = useState(100);
  const [visible, setVisible] = React.useState(false);
  const [adoptado, setAdoptado] = useState(0);
  const [botonLabel, setBotonLabel] = useState('');
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

    let data = dispatch(changeStatus(id, estado));
    console.log('DATA ' + data);
    mascotaItem.estado = estado;
    aplicoEstados();
  };

  return (
    <View>
      <HeaderStatus
        navigation={navigation}
        showModal={showModal}
        title={'Adopción'}
      />
      <View style={style.cardNew}>
        <CardDetalle mascotaItem={mascotaItem} nombreSexo={nombreSexo} />
        <View style={style.rowEstado} key={'adopcion'}>
          <ProgressStatus
            key={'adopcionbus'}
            value={porcentajeAnima}
            image={'home-search'}
            textDescription={'Búsqueda'}
          />
          <ProgressStatus
            key={'adopciondias'}
            value={porcentajeDias}
            image={'dots'}
            textDescription={'Adaptación'}
          />
          <ProgressStatus
            key={'adopcionadop'}
            value={adoptado}
            image={'home-heart'}
            textDescription={'Adoptado'}
          />
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
          <Text style={style.textNumber} key={'adopcion'}>
            {diasAdaptacion}
          </Text>
        </View>
        <IconButton
          icon="clipboard-text-outline"
          color="#FFFFFF"
          style={style.masInfo}
          onPress={() => {
            navigation.navigate('DetalleMascota', {
              mascotaItem: mascotaItem,
              idMascota: mascotaItem.id,
            });
          }}
          size={30}
        />
        {mascotaItem.estado == 'SEGUIMIENTO' && (
          <IconButton
            icon="close"
            color="#FFFFFF"
            style={style.cancelar}
            onPress={() =>
              cambiarEstado(mascotaItem.id, mascotaItem.estado, true)
            }
            size={30}
          />
        )}
        <Button
          labelStyle={style.label}
          style={style.guardar}
          color="#9575cd"
          mode="contained"
          compact={true}
          onPress={() =>
            cambiarEstado(mascotaItem.id, mascotaItem.estado, false)
          }>
          {botonLabel}
        </Button>
      </View>
      <Portal>
        <Dialog visible={msjModal} style={globalStyles.dialog}>
          <Dialog.Title style={globalStyles.dialogTitle}>Mensaje</Dialog.Title>
          <Dialog.Content>
            <Paragraph style={globalStyles.dialogMsj}>
              Se deben cumplir al menos 15 días del periodo de adaptación.
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              color="#9575cd"
              mode="contained"
              onPress={() => setmsjModal(false)}>
              Ok
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <InfoAdopcion visible={visible} hideModal={hideModal} />
    </View>
  );
};

const style = StyleSheet.create({
  masInfo: {
    position: 'absolute',
    margin: 20,
    left: 0,
    bottom: '60%',
    backgroundColor: '#F59822',
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
  icoCal: {
    marginStart: 5,
  },
  colDia: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textDia: {
    fontSize: 19,
    justifyContent: 'flex-start',
    textAlign: 'right',
  },
  rowDias: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginHorizontal: '30%',
    alignContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    borderWidth: 4,
    padding: 'auto',
    paddingVertical: 5,
    borderColor: '#9575cd',
    borderRadius: 20,
    marginTop: '5%',
  },
  textNumber: {
    fontSize: 30,
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
    marginHorizontal: '20%',
    marginBottom: 15,
  },
  cancelar: {
    position: 'absolute',
    margin: 20,
    right: 0,
    bottom: '55%',
    backgroundColor: '#c20000',
  },
  iconEdit: {
    right: 10,
    top: 10,
    flex: 2,
  },
  textEstado: {
    textAlign: 'center',
    marginTop: 5,
    color: '#000000',
  },
  columnEstado: {
    flexDirection: 'column',
  },
  rowEstado: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '10%',
    alignContent: 'center',
    alignItems: 'center',
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
    backgroundColor: '#9575cd',
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
    alignItems: 'baseline',
  },
  cardNew: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 5,
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
    alignContent: 'flex-start',
  },
});
export default EstadosAdopcion;
