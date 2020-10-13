import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import {Card, Button} from 'react-native-elements';
import Maticons from 'react-native-vector-icons/MaterialCommunityIcons';

const CardMascota = ({mascota}) => {
  const [image, gFotoURL] = useState('../../img/default.jpg');
  const {foto_url, nombre, descripcion, sexo, edad, tamanio} = mascota;
  const [nombreSexo, gNombreSexo] = useState('');

  useEffect(() => {
    console.log('entro a useEffec con la mascota ' + mascota);
    modificoURL();
    console.log(image);
  }, [foto_url]);

  useEffect(() => {
    tomoNombreIcon();
  }, [sexo]);

  const modificoURL = () => {
    if (foto_url !== '') {
      const urlServicio = foto_url.substring(17, foto_url.length);
      gFotoURL('http://10.0.2.2:' + urlServicio);
      console.log(urlServicio);
    }
  };
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
              uri: image,
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
