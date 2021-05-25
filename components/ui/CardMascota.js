import constantes from '../context/Constantes';
import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Image, Text, Dimensions} from 'react-native';
import {Card, Button} from 'react-native-elements';
import Maticons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {IconButton} from 'react-native-paper';

const CardMascota = ({mascota, navigation, route}) => {
  console.log(mascota + 'en CardMascota');
  console.log(route);
  const [image, gFotoURL] = useState('../../img/default.jpg');
  const [nombreSexo, gNombreSexo] = useState('gender-male');

  useEffect(() => {
    tomoNombreIcon();
  }, [mascota?.sexo]);

  const tomoNombreIcon = () => {
    if (mascota?.sexo.toUpperCase() === 'MACHO') {
      gNombreSexo('gender-male');
    } else {
      gNombreSexo('gender-female');
    }
  };

  return (
    <View style={style.cardNew}>
        <View style={style.viewMascota}>
          <Image
            style={style.imgMascota}
            source={{
              uri: mascota?.foto_url,
            }}
          />
        </View>
        <View style={style.infoMascota}>
          <View style={style.containerH1}>
            <Text style={style.nombre}>{mascota?.nombre}</Text>
            <Text style={style.edad}>,{mascota?.edad} años</Text>
            <Maticons
              style={style.iconSexo}
              name={nombreSexo}
              size={30}
              color="#FFAD00"
            />
          </View>
        </View>
        <IconButton
          icon="information-variant"
          style={style.masInfo}
          color="white"
          size={40}
          onPress={() => {
            navigation.navigate('crearMascota', {mascotaItem: mascota});
          }}
          animated="true"
        />
    </View>
  );
};

const style = StyleSheet.create({
  masInfo: {
    position: 'absolute',
    margin: 10,
    borderRadius: 100,
    marginBottom: 24,
    right: 0,
    bottom: 0,
    backgroundColor: '#FFAD00',
    shadowColor: '#000000',
    elevation: 10,
    shadowOffset: {width: 1, height: 13},
  },
  infoMascota: {
    flex: 2,
    margin: 10,
    flexDirection: 'row',
  },
  cardNew: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 10,
    shadowOffset: {width: 1, height: 13},
    flexDirection: 'column',
    flex: 1,
  },
  imgMascota: {
    height: 500,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    borderRadius: 10,
  },
  nombre: {
    fontSize: 30,
    marginTop: 'auto',
  },
  edad: {
    fontSize: 30,
    marginTop: 'auto',
  },
  iconSexo: {
    marginStart: 10,
    marginRight: 'auto',
  },
  containerH1: {
    flexDirection: 'row',
    flex: 3,
    alignItems: 'center',
    marginStart: 10,
    marginTop: 'auto',
    marginBottom: 'auto',
  },
});
export default CardMascota;
