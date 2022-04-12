import Swiper from 'react-native-deck-swiper';
import CardMascota from './CardMascota';
//import {View, Text} from 'react-native'
import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';
import Maticons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button} from 'react-native-paper';

const SwiperCard = ({navigation, mascotasDisp, onSwiped}) => {
  useEffect(() => {
  }, [mascotasDisp]);

  const Card = ({mascota}) => (
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
        <Maticons
          style={style.paw}
          name="paw"
          size={45}
          color={mascota?.tamanio === 'GRANDE' ? '#9575cd' : '#FFFFFF'}
        />
        <Maticons
          style={style.paw}
          name="paw"
          size={35}
          color={mascota?.tamanio === 'MEDIANO' ? '#9575cd' : '#FFFFFF'}
        />
        <Maticons
          style={style.paw}
          name="paw"
          size={25}
          color={mascota?.tamanio === 'CHICO' ? '#9575cd' : '#FFFFFF'}
        />
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
        icon="clipboard-text-outline">
        Ver ficha
      </Button>
      <View style={style.infoMascota}>
        {mascota?.estado === 'ENCONTRADO' && (
          <View style={style.containerH1}>
            <Text style={style.nombre}>{mascota?.fechaInicioS}</Text>
            <Maticons
              style={style.iconSexo}
              name={
                mascota?.sexo.toUpperCase() === 'MACHO'
                  ? 'gender-male'
                  : 'gender-female'
              }
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
              name={
                mascota?.sexo.toUpperCase() === 'MACHO'
                  ? 'gender-male'
                  : 'gender-female'
              }
              size={30}
              color="#9575cd"
            />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <Swiper
      cards={mascotasDisp}
      cardIndex={0}
      renderCard={(card) => <Card mascota={card} />}
      onSwiped={onSwiped}
      backgroundColor="#FFFFFF"
      disableTopSwipe
      disableBottomSwipe
      cardVerticalMargin={10}
    />
  );
};

const style = StyleSheet.create({
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
    height: '80%',
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
export default SwiperCard;
