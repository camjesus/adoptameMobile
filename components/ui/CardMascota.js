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
        setColorChico('#FFAD00');
        setColorMediano('#FFFFFF');
        setColorGrande('#FFFFFF');
        break;
      case 'MEDIANO':
        setColorChico('#FFFFFF');
        setColorMediano('#FFAD00');
        setColorGrande('#FFFFFF');
        break;
      case 'GRANDE':
        setColorChico('#FFFFFF');
        setColorMediano('#FFFFFF');
        setColorGrande('#FFAD00');
        break;
    }
  }, []);

  return (
   
    <View style={style.cardNew}>
       <TouchableOpacity 
    onPress={() => {
          navigation.navigate('DetalleMascota', {
            mascotaItem: mascota,
            idMascota: mascota.id,
          });
    }}
    >
        <View style={style.viewMascota}>
          <Image
            style={style.imgMascota}
            source={{
              uri: mascota?.foto_url,
            }}
          />
        </View>
        </TouchableOpacity>
        <View style={style.pawRow}>
        <Maticons
              style={style.paw}
              name="paw"
              size={45}
              color={colorGrande}
            />
             <Maticons
              style={style.paw}
              name="paw"
              size={35}
              color={colorMediano}
            />
             <Maticons
              style={style.paw}
              name="paw"
              size={25}
              color={colorChico}
            />
        </View>
        <View style={style.infoMascota}>
        <View style={style.infoMascota}>
        {mascota?.estado === 'ENCONTRADO' && (
            <View style={style.containerH1}>
              <Text style={style.nombre}>{mascota?.fechaInicioS}</Text>
              <Maticons
                style={style.iconSexo}
                name={nombreSexo}
                size={30}
                color="#FFAD00"
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
                color="#FFAD00"
              />
              </View>
          )}
          </View>
        </View>

        <Button
            style={style.masInfo}
            mode="contained"
            onPress={() => {
              navigation.navigate('DetalleMascota', {mascotaItem: mascota, idMascota: mascota.id})
            }}
            animated="true"
            icon="plus"
            >
            Más Info
          </Button>
    </View>
  );
};

const style = StyleSheet.create({
  paw: {
  },
  pawRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    alignContent: 'center',
    position: 'absolute',
    marginStart: 10,
    margin: 10,
    bottom: 80,
    left: 0,
  },
  masInfo: {
    position: 'absolute',
    margin: 20,
    borderRadius: 5,
    marginBottom: 45,
    right: 0,
    bottom: 30,
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
    flex: 5,
    margin: 0,
    padding: 0,
    marginTop: -30,
    marginBottom: 30,
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
