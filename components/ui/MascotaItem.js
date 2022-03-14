import React, {useState, useEffect, useRef} from 'react';

import {
  StyleSheet,
  View,
  Image,
  Text,
  Alert,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import {
  Button,
  Portal,
  Dialog,
  Paragraph,
  IconButton,
} from 'react-native-paper';
import {Card} from 'react-native-elements';
import Maticons from 'react-native-vector-icons/MaterialCommunityIcons';
import constantes from '../context/Constantes';
import globalStyles from '../../styles/global';

const MascotaItem = ({mascota, consultarMascotas, navigation, route}) => {
  console.log('mascota');
  console.log(mascota);
  const params = new URLSearchParams();
  const [image, gFotoURL] = useState('../../img/default.jpg');
  const {foto_url, nombre, estado, sexo, edad, fechaInicioS} = mascota;
  const [nombreSexo, gNombreSexo] = useState('gender-male');
  const [postText, setPostText] = React.useState('');
  const [encontrado, setencontrado] = React.useState(false);
  const [alerta, ingresarAlerta] = useState(false);
  const [editar, setEditarM] = useState(true);
  const [color, setcolor] = useState('');
  const [mensaje, setMensaje] = useState(
    'Desea eliminar esta mascota permanentemente?',
  );
  const [labelBoton, setLabelBoton] = useState('Eliminar');

  useEffect(() => {
    console.log('entro a useEffec con la mascota ' + mascota);
    console.log(image);
  }, [foto_url]);

  useEffect(() => {
    tomoNombreIcon();
    sexoMascota();
    validoEncontrado();
  }, [mascota]);

  const tomoNombreIcon = () => {
    editMascota();
    switch (estado) {
      case 'ADOPCION':
      case 'ADOPTADA':
      case 'SEGUIMIENTO':
        setcolor('amarillo');
        if (estado === 'ADOPCION') {
          setPostText('Adopción');
        } else {
          setPostText(estado);
        }
        break;
      case 'BUSCADO':
      case 'ENCASA':
        setcolor('celeste');
        if (estado === 'ENCASA') {
          setPostText('EN CASA');
        } else {
          setPostText(estado);
        }
        break;
      case 'ENCONTRADO':
      case 'ENTREGADO':
        setPostText(estado);
        setcolor('verde');
        break;
    }
  };

  const editMascota = () => {
    setEditarM(true);
    switch (estado) {
      case 'ENTREGADO':
      case 'ENCASA':
      case 'ADOPTADA':
      case 'SEGUIMIENTO':
        setEditarM(false);
        break;
    }
  };

  const sexoMascota = () => {
    if (sexo.toUpperCase() === 'MACHO') {
      gNombreSexo('gender-male');
    } else {
      gNombreSexo('gender-female');
    }
  };

  const validoEncontrado = () => {
    if (mascota.estado === 'ENCONTRADO' || mascota.estado === 'ENTREGADO') {
      setencontrado(true);
    }
  };

  const mascotaEstado = () => {
    console.log('Entro por mascota estado');
    if (mascota.estado === 'ENCONTRADO' || mascota.estado === 'ENTREGADO') {
      navigation.navigate('StatusPet', {
        mascotaItem: mascota,
        type: 'Encontrado',
      });
    }
    if (
      mascota.estado === 'ADOPCION' ||
      mascota.estado === 'SEGUIMIENTO' ||
      mascota.estado === 'ADOPTADA'
    ) {
      navigation.navigate('EstadosAdopcion', {mascotaItem: mascota});
    }
    if (mascota.estado == 'BUSCADO' || mascota.estado == 'ENCASA') {
      navigation.navigate('StatusPet', {
        mascotaItem: mascota,
        type: 'Encontrado',
      });
    }
  };

  const eliminarMascota = async () => {
    try {
      const url = constantes.BASE_URL + `eliminarMascota/${mascota.id}`;
      console.log(url);
      const resultado = await axios.post(url);
      console.log(resultado.data);
      console.log('Se elimino la mascota con éxito');
      setMensaje('Se eliminó la mascota con éxito');
      setLabelBoton('OK');
      ingresarAlerta(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TouchableOpacity onPress={mascotaEstado}>
      <View>
        <View style={style.viewContainer}>
          <View style={style.viewMascota}>
            <Image
              style={style.imgMascota}
              source={{
                uri: foto_url,
              }}
            />
            {editar == true && (
              <View style={style.container}>
                <IconButton
                  icon="pencil"
                  color="#FFFFFF"
                  style={style.fab}
                  onPress={() => {
                    navigation.navigate('crearMascota', {mascotaItem: mascota});
                  }}
                  size={30}
                />
              </View>
            )}
            <IconButton
              icon="trash-can"
              color="#FFFFFF"
              style={style.fabDelete}
              onPress={() => {
                setLabelBoton('Eliminar');
                setMensaje('Desea eliminar esta mascota permanentemente?');
                ingresarAlerta(true);
              }}
              size={30}
            />
          </View>

          <View style={style.infoMascota}>
            {encontrado && (
              <View style={style.containerH1}>
                <Text style={style.nombre}>{fechaInicioS}</Text>
                <Maticons
                  style={style.iconSexo}
                  name={nombreSexo}
                  size={30}
                  color="#9575cd"
                />
              </View>
            )}
            {!encontrado && (
              <View style={style.containerH1}>
                <Text style={style.nombre}>{nombre}</Text>
                <Text style={style.edad}>, {edad} años</Text>
                <Maticons
                  style={style.iconSexo}
                  name={nombreSexo}
                  size={30}
                  color="#9575cd"
                />
              </View>
            )}
          </View>
          {color === 'verde' && (
            <Text style={style.textEstadoEn}>{postText}</Text>
          )}
          {color === 'amarillo' && (
            <Text style={style.textEstado}>{postText}</Text>
          )}
          {color === 'celeste' && (
            <Text style={style.textEstadoBus}>{postText}</Text>
          )}
        </View>
      </View>
      <Portal>
        <Dialog visible={alerta} style={globalStyles.dialog}>
          <Dialog.Title style={globalStyles.dialogTitle}>Mensaje</Dialog.Title>
          <Dialog.Content style={globalStyles.dialogMsj}>
            <Paragraph>{mensaje}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions style={{justifyContent: 'space-between'}}>
            {mensaje == 'Desea eliminar esta mascota permanentemente?' && (
              <Button
                style={{marginHorizontal: 10}}
                onPress={() => {
                  ingresarAlerta(false);
                }}>
                Cancelar
              </Button>
            )}
            <Button
              style={{marginHorizontal: 10}}
              onPress={() => {
                ingresarAlerta(false);
                eliminarMascota();
                consultarMascotas(true);
              }}>
              {labelBoton}
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  textEstadoBus: {
    fontSize: 23,
    backgroundColor: '#f5bb05',
    flex: 1,
    textAlign: 'center',
    padding: 10,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    color: '#FFFFFF',
    textTransform: 'capitalize',
  },
  textEstadoEn: {
    fontSize: 23,
    backgroundColor: '#F59822',
    flex: 1,
    textAlign: 'center',
    padding: 10,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    color: '#FFFFFF',
    textTransform: 'capitalize',
  },
  fabDelete: {
    position: 'absolute',
    marginBottom: 24,
    top: 0,
    backgroundColor: 'transparent',
  },
  fab: {
    position: 'absolute',
    margin: 10,
    marginBottom: 24,
    right: 0,
    top: 0,
    backgroundColor: 'transparent',
  },
  textEstado: {
    fontSize: 23,
    backgroundColor: '#9575cd',
    flex: 1,
    textAlign: 'center',
    padding: 10,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    color: '#FFFFFF',
    textTransform: 'capitalize',
  },
  infoMascota: {
    flex: 2,
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'baseline',
  },
  containerH1: {
    flexDirection: 'row',
    flex: 3,
    alignItems: 'center',
    marginStart: 10,
  },
  containerH2: {
    flexDirection: 'row',
    marginRight: 'auto',
  },
  viewContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 25,
    shadowColor: '#000000',
    shadowOpacity: 1,
    shadowRadius: 15,
    elevation: 10,
    shadowOffset: {width: 1, height: 13},
    flexDirection: 'column',
    marginVertical: 10,
  },
  viewMascota: {
    flexDirection: 'row',
    alignContent: 'center',
    margin: 0,
  },
  viewMascotaImg: {
    flexDirection: 'row',
    marginRight: 15,
  },
  imgMascota: {
    height: 200,
    flex: 1,
    borderRadius: 10,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  nombre: {
    fontSize: 30,
    marginTop: 'auto',
  },
  descripcionText: {
    fontSize: 10,
  },
  container: {
    paddingTop: 50,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 66,
    height: 58,
  },
  botonesGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  descripcion: {
    fontSize: 18,
    color: '#D5D8DC',
  },
  decContainer: {
    flexWrap: 'nowrap',
  },
  edad: {
    fontSize: 30,
    marginTop: 'auto',
  },
  iconSexo: {
    position: 'absolute',
    margin: 10,
    right: 0,
    top: 0,
    backgroundColor: 'transparent',
  },
});
export default MascotaItem;
