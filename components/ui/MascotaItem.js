import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity
} from 'react-native';

import {Card} from 'react-native-elements';

const MascotaItem = ({mascota,verMascota}) => {
  console.log('mascota');
  console.log(mascota);
  var that = this;
  console.log(verMascota);

  return (
    <Card  > 
      <View style={style.viewMascota}>
        <View style={style.viewMascotaImg}>
          <Image
            style={style.imgMascota}
            source={{
              uri: `${mascota.foto_url}`,
            }}
           
          />
        
        </View>
        <View style={style.viewMascotaImg}  >
        <View>
          <Text style={style.nombreText}>{mascota.nombre}</Text>
         </View>
          <View>
          <Text style={style.nombreText}>{mascota.tipoMascota}</Text>
          </View>
          <View>
            <Text style={style.descripcionText}>{mascota.descripcion}</Text>
          </View>

          <View>
            <Text style={style.descripcionText}>{mascota.descripcion}</Text>
          </View>
          <View>
            <Text style={style.descripcionText}>Edad: {mascota.edad}</Text>
          </View>
          <View>
            <Text style={style.descripcionText}>Sexo: {mascota.sexo}</Text>
          </View>
          <View>
            <Text style={style.descripcionText}>Tamaño: {mascota.tamanio}</Text>

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
