import React, {useState, useEffect} from 'react';
import {StyleSheet, View, PermissionsAndroid, Image, Alert} from 'react-native';
import Maticons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button, Text, ToggleButton, IconButton, FAB} from 'react-native-paper';
import globalStyles from '../styles/global';



const DetalleMascota = ({navigation, route, props}) => {
    const {params} = route;
    const {mascotaItem} = params;
    const [nombreSexo, gNombreSexo] = useState('gender-male');
    const [colorChico, setColorChico] = useState('');
    const [colorMediano, setColorMediano] = useState('');
    const [colorGrande, setColorGrande] = useState('');

    useEffect(() => {
        tomoNombreIcon();
      }, [mascotaItem.sexo]);
    
      const tomoNombreIcon = () => {
        if (mascotaItem.sexo.toUpperCase() === 'MACHO') {
          gNombreSexo('gender-male');
        } else {
          gNombreSexo('gender-female');
        }
      };

      useEffect(() => {
        switch (mascotaItem.tamanio) {
          case 'CHICO':
            setColorChico('#FFAD00');
            setColorMediano('#FFFFFF');
            setColorGrande('#FFFFFF');
            break;
          case 'MEDIANO':
            setColorChico('#FFFFFF');
            setColorMediano('#FFAD00');
            setColorGrande('#FFFFFF');
            break;
          case 'GRANDE':
            setColorChico('#FFFFFF');
            setColorMediano('#FFFFFF');
            setColorGrande('#FFAD00');
            break;
        }
      }, []);


  return (
      <View>
    <View style={style.header}>
    <IconButton
        icon="arrow-left"
        color="#FFFFFF"
        style={globalStyles.iconBack}
        onPress={() => navigation.goBack()}
        size={30}
    />
    <Text style={globalStyles.title}>{mascotaItem.nombre}</Text>
    <View style={globalStyles.viewR}></View>
    </View>
    <View style={style.cardNew}>
        <View style={style.viewMascota}>
          <Image
            style={style.imgMascota}
            source={{
              uri: mascotaItem.foto_url,
            }}
          />
            <View style={style.pawRow}>
            <Maticons
                style={style.paw}
                name="paw"
                size={30}
                color={colorGrande}
                />
                <Maticons
                style={style.paw}
                name="paw"
                size={25}
                color={colorMediano}
                />
                <Maticons
                style={style.paw}
                name="paw"
                size={20}
                color={colorChico}
                />
        </View>
        <View style={style.viewDetalle}>
        <View style={style.infoMascota}>
          <View style={style.containerH1}>
          <Text style={style.tituloDes}>
            Nombre:
          </Text>
          <Text style={style.nombre}> {mascotaItem.nombre}</Text>
          </View>
          <View style={style.containerH1}>
          <Text style={style.tituloDes}>
            Sexo:
          </Text>
          <Text style={style.sexoText}> {mascotaItem.sexo}</Text>
            <Maticons
              style={style.iconSexo}
              name={nombreSexo}
              size={25}
              color="#FFAD00"
            />
          </View>
        </View>
        <View style={style.infoMascota}>
        <View style={style.containerH1}>
        <Text style={style.tituloDes}>
            Edad:
          </Text>
          <Text style={style.sexoText}> {mascotaItem.edad} años</Text>
          </View>
          <View style={style.containerH1}>
          <Text style={style.tituloDes}>
            Tamaño:
          </Text>
         <Text style={style.sexoText}> {mascotaItem.tamanio} </Text>
         </View>
         </View>
        </View>
        <View style={style.viewDes}>
            <Text style={style.tituloDes}>
                Descripción:
            </Text>
          <Text style={style.descripcion}>{mascotaItem.descripcion}</Text>
        </View>
        </View>
        </View>
    <IconButton
          icon="message"
          style={style.masInfo}
          color="#FFFFFF"
          size={50}
          onPress={() => {
            navigation.navigate('DetalleMascota');
          }}
          animated="true"
        />
    </View>
  );
};

const style = StyleSheet.create({
  viewDetalle: {
    marginHorizontal: 10,
    padding: 10,
    paddingTop: 0,
  },
  viewDes: {
    marginVertical: 'auto',
    marginHorizontal: 20,
    marginBottom: 0,
  },
  sexoText: {
    fontSize: 18,
    textTransform: 'capitalize',
  },
  tamText: {
    fontSize: 13,
    textTransform: 'capitalize',
  },
  paw: {
    backgroundColor: 'transparent',
    bottom: 0,
  },
  pawRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    alignContent: 'center',
    position: 'absolute',
    marginStart: 10,
    margin: 10,
    bottom: 150,
    left: 0,
  },
  descripcion: {
    fontSize: 15,
    marginTop: 0,
    marginBottom: 20,
    marginHorizontal: 10,
    color: '#D5D8DC',
  },
  tituloDes: {
    fontSize: 18,
    marginStart: 5,
    fontWeight: 'bold',
  },
  masInfo: {
    position: 'absolute',
    margin: 20,
    marginBottom: 10,
    right: 0,
    bottom: 0,
    backgroundColor: '#FFAD00',
    shadowColor: '#000000',
    elevation: 10,
    shadowOffset: {width: 1, height: 13},
  },
  header: {
    paddingBottom: 90,
    backgroundColor: '#FFAD00',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    shadowColor: '#000000',
    shadowOpacity: 1,
    shadowRadius: 30,
    elevation: 10,
    shadowOffset: {width: 1, height: 13},
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  infoMascota: {
    marginTop: 10,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'baseline'
  },
  cardNew: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 40,
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    elevation: 10,
    shadowRadius: 15,
    shadowOffset: {width: 1, height: 13},
    marginTop: -80,
    flexDirection: 'column',
    height: '86%',
  },
  imgMascota: {
    height: 300,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    borderRadius: 10,
    margin: 0,
    shadowColor: '#202020',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 5,
  },
  nombre: {
    fontSize: 22,
    marginBottom: 'auto',
  },
  edad: {
    fontSize: 25,
    marginBottom: 'auto',
    },
    iconSexo: {
    marginRight: 'auto',
    },
    containerH1: {
    flexDirection: 'row',
    flex: 3,
    alignItems: 'baseline',
    alignContent: 'flex-start'
    },
});
export default DetalleMascota;
