import React, {useState, useEffect} from 'react';
import {StyleSheet, View, PermissionsAndroid, Image, Alert} from 'react-native';

import {
  TextInput,
  Headline,
  Button,
  Checkbox,
  Text,
  Card,
  Avatar,
  Portal,
  Dialog,
  Paragraph,
  IconButton,
} from 'react-native-paper';
import globalStyles from '../styles/global';
import axios from 'axios';
import ImagePicker from 'react-native-image-picker';
import {ScrollView} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import Maticons from 'react-native-vector-icons/MaterialCommunityIcons';

const CrearMascota = ({navigation, route}) => {
  const [nombre, gNombre] = useState('');
  const [sexo, gSexo] = useState('');
  const [tamanio, gTamanio] = useState('');
  const [descripcion, gDescripcion] = useState('');
  const [edad, gEdad] = useState('');
  const [raza, gRaza] = useState('Mestizo');
  const [tipoMascota, gTipoMascota] = useState('');
  const [longitud, gLongitud] = useState('');
  const [latitud, gLatitud] = useState('');
  const [rescatista, gRescatista] = useState('');
  const [imagen, gImagen] = useState(null);
  const [checkedPerro, setCheckedPerro] = React.useState(true);
  const [checkedGato, setCheckedGato] = React.useState(false);
  const [checkedMacho, setCheckedMacho] = React.useState(true);
  const [checkedHembra, setCheckedHembra] = React.useState(false);
  const [checkedChico, setCheckedChico] = React.useState(true);
  const [checkedMediano, setCheckedMediano] = React.useState(false);
  const [checkedGrande, setCheckedGrande] = React.useState(false);
  const [coordenadas, setCoordenadas] = React.useState(null);
  const [alerta, ingresarAlerta] = useState(false);
  const [mensaje, guardaMensaje] = useState('');

  const guardarMascota = async () => {
    try {
      if (
        nombre === '' ||
        raza === '' ||
        edad === '' ||
        descripcion === '' ||
        latitud === '' ||
        longitud === '' ||
        !imagen
      ) {
        guardaMensaje('Todos los campos son requeridos');
        ingresarAlerta(true);
        return;
      }

      var bodyFormData = new FormData();
      bodyFormData.append('nombre', nombre);
      bodyFormData.append('estado', 'DISPONIBLE');

      if (checkedMacho) {
        bodyFormData.append('sexo', 'MACHO');
      } else {
        bodyFormData.append('sexo', 'HEMBRA');
      }

      if (checkedChico) {
        bodyFormData.append('tamanio', 'CHICO');
      }
      if (checkedMediano) {
        bodyFormData.append('tamanio', 'MEDIANO');
      }
      if (checkedGrande) {
        bodyFormData.append('tamanio', 'GRANDE');
      }

      bodyFormData.append('raza', raza);

      if (checkedPerro) {
        bodyFormData.append('tipoMascota', 'PERRO');
      } else {
        bodyFormData.append('tipoMascota', 'GATO');
      }

      bodyFormData.append('edad', edad);
      bodyFormData.append('descripcion', descripcion);
      bodyFormData.append('latitud', latitud);
      bodyFormData.append('longitud', longitud);

      bodyFormData.append('rescatista', rescatista);

      bodyFormData.append('image', {
        name: imagen.fileName,
        type: imagen.type,
        uri:
          Platform.OS === 'android'
            ? imagen.uri
            : imagen.uri.replace('file://', ''),
      });

      axios
        .request({
          method: 'post',
          url: 'http://10.0.2.2:8090/adoptame/mobile/uploadPet',
          data: bodyFormData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(function (response) {
          Alert.alert(
            'Nueva Mascota',
            'Agregaste una nueva mascota',
            [{text: 'OK', onPress: () => goback()}],
            {cancelable: false},
          );
        })
        .catch(function (response) {
          //handle error
          console.log(response);
          Alert.alert(
            'Nueva Mascota',
            'Ha ocurrido un error, intente mas tarde',
            [{text: 'OK'}],
            {cancelable: false},
          );
        });
    } catch (error) {
      console.log(error);

      Alert.alert(
        'Nueva Mascota',
        'Ha ocurrido un error, intente mas tarde',
        [{text: 'OK'}],
        {cancelable: false},
      );
    }
  };

  const goback = () => {
    console.log('vuelvo a mis mascotas');
    navigation.navigate('misMascotas');
  };

  const abrirMapa = () => {
    console.log('abrir Mapa ');
    navigation.navigate('verMapa');
  };

  useEffect(() => {
    console.log('entro a useEffec con coordenadas ' + route);
    AsyncStorage.getItem('userId').then((value) => {
      gRescatista(value);
    });

    if (route.params?.coordinates) {
      console.log(route.params?.coordinates);
      gLatitud(route.params?.coordinates.latitude);
      gLongitud(route.params?.coordinates.longitude);
    }
  }, [route.params?.coordinates]);

  const selectPhotoTapped = async () => {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        privateDirectory: true,
        skipBackup: true,
      },
    };

    try {
      console.log('pidiendo permiso');
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      ]);

      const permissionCamera = await PermissionsAndroid.check(
        'android.permission.CAMERA',
      );
      const permissionWriteStorage = await PermissionsAndroid.check(
        'android.permission.WRITE_EXTERNAL_STORAGE',
      );
      const permissionREADStorage = await PermissionsAndroid.check(
        'android.permission.READ_EXTERNAL_STORAGE',
      );
      console.log('sali de perdir permiso');

      if (
        !permissionCamera ||
        !permissionWriteStorage ||
        !permissionREADStorage
      ) {
        console.log('Failed to get the required permissions');

        return {
          error: 'Failed to get the required permissions.',
        };
      }
    } catch (error) {
      console.log('error' + error);

      return {
        error: 'Failed to get the required permissions.',
      };
    }

    console.log('abriendo camara');

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        //let source = {uri: response.uri};

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        gImagen(response);
      }
    });
  };

  return (
    <ScrollView>
      <View style={globalStyles.base}>
        <View style={globalStyles.contenedor}>
          <View style={style.avatar}>
            <Avatar.Image size={200} source={imagen} />
          </View>
          <View style={style.viewRow}>
            <IconButton
              icon="camera"
              color="#FF9D4E"
              size={30}
              onPress={() => selectPhotoTapped()}
            />
            <IconButton
              icon="map-search"
              color="#FF9D4E"
              size={30}
              onPress={() => abrirMapa()}
            />
          </View>
          <Button
            type="clear"
            onPress={() => abrirMapa()}
            icon={<Maticons name="filter" size={30} color="#252932" />}
          />
          <TextInput
            label="Nombre"
            value={nombre}
            onChangeText={(texto) => gNombre(texto)}
            style={style.input}
          />
          <TextInput
            label="Descripcion"
            value={descripcion}
            onChangeText={(texto) => gDescripcion(texto)}
            style={style.input}
          />

          <TextInput
            label="Edad"
            value={edad}
            keyboardType="numeric"
            onChangeText={(texto) => gEdad(texto)}
            style={style.input}
          />
          <View style={style.containerCheck}>
            <View style={style.mascotaRow}>
              <Text style={style.titulo}>Tipo:</Text>

              <Text style={style.tituloright}>Sexo:</Text>
            </View>
            <View style={style.mascotaRow}>
              <Text style={style.textCheck}>Perro</Text>
              <Checkbox
                status={checkedPerro ? 'checked' : 'unchecked'}
                onPress={() => {
                  setCheckedPerro(true);
                  setCheckedGato(false);
                }}
              />
              <Text style={style.textCheck}>Gato</Text>
              <Checkbox
                status={checkedGato ? 'checked' : 'unchecked'}
                onPress={() => {
                  setCheckedPerro(false);
                  setCheckedGato(true);
                }}
              />
              <Text style={style.textCheck}>Macho</Text>
              <Checkbox
                status={checkedMacho ? 'checked' : 'unchecked'}
                onPress={() => {
                  setCheckedMacho(true);
                  setCheckedHembra(false);
                }}
              />
              <Text style={style.textCheck}>Hembra</Text>
              <Checkbox
                status={checkedHembra ? 'checked' : 'unchecked'}
                onPress={() => {
                  setCheckedMacho(false);
                  setCheckedHembra(true);
                }}
              />
            </View>

            <Text style={style.titulo}>Tamaño:</Text>
            <View style={style.mascotaRow}>
              <Text style={style.textCheck}>Chico</Text>
              <Checkbox
                status={checkedChico ? 'checked' : 'unchecked'}
                onPress={() => {
                  setCheckedChico(true);
                  setCheckedMediano(false);
                  setCheckedGrande(false);
                }}
              />
              <Text style={style.textCheck}>Mediano</Text>
              <Checkbox
                status={checkedMediano ? 'checked' : 'unchecked'}
                onPress={() => {
                  setCheckedChico(false);
                  setCheckedMediano(true);
                  setCheckedGrande(false);
                }}
              />

              <Text style={style.textCheck}>Grande</Text>
              <Checkbox
                status={checkedGrande ? 'checked' : 'unchecked'}
                onPress={() => {
                  setCheckedChico(false);
                  setCheckedMediano(false);
                  setCheckedGrande(true);
                }}
              />
            </View>

            <Button
              style={style.ingresar}
              mode="contained"
              onPress={() => guardarMascota()}>
              Guardar
            </Button>
          </View>
          <Portal>
            <Dialog visible={alerta}>
              <Dialog.Title>Error</Dialog.Title>
              <Dialog.Content>
                <Paragraph>{mensaje}</Paragraph>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={() => ingresarAlerta(false)}>Ok</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </View>
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  ingresar: {
    backgroundColor: '#FF9D4E',
    padding: 3,
    borderRadius: 50,
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: {width: 1, height: 13},
    marginHorizontal: 40,
    marginVertical: 10,
  },
  contenedor: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    marginBottom: 20,
    backgroundColor: 'transparent',
  },
  tituloright: {
    fontSize: 14,
    marginStart: 160,
  },
  mascotaRow: {
    flexDirection: 'row',
    paddingBottom: 8,
  },
  textCheck: {
    paddingTop: 8,
    marginStart: 20,
  },
  titulo: {
    fontSize: 14,
  },
  textChEdad: {
    paddingTop: 8,
  },
  edad: {
    width: '50%',
  },
  textCheckEdad: {
    paddingTop: 8,
    marginStart: 5,
  },
  imgMascota: {
    width: 66,
    height: 58,
  },
  avatar: {marginHorizontal: 100},
  viewRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  containerCheck: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
});
export default CrearMascota;
