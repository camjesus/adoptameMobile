import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Image, Text,Alert} from 'react-native';
import {Card, Button} from 'react-native-elements';
import Maticons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const CardMascota = ({mascota}) => {
  const [image, gFotoURL] = useState('../../img/default.jpg');
  const {id,foto_url, nombre, descripcion, sexo, edad, tamanio} = mascota;
  const [nombreSexo, gNombreSexo] = useState('');

 

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


  const enviaMail = async (id) => {
    try {
      
      console.log('request');
      console.log(request);

     const value= await AsyncStorage.getItem('email');

      var request = {
        "idMascota":id,
        "senderName":value
      };

      const resultado = await axios.post(
        'http://10.0.2.2:8090/adoptame/mobile/enviarMailMascota',
        request
      );
      console.log('Mande email');
      console.log(resultado.data);
      Alert.alert(
        'Contacto Hecho!',
        'El resctatista se comunicara con vos en breve!',
        [{text: 'OK'}],
        {cancelable: false}
      );

    } catch (error) {
      console.log(error);
      Alert.alert(
        'Error',
        'Ha ocurrido un error intente nuevamente',
        [{text: 'OK'}],
        {cancelable: false}
      );
    }
  };

  


  return (
    <Card>
      <View style={style.viewContainer}>
        <View style={style.viewMascota}>
          <Image
            style={style.imgMascota}
            source={{
              uri: foto_url,
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
          <Button
            mode="contained"
            style={style.mensaje}
            type="clear"
            icon={
              <Maticons
                style={style.iconContact}
                name="email"
                size={40}
                color="#FF9D4E"
              />
            }
            onPress={() => enviaMail(id)}
          />
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
    marginRight: 15,
  },
  imgMascota: {
    height: 290,
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
    backgroundColor: '#252932',
    padding: 8,
    borderRadius: 50,
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: {width: 1, height: 13},
  },
});
export default CardMascota;
