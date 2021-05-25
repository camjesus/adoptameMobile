import React, {useState, useEffect,useRef} from 'react';
import {StyleSheet, View, PermissionsAndroid, Image, Alert} from 'react-native';

import {
  TextInput,
  Headline,
  Button,
  Checkbox,
  Text,
  ToggleButton,
  Avatar,
  Portal,
  Dialog,
  Paragraph,
  IconButton,
  FAB,
} from 'react-native-paper';
import globalStyles from '../styles/global';
import axios from 'axios';
import ImagePicker from 'react-native-image-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-community/async-storage';
import Maticons from 'react-native-vector-icons/MaterialCommunityIcons';
import constantes from '../components/context/Constantes'; 


const CrearMascota = ({navigation, route, props}) => {
  const [nombre, gNombre] = useState('');
  const [sexo, gSexo] = useState('');
  const [tamanio, gTamanio] = useState('');
  const [descripcion, gDescripcion] = useState('');
  const [edad, gEdad] = useState('');
  const [raza, gRaza] = useState('Mestizo');
  const [tipoMascota, gTipoMascota] = useState('');
  const [longitud, gLongitud] = useState('');
  const [latitud, gLatitud] = useState('');
  const [mascota, setMascota] = useState('');
  const [rescatista, gRescatista] = useState('');
  const [accion, setAccion] = useState('adopcion');
  const [imagen, gImagen] = useState(null);
  const [imagenCargada, gImagenCargada] = useState('none');
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
  const {params} = route;
  const {mascotaItem} = params;
  const [titulo, gTitulo] = useState('');
  const [colorCamara, gColorCamara] = useState('#252932');
  const [colorUbicacion, gColorUbicacion] = useState('#252932');
  const descRef = useRef();
  const edadRef = useRef();
  

  //Botones accion mascota
  const [colorBL, setColorBL] = useState('#D0800A');
  const [colorBR, setColorBR] = useState('#FFAD00');
  const [colorBC, setColorBC] = useState('#FFAD00');

  //Botones tipo Mascota
  const [colorBLP, setColorBLP] = useState('#D0800A');
  const [colorBRG, setColorBRG] = useState('#FFAD00');
  
  //Botones Sexo
  const [colorBLS, setColorBLS] = useState('#D0800A');
  const [colorBRS, setColorBRS] = useState('#FFAD00');

  //Botones Tamano
  const [colorBLT, setColorBLT] = useState('#D0800A');
  const [colorBRT, setColorBRT] = useState('#FFAD00');
  const [colorBCT, setColorBCT] = useState('#FFAD00');

  const guardarMascota = async () => {
    try {
      if (
        nombre === '' ||
        raza === '' ||
        edad === '' ||
        descripcion === '' ||
        !imagen
      ) {
        gTitulo('Advertencia');
        guardaMensaje('Todos los campos son requeridos');
        ingresarAlerta(true);
        return;
      }

      if (edad > 30) {
        gTitulo('Advertencia');
        guardaMensaje('La mascota no puede ser mayor a 30 años');
        ingresarAlerta(true);
        return;
      }

      if (latitud === '' || longitud === '') {
        gTitulo('Advertencia');
        guardaMensaje('Por favor indique en el mapa una dirección');
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

      const urlUpload =constantes.BASE_URL+'uploadPet';
      axios
        .request({
          method: 'post',
         //url: 'http://10.0.2.2:8090/adoptame/mobile/uploadPet',
        //  url: 'https://adoptameapp.herokuapp.com/adoptame/mobile/uploadPet',
          url:urlUpload,
          data: bodyFormData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(function (response) {
          gTitulo('Nueva Mascota');
          guardaMensaje('Agregaste una nueva mascota');
          ingresarAlerta(true);
        })
        .catch(function (response) {
          //handle error
          console.log(response);
          gTitulo('Nueva Mascota');
          guardaMensaje('Ha ocurrido un error, intente mas tarde');
          ingresarAlerta(true);
        });
    } catch (error) {
      console.log(error);
      gTitulo('Nueva Mascota');
      guardaMensaje('Ha ocurrido un error, intente mas tarde');
      ingresarAlerta(true);
    }
    
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
      gColorUbicacion("#FFFFFF");
    }
  }, [route.params?.coordinates]);

  useEffect(() => {
    if (mascotaItem) {
      gNombre(mascotaItem.nombre);
      gImagenCargada(mascotaItem.foto_url);
      gDescripcion(mascotaItem.descripcion);
      gEdad(mascotaItem.edad.toString());
      setTipoMascota(mascotaItem.tipoMascota);
      setSexo(mascotaItem.sexo);
      setTamanio(mascotaItem.tamanio);
      //setAccion()
      gLatitud(mascotaItem.latitud);
      gLongitud(mascotaItem.longitud);
     }
  }, []);

  const focusedTextInput = (ref) => {
    ref.current.focus();
  };

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
        gColorCamara("#FFFFFF");
      }
    });
  };

  const accionMascota = (accion) => {
    setAccion(accion);
    switch (accion) {
      case 'adopcion':
        setColorBL('#D0800A');
        setColorBC('#FFAD00');
        setColorBR('#FFAD00');
        break;
      case 'encontrado':
        setColorBL('#FFAD00');
        setColorBC('#D0800A');
        setColorBR('#FFAD00');
        break;
      case 'perdido':
        setColorBL('#FFAD00');
        setColorBC('#FFAD00');
        setColorBR('#D0800A');
        break;
    }
  };

  const setTamanio = (tamanio) => {
    setAccion(tamanio);
    switch (tamanio) {
      case 'CHICO':
        setColorBLT('#D0800A');
        setColorBCT('#FFAD00');
        setColorBRT('#FFAD00');
        break;
      case 'MEDIANO':
        setColorBLT('#FFAD00');
        setColorBCT('#D0800A');
        setColorBRT('#FFAD00');
        break;
      case 'GRANDE':
        setColorBLT('#FFAD00');
        setColorBCT('#FFAD00');
        setColorBRT('#D0800A');
        break;
    }
  };

  const setTipoMascota = (Tmascota) => {
    console.log(Tmascota);
    gTipoMascota(Tmascota);

    if (Tmascota === 'PERRO') {
      setColorBLP('#D0800A');
      setColorBRG('#FFAD00');
    } else {
      setColorBLP('#FFAD00');
      setColorBRG('#D0800A');
    }
  };

  const setSexo = (sexo) => {
    gSexo(sexo);

    if (sexo == 'MACHO') {
      setColorBLS('#D0800A');
      setColorBRS('#FFAD00');
    } else {
      setColorBLS('#FFAD00');
      setColorBRS('#D0800A');
    }
  };

  

  return (
    <View >
        <KeyboardAwareScrollView style={style.scroll}>
    <View style={globalStyles.header}>
    <IconButton
      icon="arrow-left"
      color="#FFFFFF"
      style={globalStyles.iconBack}
      onPress={() => navigation.goBack()}
      size={30}
    />
    {imagenCargada == 'none' && (
      <Text style={globalStyles.title}>Nueva mascota</Text>
    )}
     {imagenCargada != 'none' && (
      <Text style={globalStyles.title}>Editar mascota</Text>
    )}
      <IconButton
        icon="check"
        color="#FFFFFF"
        style={globalStyles.iconBack}
        onPress={() => navigation.goBack()}
        size={30}
      />
  </View>
          <View style={globalStyles.base}>
        <View style={globalStyles.contenedor}>
            {imagenCargada == 'none' && (
              <View style={style.avatar}>
                <Avatar.Image
                  size={160}
                  source={imagen}
                  style={style.avatarImage}
                />
              </View>
            )}
          {imagenCargada != 'none' && (
             <View style={style.avatar}>
            <Image
            style={style.avatarImage}
            source={{
              uri: imagenCargada,
            }}
          />
           </View>
          )}
          <View style={style.viewRowIcon}>
            <FAB
          icon="camera"
          style={style.fabLeft}
          color={colorCamara}
          onPress={() => selectPhotoTapped()}
          animated="true"
          small
        />
          <FAB
          icon="map-marker-plus"
          style={style.fabRight}
          color={colorUbicacion}
          small
          onPress={() => abrirMapa()}
          animated="true"
        />
          </View>
          <View style={style.buttonGroup}>
          <Button
              style={style.buttonGL}
              mode="contained"
              compact={true}
              color={colorBL}
              labelStyle={style.labelStyleGroup}
              onPress={() => accionMascota('adopcion')}>
              Adopción
            </Button>
            <Button
              style={style.buttonG}
              mode="contained"
              color={colorBC}
              compact={true}
              labelStyle={style.labelStyleGroup}
              onPress={() => accionMascota('encontrado')}>
              Encontrado
            </Button>
            <Button
              style={style.buttonGR}
              mode="contained"
              color={colorBR}
              compact={true}
              labelStyle={style.labelStyleGroup}
              onPress={() => accionMascota('perdido')}>
              Perdido
            </Button>
          </View>
          <View style={{paddingHorizontal: 20}}>
          <TextInput
            label="Nombre"
            value={nombre}
            onChangeText={(texto) => gNombre(texto)}
            style={style.input}
            onSubmitEditing={(event) => { focusedTextInput(descRef) }}
          />
          <TextInput
            label="Descripción"
            value={descripcion}
            onChangeText={(texto) => gDescripcion(texto)}
            style={style.input}
            ref={descRef}
            onSubmitEditing={(event) => { focusedTextInput(edadRef) }}
          />

          <TextInput
            label="Edad"
            value={edad}
            keyboardType="numeric"
            onChangeText={(texto) => gEdad(texto)}
            style={style.input}
            ref={edadRef}
          />
          </View>
          <View style={style.containerCheck}>
            <View style={style.viewCheck}>
            <View style={style.mascotaRowText}>
              <Text style={style.titulo}>Tipo:</Text>

              <Text style={style.tituloright}>Sexo:</Text>
            </View>
            <View style={style.mascotaRowTipoSexo}>
              <View style={style.buttonGroupS}>
          <Button
              style={style.buttonGLS}
              mode="contained"
              color={colorBLP}
              compact={true}
              labelStyle={style.labelStyleGroup}
              onPress={() => setTipoMascota('PERRO')}>
              Perro
            </Button>
            <Button
              style={style.buttonGRS}
              mode="contained"
              compact={true}
              labelStyle={style.labelStyleGroup}
              color={colorBRG}
              onPress={() => setTipoMascota('GATO')}>
              Gato
            </Button>
          </View>
              <View style={style.buttonGroupS}>
              <Button
                  style={style.buttonGLS}
                  mode="contained"
                  compact={true}
                  color={colorBLS}
                  labelStyle={style.labelStyleGroup}
                  onPress={() => setSexo('MACHO')}>
                  MACHO
                </Button>
                <Button
                  style={style.buttonGRS}
                  compact={true}
                  mode="contained"
                  labelStyle={style.labelStyleGroup}
                  color={colorBRS}
                  onPress={() => setSexo('hembra')}>
                  Hembra
                </Button>
              </View>
            </View>
            </View>
            <View style={style.mascotaRowText}>
            <Text style={style.titulo}>Tamaño:</Text>
            </View>
            <View style={style.buttonGroupT}>
                <Button
                  style={style.buttonGL}
                  mode="contained"
                  color={colorBLT}
                  compact={true}
                  labelStyle={style.labelStyleGroup}
                  onPress={() => setTamanio('CHICO')}>
                  chico
                </Button>
                <Button
                  style={style.buttonG}
                  mode="contained"
                  compact={true}
                  labelStyle={style.labelStyleGroup}
                  color={colorBCT}
                  onPress={() => setTamanio('MEDIANO')}>
                  Mediano
                </Button>
                <Button
                  style={style.buttonGR}
                  mode="contained"
                  compact={true}
                  labelStyle={style.labelStyleGroup}
                  color={colorBRT}
                  animated={false}
                  onPress={() => setTamanio('GRANDE')}>
                  grande
                </Button>
            </View>
            </View>
            <Button
              style={style.ingresar}
              mode="contained"
              labelStyle={{color: '#252932'}}
              compact={true}
              onPress={() => guardarMascota()}>
              Guardar
            </Button>
          <Portal>
            <Dialog visible={alerta}>
              <Dialog.Title>{titulo}</Dialog.Title>
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
      </KeyboardAwareScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  buttonGL: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    flex: 2,
  },
  buttonGR: {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    flex: 2,
  },
  buttonGLS: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    flex: 3,
    marginEnd: 1,
  },
  buttonGRS: {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    flex: 3,
    marginEnd: 2,
  },
  buttonGroup: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginHorizontal: 15,
    flex: 1,
  },
  buttonGroupT: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    marginTop: 13,
    flex: 1,
    marginHorizontal: 30,
  },
  buttonGroupS: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    flex: 1,
    marginHorizontal: 10,
  },
  buttonG: {
    marginHorizontal: 1,
    flex: 3,
  },
  fabLeft: {
    bottom: 0,
    backgroundColor: '#FFAD00',
    elevation: 10,
    shadowOffset: {width: 1, height: 13},
  },
  fabRight: {
    bottom: 0,
    backgroundColor: '#FFAD00',
    elevation: 10,
    shadowOffset: {width: 1, height: 13},
  },
  icon: {
    flex: 1,
  },
  ingresar: {
    backgroundColor: '#FFAD00',
    padding: 3,
    borderRadius: 5,
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: {width: 1, height: 13},
    marginHorizontal: 80,
    marginVertical: 10,
    marginTop: 20,
  },
  contenedor: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  input: {
    marginBottom: 3,
    backgroundColor: 'transparent',
    fontSize: 13,
  },
  tituloright: {
    fontSize: 16,
    flex: 6,
  },
  mascotaRowText: {
    flexDirection: 'row',
    top: 10,
    justifyContent: 'space-between',
  },
  mascotaRowTipoSexo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    top: 5,
  },
  textCheck: {
    paddingTop: 8,
    marginStart: 20,
  },
  textCheckTop: {
    paddingTop: 8,
    marginStart: 15,
  },
  titulo: {
    fontSize: 16,
    flex: 6,
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
  avatar: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 0,
    paddingBottom: 0,
  },
  avatarImage: {
    borderWidth: 1,
    //borderStyle: 'solid',
    borderColor: '#252932',
    height: 190,
    width: 190,
    borderRadius: 100,
  },
  viewRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  viewCheck: {
    justifyContent: 'center',
  },
  containerCheck: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  viewRowIcon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -30,
    paddingTop: 0,
    marginHorizontal: '25%',
  },
  labelStyleGroup: {
    fontSize: 11,
    color: '#252932',
    padding: 0,
    margin: 0,
  }
});
export default CrearMascota;
