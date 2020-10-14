import React, {useState, useEffect} from 'react';

import {StyleSheet, View, Image, Text, Alert} from 'react-native';
import axios from 'axios';
import {Button} from 'react-native-paper';
import {Card} from 'react-native-elements';
import Maticons from 'react-native-vector-icons/MaterialCommunityIcons';

const MascotaItem = ({mascota, consultarMascotas}) => {
  console.log('mascota');
  console.log(mascota);
  const [image, gFotoURL] = useState('../../img/default.jpg');
  const {foto_url, nombre, descripcion, sexo, edad, tamanio} = mascota;
  const [nombreSexo, gNombreSexo] = useState('');
  var that = this;

  const cambiarEstadoMascota = async (id) => {
    const postEstado = {id, estado: 'ADOPTADA'};
    const resultado = await axios.post(
      'http://10.0.2.2:8090/adoptame/mobile/estadoMascota',
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
  const modificoURL = () => {
    if (foto_url !== '') {
      const urlServicio = foto_url.substring(17, foto_url.length);
      gFotoURL('http://10.0.2.2:' + urlServicio);
      console.log(urlServicio);
    }
  };

  useEffect(() => {
    console.log('entro a useEffec con la mascota ' + mascota);
    modificoURL();
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
    <Card>
      <View style={style.viewContainer}>
        <View style={style.viewMascota}>
          <Image
            style={style.imgMascota}
            source={{
              uri: `${image}`,
            }}
          />
        </View>
        <View style={style.containerH1}>
          <Text style={style.nombre}>{nombre}</Text>
          <Maticons
            style={style.iconSexo}
            name={nombreSexo}
            size={30}
            color="grey"
          />
        </View>

        <View style={style.containerH2}>
          <View>
            <Text style={style.tamanio}>{tamanio}</Text>
          </View>
          <Text style={style.edad}>{edad} años</Text>
        </View>

        <Text style={style.descripcion}>{descripcion}</Text>

        <View style={style.botonesGroup}>
          <View>
            {mascota.estado === 'DISPONIBLE' && (
              <Button
                style={style.iconContact}
                mode="contained"
                onPress={() => cambiarEstadoMascota(mascota.id)}>
                Me Adoptaron!
              </Button>
            )}
          </View>
          <View>
            {mascota.estado !== 'DISPONIBLE' && (
              <Text style={style.textAdoptado}>Adoptada!</Text>
            )}
          </View>
        </View>
      </View>
    </Card>
  );
};

const style = StyleSheet.create({
  viewMascota: {
    flexDirection: 'row',
    margin: 15,
    alignContent: 'center',
  },
  viewMascotaImg: {
    flexDirection: 'row',
    marginRight: 15,
  },
  imgMascota: {
    height: 200,
    flex: 1,
  },
  nombreText: {
    fontWeight: 'bold',
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
    fontSize: 12,
    color: 'grey',
  },
  nombre: {
    paddingTop: 5,
    fontSize: 30,
    fontWeight: 'bold',
  },
  edad: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 15,
  },
  tamanio: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  flecha: {
    margin: 10,
  },
  iconSexo: {
    marginTop: 15,
    marginStart: 10,
  },
  containerH1: {
    flexDirection: 'row',
  },
  containerH2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconContact: {
    marginTop: 5,
    backgroundColor: '#FF9D4E',
    padding: 5,
    borderRadius: 50,
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: {width: 1, height: 13},
  },
  textAdoptado: {
    backgroundColor: '#BA173A',
    padding: 15,
    fontSize: 18,
    fontWeight: 'bold',
    borderRadius: 50,
    color: '#ffffff',
  },
});
export default MascotaItem;
