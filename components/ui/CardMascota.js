import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import {Card, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CardMascota = ({mascota}) => {
  const [image, gFotoURL] = useState('');
  const {foto_url, nombre, descripcion, sexo} = mascota;
  const [nombreSexo, gNombreSexo] = useState('');

  useEffect(() => {
    console.log("entro a useEffec con la mascota " +mascota);
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
    if (sexo === 'MACHO') {
      gNombreSexo('gender-male');
    } else {
      gNombreSexo('gender-female');
    }
  };

  return (
    <Card>
      <View>
        <View style={style.viewMascota}>
          <Image
            style={style.imgMascota}
            source={{
              uri: image,
            }}
          />
        </View>
        <View style={style.containerSexo}>
          <Text style={style.nombre}>Nombre: {nombre}</Text>
          <Icon
            style={style.iconSexo}
            name={nombreSexo}
            size={25}
            color="grey"
          />
        </View>

        <Text style={style.descripcion}>{descripcion}</Text>

        <View style={style.botonesGroup}>
          <Button
            style={style.flecha}
            type="clear"
            icon={<Icon name="arrow-left-thick" size={30} color="grey" />}
          />
          <Button
            style={style.mensaje}
            type="clear"
            icon={<Icon name="email" size={30} color="blue" />}
          />
          <Button
            style={style.flecha}
            type="clear"
            icon={<Icon name="arrow-right-thick" size={30} color="grey" />}
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
  },
  viewMascotaImg: {
    marginRight: 15,
  },
  imgMascota: {
    height: 250,
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
    marginStart: 60,
  },
  descripcion: {
    fontSize: 12,
    color: 'grey',
  },
  nombre: {
    paddingTop: 5,
    fontSize: 15,
    fontWeight: 'bold',
  },
  flecha: {
    margin: 10,
  },
  iconSexo: {
    marginStart: 10,
  },
  containerSexo: {
    flexDirection: 'row',
  },
});
export default CardMascota;
