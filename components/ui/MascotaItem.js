import React, {useState, useEffect} from 'react';

import {StyleSheet, View, Image, Text, Alert} from 'react-native';
import axios from 'axios';
import {IconButton} from 'react-native-paper';
import {Card} from 'react-native-elements';
import Maticons from 'react-native-vector-icons/MaterialCommunityIcons';
import constantes from '../context/Constantes'; 

const MascotaItem = ({mascota, consultarMascotas, navigation, route}) => {
  console.log('mascota');
  console.log(mascota);
  const params = new URLSearchParams();
  const [image, gFotoURL] = useState('../../img/default.jpg');
  const {foto_url, nombre, descripcion, sexo, edad, tamanio} = mascota;
  const [nombreSexo, gNombreSexo] = useState('gender-male');
  const [postText, setPostText] = React.useState('');

  const cambiarEstadoMascota = async (id) => {
    const postEstado = {id, estado: 'ADOPTADA'};
    const url = constantes.BASE_URL + 'estadoMascota';

    const resultado = await axios.post(
     // 'https://adoptameapp.herokuapp.com/adoptame/mobile/estadoMascota',
     url,
      postEstado,
    );
    consultarMascotas(true);

    Alert.alert(
      'Felicitaciones',
      'Diste una mascota en adopción',
      [{text: 'OK'}],
      {cancelable: false},
    );
  };
 

  useEffect(() => {
    console.log('entro a useEffec con la mascota ' + mascota);
    console.log(image);
  }, [foto_url]);

  useEffect(() => {
    tomoNombreIcon();
  }, [sexo]);

  const tomoNombreIcon = () => {
    if (sexo.toUpperCase() === 'MACHO') {
      gNombreSexo('gender-male');
    } else {
      gNombreSexo('gender-female');
    }
  };

  return (
    <View>
      <View style={style.viewContainer}>
        <View style={style.viewMascota}>
          <Image
            style={style.imgMascota}
            source={{
              uri: foto_url,
            }}
          />
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
        </View>

        <View style={style.infoMascota}>
          <View style={style.containerH1}>
            <Text style={style.nombre}>{nombre}</Text>
            <Text style={style.edad}>,{edad} años</Text>
            <Maticons
              style={style.iconSexo}
              name={nombreSexo}
              size={30}
              color="#FFAD00"
            />
          </View>
        </View>
        <View style={style.botonesGroup}>
         <Text style={style.textEstado}>Adopción</Text>
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
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
    backgroundColor: '#FFAD00',
    flex: 1,
    textAlign: 'center',
    padding: 10,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    color: 'white',
  },
  infoMascota: {
    flex: 2,
    flexDirection: 'row',
    marginBottom: 10,
  },
  containerH1: {
    flexDirection: 'row',
    flex: 3,
    alignItems: 'center',
    marginStart: 10,
    marginTop: 'auto',
    marginBottom: 'auto',
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
    marginVertical: 15,
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
    color: 'grey',
  },
  decContainer: {
    flexWrap: 'nowrap',
  },
  edad: {
    fontSize: 30,
    marginTop: 'auto',
  },
  iconSexo: {
    marginTop: 15,
    marginStart: 10,
  },
});
export default MascotaItem;
