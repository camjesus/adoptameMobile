import React, {useEffect, useState} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {Text, IconButton, TextInput, Button} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import {LoginManager} from 'react-native-fbsdk';
import globalStyles from '../styles/global';
import Maticons from 'react-native-vector-icons/MaterialCommunityIcons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';


const Cuenta = ({navigation}) => {
  const [nombre, gNombre] = useState('');
  const [apellido, gApellido] = useState('');
  const [email, gEmail] = useState('');
  const [telefono, gTelefono] = useState('1122551093');
  const [camposEdit, gCamposEdit] = useState(true);
  const [disabledEdit, setdesabledEdit] = useState(true);
  const [iconoRight, setIconoRight] = useState('pencil');

  useEffect(() => {
    console.log('entre a cuena');
    obtenerDatosStorage();
    setdesabledEdit(true);
    setIconoRight('pencil');
    gCamposEdit(true);
  }, []);

  const obtenerDatosStorage = async () => {
    try {
      await AsyncStorage.getItem('email').then((value) => {
        gEmail(value);
      });
    } catch (error) {
      console.log(error);
    }

    await AsyncStorage.getItem('nombre').then((value) => {
      gNombre(
        value.substring(0, 1).toUpperCase() + value.substr(1, value.length - 1),
      );
    });

    await AsyncStorage.getItem('apellido').then((value) => {
      gApellido(
        value.substring(0, 1).toUpperCase() + value.substr(1, value.length - 1),
      );
    });
  };

  const editarUsuario = (icono) => {
    if (icono == 'check') {
      console.log('Edito usuario');
    }
  };

  return (
    <View style={style.base}>
      <View style={style.header}>
        <IconButton
          icon="arrow-left"
          color="#FFFFFF"
          style={style.iconBack}
          onPress={() => navigation.navigate('BuscarStack', {screen: 'Disponibles'})}
          size={30}
        />
        <Text style={style.title}>Mis Datos</Text>
        <IconButton
          icon={iconoRight}
          color="#FFFFFF"
          style={style.iconEdit}
          onPress={() => {
            gCamposEdit(!camposEdit);
            setdesabledEdit(false);
            if (iconoRight == 'check') {
              setIconoRight('pencil');
            } else {
              setIconoRight('check');
            }
            editarUsuario('check');
            setdesabledEdit(!disabledEdit);
          }}
          size={30}
         />
      </View>
      <View style={style.cardNew}>
      <ScrollView style={style.scroll}>
        <View style={style.contenedor}>
            <TextInput
                label="Nombre"
                value={nombre}
                onChangeText={(texto) => gNombre(texto)}
                style={style.input}
                disabled={camposEdit}
            />
            <TextInput
                label="Apellido"
                value={apellido}
                onChangeText={(texto) => gApellido(texto)}
                style={style.input}
                disabled={camposEdit}
            />
            <TextInput
                label="Teléfono"
                value={telefono}
                onChangeText={(texto) => gTelefono(texto)}
                style={style.input}
                disabled={camposEdit}
            />
            <TextInput
                label="Email"
                value={email}
                style={style.input}
                disabled="true"
            />
        </View>
        <View style={style.Viewguardar}>
        <Button
            style={style.guardar}
            mode="contained"
            compact={true}
            disabled={disabledEdit}
            onPress={() => editarUsuario()}>
            Editar
          </Button>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  Viewguardar: {
    flex: 2,
    bottom: 0,
  },
  scroll: {
    padding: 0,
    margin: 0,
  },
  base: {
    flexDirection: 'column',
    flex: 1,
  },
  contenedor: {
    justifyContent: 'space-evenly',
    margin: 10,
  },
  tituloTxt: {
    textAlign: 'center',
    fontSize: 35,
    color: '#252932',
  },
  itemDato: {
    fontSize: 15,
    marginTop: 10,
    paddingTop: 5,
    color: '#252932',
  },
  itemNombre: {
    fontSize: 20,
    marginStart: 10,
    color: '#252932',
    textTransform: 'capitalize',
  },

  itemTitulo: {
    fontSize: 15,
    margin: 10,
    paddingTop: 5,
    fontWeight: 'bold',
    color: '#252932',
  },
  viewTitulo: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  viewItem: {
    flexDirection: 'column',
  },
  viewEdit: {
    flexDirection: 'row',
  },
  cardCont: {
    margin: 10,
    backgroundColor: '#ffffff',
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
  iconBack: {
    left: 10,
    top: 10,
  },
  iconEdit: {
    right: 10,
    top: 10,
  },
  title: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 26,
    marginVertical: 30,
    padding: 0,
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
    paddingHorizontal: 30,
    marginTop: -80,
    width: '90%',
    padding: 20,
    flexDirection: 'column',
  },
  input: {
    marginBottom: 10,
    backgroundColor: 'transparent',
    flex: 4,
  },
  guardar: {
    justifyContent: 'flex-end',
    backgroundColor: '#FFAD00',
    padding: 3,
    flex: 3,
    borderRadius: 5,
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: {width: 1, height: 13},
    marginHorizontal: 40,
    marginTop: 80,
    marginBottom: 10,
  },
});
export default Cuenta;
