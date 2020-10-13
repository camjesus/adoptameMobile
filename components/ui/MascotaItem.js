import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  Alert
} from 'react-native';
import axios from 'axios';

import {Button} from 'react-native-paper';

import {Card} from 'react-native-elements';

const MascotaItem = ({mascota,consultarMascotas}) => {
  console.log('mascota');
  console.log(mascota);
  var that = this;

  const cambiarEstadoMascota = async (id) => {

    const postEstado = {id, "estado":"ADOPTADA"};

    const resultado = await axios.post(
      'http://10.0.2.2:8090/adoptame/mobile/estadoMascota',
      postEstado
    );
    consultarMascotas(true);
  
    Alert.alert(
      'Felicitaciones',
      'Diste una mascota en adopción',
      [
        
        { text: 'OK'}
      ],
      { cancelable: false }
    );
  }

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
          <View>
            <Text style={style.descripcionText}>Estado: {mascota.estado}</Text>

          </View>
          <View>
          { mascota.estado=='DISPONIBLE' &&
          <Button  mode="contained" onPress={() => cambiarEstadoMascota(mascota.id)}>
                  Me Adoptaron!
            </Button>
          }
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
