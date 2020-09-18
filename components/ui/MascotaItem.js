import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text,
  ActivityIndicator,
  Card,
} from 'react-native';
const MascotaItem = ({mascota}) => {
  console.log('mascota');
  console.log(mascota);

  const goMascota = () => {
    //navigation.navigate('VerMascota', {mascota});
    console.log(mascota.id);
  };
  return (
    <Card>
      <View style={style.viewMascota}>
        <View style={style.viewMascotaImg}>
          <Image
            style={style.imgMascota}
            source={{
              uri: 'https://reactnative.dev/img/tiny_logo.png',
            }}
          />
        </View>
        <View style={style.viewMascotaImg}>
          <Text style={style.nombreText}>{mascota.nombre}</Text>

          <View>
            <Text style={style.descripcionText}>{mascota.descripcion}</Text>
          </View>
          <View>
            <Text style={style.descripcionText}>Edad: {mascota.edad}</Text>
          </View>
        </View>
      </View>
    </Card>
  );
};

const style = StyleSheet.create({
  viewMascota: {
    flexDirection: 'row',
    margin: 10,
  },
  viewMascotaImg: {
    marginRight: 15,
  },
  imgMascota: {
    width: 66,
    height: 58,
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
});
export default MascotaItem;
