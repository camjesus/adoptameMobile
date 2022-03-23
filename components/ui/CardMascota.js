import constantes from '../context/Constantes';
import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';
import {Card} from 'react-native-elements';
import Maticons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {IconButton, Button} from 'react-native-paper';

const CardMascota = ({mascota, navigation, route}) => {
  console.log(mascota + 'en CardMascota');
  console.log(route);
  const [image, gFotoURL] = useState('../../img/default.jpg');
  const [nombreSexo, gNombreSexo] = useState('gender-male');
  const [colorChico, setColorChico] = useState('#FFFFFF');
  const [colorMediano, setColorMediano] = useState('#FFFFFF');
  const [colorGrande, setColorGrande] = useState('#FFFFFF');

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

  useEffect(() => {
    switch (mascota?.tamanio) {
      case 'CHICO':
        setColorChico('#9575cd');
        setColorMediano('#FFFFFF');
        setColorGrande('#FFFFFF');
        break;
      case 'MEDIANO':
        setColorChico('#FFFFFF');
        setColorMediano('#9575cd');
        setColorGrande('#FFFFFF');
        break;
      case 'GRANDE':
        setColorChico('#FFFFFF');
        setColorMediano('#FFFFFF');
        setColorGrande('#9575cd');
        break;
    }
  }, []);

  return (
    <TouchableOpacity
      style={style.cardNew}
      onPress={() => {
        navigation.navigate('DetalleMascota', {
          mascotaItem: mascota,
          idMascota: mascota.id,
        });
      }}>
      <Image
        style={style.imgMascota}
        source={{
          uri: mascota?.foto_url,
        }}
      />
      <View style={style.pawRow}>
        <Maticons style={style.paw} name="paw" size={45} color={colorGrande} />
        <Maticons style={style.paw} name="paw" size={35} color={colorMediano} />
        <Maticons style={style.paw} name="paw" size={25} color={colorChico} />
      </View>
      <Button
        style={style.masInfo}
        mode="contained"
        onPress={() => {
          navigation.navigate('DetalleMascota', {
            mascotaItem: mascota,
            idMascota: mascota.id,
          });
        }}
        animated="true"
        icon="plus">
        Más Info
      </Button>
      <View style={style.infoMascota}>
        {mascota?.estado === 'ENCONTRADO' && (
          <View style={style.containerH1}>
            <Text style={style.nombre}>{mascota?.fechaInicioS}</Text>
            <Maticons
              style={style.iconSexo}
              name={nombreSexo}
              size={30}
              color="#9575cd"
            />
          </View>
        )}
        {mascota?.estado !== 'ENCONTRADO' && (
          <View style={style.containerH1}>
            <Text style={style.nombre}>{mascota?.nombre}</Text>
            <Text style={style.edad}>, {mascota?.edad} años</Text>
            <Maticons
              style={style.iconSexo}
              name={nombreSexo}
              size={30}
              color="#9575cd"
            />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  viewMascota: {
    marginTop: 'auto',
  },
  pawRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    alignContent: 'center',
    position: 'absolute',
    marginStart: 10,
    margin: 10,
    bottom: '10%',
    left: 0,
  },
  masInfo: {
    position: 'absolute',
    margin: 20,
    borderRadius: 5,
    right: 0,
    bottom: '5%',
    backgroundColor: '#9575cd',
    shadowColor: '#000000',
    elevation: 10,
    shadowOffset: {width: 1, height: 13},
  },
  infoMascota: {
    margin: 10,
    flexDirection: 'row',
  },
  cardNew: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    elevation: 3,
    flexDirection: 'column',
    margin: 0,
    padding: 0,
    marginBottom: 'auto',
  },
  imgMascota: {
    height: '90%',
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    borderRadius: 10,
  },
  nombre: {
    fontSize: 30,
    marginTop: 'auto',
    marginVertical: 10,
  },
  edad: {
    fontSize: 30,
    marginTop: 'auto',
    marginVertical: 10,
  },
  iconSexo: {
    marginStart: 10,
    marginRight: 'auto',
    marginVertical: 10,
  },
  containerH1: {
    flexDirection: 'row',
    alignItems: 'center',
    marginStart: 10,
  },
});
export default CardMascota;
