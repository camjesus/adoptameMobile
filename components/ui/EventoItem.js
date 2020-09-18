import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text,
  ActivityIndicator,
} from 'react-native';
const MascotaItem = ({evento}) => {
  console.log('evento');
  console.log(evento);

  return (
    <View style={style.viewMascota}>
      <View style={style.viewMascotaImg}></View>
      <View style={style.viewMascotaImg}>
        <Text style={style.nombreText}>Direccion:{evento.direccion}</Text>

        <View>
          <Text style={style.descripcionText}>Lugar: {evento.lugar}</Text>
        </View>
        <View>
          <Text style={style.descripcionText}>Barrio: {evento.barrio}</Text>
        </View>
      </View>
    </View>
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
