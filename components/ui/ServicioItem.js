import React, {useCallback} from 'react';
import {StyleSheet, View, Linking, Alert} from 'react-native';
import {Text, Card, Button} from 'react-native-paper';
import Maticons from 'react-native-vector-icons/MaterialCommunityIcons';

const ServicioItem = ({servicio}) => {
  console.log('servicio');
  console.log(servicio);
  const {costo, titulo, descripcion, urlPago,email,nombre,apellido} = servicio;
  const supportedURL = 'https://mpago.la/2fCvVnm';

  const OpenURLButton = ({url, children}) => {
    
    const handlePress = useCallback(async () => {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert(`Ha ocurrido un error , intente mas tarde`);
      }
    }, [url]);

    return (
      <Button
        style={style.iconContact}
        mode="contained"
        title={children}
        onPress={handlePress}>
        Contratar
      </Button>
    );
  };

  const contratarServicio = () => {};
  return (
    <Card style={style.titulo}>
      <View style={style.viewContainer}>
        <View style={style.viewHeader}>
          <Text style={style.titHeader}>{titulo}</Text>
        </View>

        <View style={style.viewRow}>
        <Text style={style.descripcionText}>{descripcion}</Text>
        </View>
        <View style={style.viewRow}>
         <Text style={style.descripcionText}>{nombre} {apellido}</Text>
         </View>
         <View style={style.viewRow}>
         <Text style={style.descripcionText}>{email} </Text>
         </View>
       
        <View style={style.viewRowPrecio}>
          <Text style={style.precioTit}>Precio: </Text>
          <Text style={style.precioDato}>${costo}</Text>
        </View>
        <OpenURLButton url={urlPago}>Open Supported URL</OpenURLButton>
      </View>
    </Card>
  );
};

const style = StyleSheet.create({
  titulo: {
    margin: 10,
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#ffffff',
  },
  viewHeader: {
    backgroundColor: '#FF9D4E',
    flexDirection: 'row',
    borderBottomColor: '#252932',
    borderBottomWidth: 1,
    justifyContent: 'center',
  },
  titHeader: {
    fontSize: 20,
    marginVertical: 20,
    fontWeight: 'bold',
    color: '#252932',
    paddingStart: 10,
  },
  viewRow: {
    flexDirection: 'row',
  },
  descripcionText: {
    margin: 10,
    fontSize: 15,
    color: '#252932',
  },
  nombreText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#252932',
  },
  precioTit: {
    fontSize: 20,
    marginVertical: 10,
    fontWeight: 'bold',
    color: '#252932',
  },
  viewRowPrecio: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  precioDato: {
    fontSize: 20,
    marginVertical: 10,
    marginEnd: 10,
    fontWeight: 'bold',
    color: '#252932',
  },
  botonesGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  iconContact: {
    marginHorizontal: 100,
    backgroundColor: '#FF9D4E',
    padding: 8,
    borderRadius: 50,
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: {width: 1, height: 13},
    marginBottom: 10,
  },
});
export default ServicioItem;
