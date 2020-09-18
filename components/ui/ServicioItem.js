import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text,
  ActivityIndicator,
} from 'react-native';
const ServicioItem = ({servicio}) => {
  console.log('servicio');
  console.log(servicio);

  return (
    <View style={style.viewMascota}>
      <View style={style.viewMascotaImg}></View>
      <View style={style.viewMascotaImg}>
        <Text style={style.nombreText}>Servicio: {servicio.tipoServicio}</Text>

        <View>
          <Text style={style.descripcionText}>
            Telefono: {servicio.telefono}
          </Text>
        </View>
        <View>
          <Text style={style.descripcionText}>Barrio: {servicio.barrio}</Text>
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
export default ServicioItem;
