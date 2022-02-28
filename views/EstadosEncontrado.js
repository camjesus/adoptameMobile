import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, View, ActivityIndicator, Image} from 'react-native';
import Maticons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button, Text, IconButton, Dialog} from 'react-native-paper';
import {Icon} from 'react-native-elements';
import globalStyles from '../styles/global';
import constantes from '../components/context/Constantes';
import axios from 'axios';
import ProgressStatus from '../components/ui/ProgressStatus';
import InfoEncontrado from '../components/ui/InfoEncontrado';
import CardDetalle from '../components/ui/CardDetalle';
import HeaderStatus from '../components/ui/HeaderStatus';

const EstadosEncontrado = ({navigation, route, props}) => {
  const {params} = route;
  const {mascotaItem} = params;
  const [nombreSexo, gNombreSexo] = useState('gender-male');
  const [porcentajeAnima, setPorcentajeAnima] = useState();

  const [encontrado, setEncontrado] = useState(0);
  const [botonLabel, setBotonLabel] = useState('');
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const [popUp, setPopUp] = React.useState(false);

  useEffect(() => {
    tomoNombreIcon();
    aplicoEstados();
    setPorcentajeAnima(100);
  }, []);

  const tomoNombreIcon = () => {
    if (mascotaItem.sexo.toUpperCase() === 'MACHO') {
      gNombreSexo('gender-male');
    } else {
      gNombreSexo('gender-female');
    }
  };

  const aplicoEstados = () => {
    //var date = new Date('05/31/2021');
    var date = new Date(mascotaItem.fechaInicio);
    console.log('date' + date);
    if (mascotaItem.estado == 'ENCONTRADO') {
      setBotonLabel('YA LO ENTREGUE');
    }
    if (mascotaItem.estado == 'ENTREGADO') {
      setEncontrado(100);
      setBotonLabel('ENTREGADO!');
    }
  };

  const cambiarEstado = async (id, estado) => {
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
        title={'Encontrado'}
      />
      <View style={style.cardNew}>
        <CardDetalle mascotaItem={mascotaItem} nombreSexo={nombreSexo} />
        <View style={style.rowEstado} key={'encontrado'}>
          <ProgressStatus
            key={'encontradoanima'}
            value={porcentajeAnima}
            image={'home-search'}
            textDescription={'Búsqueda'}
          />
          <ProgressStatus
            key={'encontradoentr'}
            value={encontrado}
            image={'home-heart'}
            textDescription={'Entregado'}
          />
        </View>
        <IconButton
          icon="lightbulb-on-outline"
          color="#FFFFFF"
          style={style.popUp}
          onPress={() => setPopUp(true)}
          size={30}
        />
        <Dialog visible={popUp} style={globalStyles.dialog}>
          <View style={style.rowEnc}>
            <View style={style.colDia}>
              <Text style={style.textDia}>Info</Text>
              <Maticons name="information-variant" size={24} color="#000000" />
            </View>
            <Dialog.Content>
              <Text style={style.textBusc} key={'encText'}>
                Adopta.Me es una sociedad en crecimiento, recuerda consultar por
                las mascotas encontradas. {'\n'} Entre todxs lo encontraremos!
              </Text>
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
          color="#F59822"
          mode="contained"
          compact={true}
          onPress={() => cambiarEstado(mascotaItem.id, mascotaItem.estado)}>
          {botonLabel}
        </Button>
      </View>

      <InfoEncontrado visible={visible} hideModal={hideModal} />
    </View>
  );
};

const style = StyleSheet.create({
  rowEnc: {
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
  popUp: {
    position: 'absolute',
    margin: 20,
    right: 0,
    bottom: '58%',
    backgroundColor: '#c20000',
  },
  columncenter: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
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
    color: '#F59822',
  },
  texto: {
    alignItems: 'flex-start',
    paddingHorizontal: 5,
  },
  columnEstadoCen: {
    flexDirection: 'column',
    marginHorizontal: 10,
  },
  icoCal: {
    marginStart: 5,
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
  rowEstado: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '20%',
    alignContent: 'center',
    alignItems: 'center',
    marginTop: '5%',
  },

  viewDes: {
    marginHorizontal: 20,
    marginBottom: 0,
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
});
export default EstadosEncontrado;
