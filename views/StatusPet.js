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
} from 'react-native-paper';
import {Icon} from 'react-native-elements';
import globalStyles from '../styles/global';
import ProgressStatus from '../components/ui/ProgressStatus';
import constantes from '../components/context/Constantes';
import axios from 'axios';
import InfoBuscado from '../components/ui/InfoBuscado';
import CardDetalle from '../components/ui/CardDetalle';
import HeaderStatus from '../components/ui/HeaderStatus';
import InfoEncontrado from '../components/ui/InfoEncontrado';

const StatusPet = ({navigation, route}) => {
  const {params} = route;
  const {mascotaItem, type} = params;
  const [nombreSexo, gNombreSexo] = useState('gender-male');
  const [porcentajeAnima] = useState(100);

  const [buscado, setBuscado] = useState(0);
  const [encontrado, setEncontrado] = useState(100);

  const [botonLabel, setBotonLabel] = useState('');
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const [visible, setVisible] = React.useState(false);
  const [popUp, setPopUp] = React.useState(false);

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
    switch (mascotaItem.estado) {
      case 'BUSCADO':
        setBotonLabel('Lo Encontramos');
        break;
      case 'ENCASA':
        setBotonLabel('EN CASA');
        setBuscado(100);
        break;
      case 'ENCONTRADO':
        setBotonLabel('YA LO ENTREGUE');
        break;
      case 'ENTREGADO':
        setEncontrado(100);
        setBotonLabel('ENTREGADO!');
        break;
    }
  };

  const cambiarEstadoBus = async (id, estado) => {
    if (estado == 'BUSCADO') {
      estado = 'ENCASA';
    }

    if (estado == 'ENCONTRADO') {
      estado = 'ENTREGADO';
    }

    const postEstado = {id, estado: estado};
    mascotaItem.estado = estado;
    const url = constantes.BASE_URL + 'estadoMascota';

    const resultado = await axios.post(url, postEstado);
    mascotaItem.current = resultado.data;
    aplicoEstados();
  };

  return (
    <View>
      <HeaderStatus
        navigation={navigation}
        showModal={showModal}
        title={type}
      />
      <View style={style.cardNew}>
        <CardDetalle mascotaItem={mascotaItem} nombreSexo={nombreSexo} />
        {type == 'Buscado' && (
          <View style={style.rowEstado} key={'buscado'}>
            <ProgressStatus
              key={'buscadoani'}
              value={porcentajeAnima}
              image={'magnify'}
              textDescription={'Búsqueda'}
            />
            <ProgressStatus
              key={'buscadoaniencon'}
              value={buscado}
              image={'home-heart'}
              textDescription={'Encontrado'}
            />
          </View>
        )}
        {type == 'Encontrado' && (
          <View style={style.rowEstado} key={'buscado'}>
            <ProgressStatus
              key={'encAnima'}
              value={porcentajeAnima}
              image={'home-search'}
              textDescription={'Búsqueda'}
            />
            <ProgressStatus
              key={'encEntr'}
              value={encontrado}
              image={'home-heart'}
              textDescription={'Entregado'}
            />
          </View>
        )}
        <IconButton
          icon="lightbulb-on-outline"
          color="#FFFFFF"
          style={style.popUp}
          onPress={() => setPopUp(true)}
          size={30}
        />
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
        <Dialog visible={popUp} style={globalStyles.dialog}>
          <View style={style.rowBus}>
            <View style={style.colDia}>
              <Text style={style.textDia}>Info</Text>
              <Maticons name="information-variant" size={24} color="#000000" />
            </View>
            <Dialog.Content>
              {type == 'Buscado' && (
                <Text style={style.textBusc} key={'buscado'}>
                  Adopta.Me es una sociedad en crecimiento, recuerda consultar
                  por las mascotas encontradas. {'\n'} Entre todxs lo
                  encontraremos!
                </Text>
              )}

              {type == 'Encontrado' && (
                <Text style={style.textBusc} key={'encText'}>
                  En la espera de que lo encuentre su familia. Acordate de
                  revisar si lo estan buscando en "Buscados"
                </Text>
              )}
            </Dialog.Content>
            <Button
              color="#9575cd"
              mode="contained"
              onPress={() => setPopUp(false)}>
              CERRAR
            </Button>
          </View>
        </Dialog>
        <Button
          labelStyle={style.label}
          style={style.guardar}
          color="#FFC936"
          mode="contained"
          compact={true}
          onPress={() => cambiarEstadoBus(mascotaItem.id, mascotaItem.estado)}>
          {botonLabel}
        </Button>
      </View>
      {type == 'Buscado' && (
      <InfoBuscado visible={visible} hideModal={hideModal} />
      )}
      {type == 'Encontrado' && (
      <InfoEncontrado visible={visible} hideModal={hideModal} />
      )}
    </View>
  );
};

const style = StyleSheet.create({
  masInfo: {
    position: 'absolute',
    margin: 20,
    left: 0,
    bottom: '55%',
    backgroundColor: '#F59822',
  },
  popUp: {
    position: 'absolute',
    margin: 20,
    right: 0,
    bottom: '50%',
    backgroundColor: '#F59822',
  },
  columncenter: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  imglogoInfo: {
    height: 60,
    width: 60,
    opacity: 0.3,
  },
  InfoContent: {
    flexDirection: 'column',
    padding: 20,
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
    color: '#FFC936',
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
    justifyContent: 'center',
  },
  rowBus: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    padding: 10,
    paddingVertical: 5,
    borderColor: '#FFC936',
    borderRadius: 20,
    margin: 10,
  },
  descripcion: {
    fontSize: 16,
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
  colDia: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'baseline',
  },
  textDia: {
    fontSize: 19,
    justifyContent: 'flex-start',
    textAlign: 'right',
  },
  label: {
    color: '#FFFFFF',
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
    color: '#000000',
  },
  columnEstado: {
    flexDirection: 'column',
  },
  rowEstado: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '20%',
    alignContent: 'center',
    alignItems: 'center',
    marginTop: '5%',
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
    backgroundColor: '#FFC936',
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
    alignItems: 'baseline',
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
    resizeMode: 'cover',
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
export default StatusPet;
