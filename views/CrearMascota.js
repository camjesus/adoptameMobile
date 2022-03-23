import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, View, PermissionsAndroid, Image, Alert} from 'react-native';

import {
  TextInput,
  Headline,
  Button,
  Text,
  ToggleButton,
  Avatar,
  Portal,
  Dialog,
  Paragraph,
  IconButton,
  FAB,
} from 'react-native-paper';
import {CheckBox} from 'react-native-elements';
import globalStyles from '../styles/global';
import ImagePicker from 'react-native-image-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {useSelector, useDispatch} from 'react-redux';
import {AddNewPet} from '../store/actions/pet.action';

const CrearMascota = ({navigation, route, props}) => {
  const dispatch = useDispatch();
  const {params} = route;
  const {mascotaItem} = params;
  const [edit] = useState(mascotaItem.id != null ? true : false);
  const [nombre, gNombre] = useState(mascotaItem.nombre);
  const [sexo, gSexo] = useState(mascotaItem.sexo);
  const [tamanio, gTamanio] = useState(mascotaItem.tamanio);
  const [descripcion, gDescripcion] = useState(mascotaItem.descripcion);
  const [edad, gEdad] = useState(mascotaItem.edad.toString());
  const [raza] = useState('Mestizo');
  const [tipoMascota, gTipoMascota] = useState(mascotaItem.tipoMascota);
  const [longitud, gLongitud] = useState(mascotaItem.longitud);
  const [latitud, gLatitud] = useState(mascotaItem.latitud);
  //const [rescatista, gRescatista] = useState(mascotaItem.rescatista);
  const rescatista = useSelector((state) => state.auth.userId);
  const [accion, setAccion] = useState(mascotaItem.estado);
  const [imagen, gImagen] = useState(null);
  const [cambioFoto, setCambioFoto] = React.useState(
    mascotaItem.cambioFoto === null ? false : mascotaItem.cambioFoto,
  );
  console.log('mascotaItem');
  console.log(mascotaItem);
  const [checkedAdefinir, setCheckedAdefinir] = React.useState(false);

  const [alerta, ingresarAlerta] = useState(false);
  const [mensaje, guardaMensaje] = useState('');
  const [titulo, gTitulo] = useState('');
  const [colorCamara, gColorCamara] = useState('#252932');
  const [colorUbicacion, gColorUbicacion] = useState('#252932');
  const descRef = useRef();
  const edadRef = useRef(mascotaItem.edad);
  const colorSelect = '#f5bb05';
  const colorNoSelect = '#9575cd';

  const guardarMascota = async () => {
    if (checkedAdefinir && accion === 'ENCONTRADO') {
      gNombre('Sin Collar');
    } else if (checkedAdefinir) {
      gNombre('A definir');
    }
    try {
      if (nombre === '' || edad === '' || descripcion === '') {
        gTitulo('Advertencia');
        guardaMensaje('Todos los campos son requeridos');
        ingresarAlerta(true);
        return;
      }

      if (imagen === null && mascotaItem.foto_url === null) {
        gTitulo('Advertencia');
        guardaMensaje('Es necesario cargar una foto para subir la mascota');
        ingresarAlerta(true);
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
      if (imagen !== null) {
        bodyFormData.append('image', {
          name: imagen.fileName,
          type: imagen.type,
          uri: imagen.uri.replace('file://', ''),
        });
      }
      bodyFormData.append('nombre', nombre);
      bodyFormData.append('estado', accion);
      bodyFormData.append('sexo', sexo);
      bodyFormData.append('tamanio', tamanio);
      bodyFormData.append('raza', raza);
      bodyFormData.append('tipoMascota', tipoMascota);
      bodyFormData.append('edad', parseInt(edad));
      bodyFormData.append('descripcion', descripcion);
      bodyFormData.append('latitud', latitud);
      bodyFormData.append('longitud', longitud);
      bodyFormData.append('cambioFoto', cambioFoto);
      bodyFormData.append('rescatista', parseInt(rescatista));
      if (mascotaItem.id !== null) {
        bodyFormData.append('id', parseInt(mascotaItem.id));
        bodyFormData.append('foto_url', mascotaItem.foto_url);
      }

      console.log('bodyFormData');
      console.log(bodyFormData);
      dispatch(AddNewPet(bodyFormData, cambioFoto));

      if (edit) {
        gTitulo('Editar Mascota');
        guardaMensaje('La mascota se editó con éxito!');
      } else {
        gTitulo('Nueva Mascota');
        guardaMensaje('La nueva mascota se creó con éxito!');
      }
      ingresarAlerta(true);
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
    if (route.params?.coordinates) {
      console.log(route.params?.coordinates);
      gLatitud(route.params?.coordinates.latitude);
      gLongitud(route.params?.coordinates.longitude);
      gColorUbicacion('#FFFFFF');
    }
  }, [route.params?.coordinates]);

  useEffect(() => {
    if (mascotaItem.id !== null) {
      if (
        mascotaItem.nombre == 'A definir' ||
        mascotaItem.nombre == 'Sin Collar'
      ) {
        setCheckedAdefinir(true);
      }
      gColorUbicacion('#FFFFFF');
      gColorCamara('#FFFFFF');
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
        gImagen(response);
        mascotaItem.foto_url = null;
        setCambioFoto(true);
        gColorCamara('#FFFFFF');
      }
    });
  };

  return (
    <View style={{backgroundColor: '#FFFFFF'}}>
      <KeyboardAwareScrollView style={style.scroll}>
        <View style={globalStyles.header}>
          <IconButton
            icon="arrow-left"
            color="#FFFFFF"
            style={globalStyles.iconBack}
            onPress={() => navigation.goBack()}
            size={30}
          />
          {mascotaItem.id === null && (
            <Text style={globalStyles.title}>Nueva mascota</Text>
          )}
          {mascotaItem.id !== null && (
            <Text style={globalStyles.title}>Editar mascota</Text>
          )}
          <IconButton
            icon="check"
            color="#FFFFFF"
            style={globalStyles.iconBack}
            onPress={() => guardarMascota()}
            size={30}
          />
        </View>
        <View style={globalStyles.base}>
          <View style={globalStyles.contenedor}>
            <View style={style.avatar}>
              {cambioFoto === true && (
                <Avatar.Image
                  size={190}
                  source={imagen}
                  style={style.avatarImage}
                />
              )}

              {cambioFoto === false && (
                <Image
                  style={style.avatarImage}
                  source={{
                    uri: mascotaItem.foto_url,
                  }}
                />
              )}
            </View>
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
                color={accion === 'ADOPCION' ? colorSelect : colorNoSelect}
                labelStyle={style.labelStyleGroup}
                onPress={() => setAccion('ADOPCION')}>
                Adopción
              </Button>
              <Button
                style={style.buttonG}
                mode="contained"
                color={accion === 'ENCONTRADO' ? colorSelect : colorNoSelect}
                compact={true}
                labelStyle={style.labelStyleGroup}
                onPress={() => setAccion('ENCONTRADO')}>
                Encontrado
              </Button>
              <Button
                style={style.buttonGR}
                mode="contained"
                color={accion === 'BUSCADO' ? colorSelect : colorNoSelect}
                compact={true}
                labelStyle={style.labelStyleGroup}
                onPress={() => setAccion('BUSCADO')}>
                Buscado
              </Button>
            </View>
            <View style={{paddingHorizontal: 20}}>
              <View style={style.rowNombre}>
                <TextInput
                  label="Nombre"
                  value={nombre}
                  onChangeText={(texto) => gNombre(texto)}
                  style={style.inputNombre}
                  disabled={checkedAdefinir}
                  onSubmitEditing={(event) => {
                    focusedTextInput(descRef);
                  }}
                />
                <View style={style.rowadefinir}>
                  <CheckBox
                    right
                    title={accion === 'ENCONTRADO' ? 'Sin Collar' : 'A definir'}
                    containerStyle={style.checkStyle}
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    checkedColor="#9575cd"
                    checked={checkedAdefinir}
                    onPress={() => {
                      setCheckedAdefinir(!checkedAdefinir);
                      gNombre('');
                    }}
                  />
                </View>
              </View>
              <TextInput
                label={'Descripción (' + (200 - descripcion.length) + ')'}
                value={descripcion}
                onChangeText={(texto) => gDescripcion(texto)}
                style={style.input}
                ref={descRef}
                maxLength={200}
                multiline={true}
                onSubmitEditing={(event) => {
                  focusedTextInput(edadRef);
                }}
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
                      color={
                        tipoMascota === 'PERRO' ? colorSelect : colorNoSelect
                      }
                      compact={true}
                      labelStyle={style.labelStyleGroup}
                      onPress={() => gTipoMascota('PERRO')}>
                      Perro
                    </Button>
                    <Button
                      style={style.buttonGRS}
                      mode="contained"
                      compact={true}
                      labelStyle={style.labelStyleGroup}
                      color={
                        tipoMascota === 'GATO' ? colorSelect : colorNoSelect
                      }
                      onPress={() => gTipoMascota('GATO')}>
                      Gato
                    </Button>
                  </View>
                  <View style={style.buttonGroupS}>
                    <Button
                      style={style.buttonGLS}
                      mode="contained"
                      compact={true}
                      color={sexo === 'MACHO' ? colorSelect : colorNoSelect}
                      labelStyle={style.labelStyleGroup}
                      onPress={() => gSexo('MACHO')}>
                      MACHO
                    </Button>
                    <Button
                      style={style.buttonGRS}
                      compact={true}
                      mode="contained"
                      labelStyle={style.labelStyleGroup}
                      color={sexo === 'HEMBRA' ? colorSelect : colorNoSelect}
                      onPress={() => gSexo('HEMBRA')}>
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
                  color={tamanio === 'CHICO' ? colorSelect : colorNoSelect}
                  compact={true}
                  labelStyle={style.labelStyleGroup}
                  onPress={() => gTamanio('CHICO')}>
                  chico
                </Button>
                <Button
                  style={style.buttonG}
                  mode="contained"
                  compact={true}
                  labelStyle={style.labelStyleGroup}
                  color={tamanio === 'MEDIANO' ? colorSelect : colorNoSelect}
                  onPress={() => gTamanio('MEDIANO')}>
                  Mediano
                </Button>
                <Button
                  style={style.buttonGR}
                  mode="contained"
                  compact={true}
                  labelStyle={style.labelStyleGroup}
                  color={tamanio === 'GRANDE' ? colorSelect : colorNoSelect}
                  animated={false}
                  onPress={() => gTamanio('GRANDE')}>
                  grande
                </Button>
              </View>
            </View>
            <Button
              style={style.ingresar}
              mode="contained"
              labelStyle={{color: '#FFFFFF'}}
              compact={true}
              onPress={() => guardarMascota()}>
              Guardar
            </Button>
            <Portal>
              <Dialog visible={alerta} style={globalStyles.dialog}>
                <Dialog.Title style={globalStyles.dialogTitle}>
                  {titulo}
                </Dialog.Title>
                <Dialog.Content style={globalStyles.dialogMsj}>
                  <Paragraph>{mensaje}</Paragraph>
                </Dialog.Content>
                <Dialog.Actions>
                  <Button
                    onPress={() => {
                      ingresarAlerta(false);
                      if (titulo !== 'Advertencia') {
                        navigation.navigate('misMascotas', {
                          consultarMascotas: true,
                        });
                      }
                    }}>
                    Ok
                  </Button>
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
  rowadefinir: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginStart: 5,
    marginTop: 'auto',
  },
  adefinir: {
    fontSize: 14,
    alignItems: 'baseline',
  },
  rowNombre: {
    flexDirection: 'row',
    marginBottom: 0,
  },
  checkStyle: {
    alignItems: 'baseline',
    backgroundColor: '#FFFFFF',
    borderWidth: 0,
    padding: 0,
  },
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
    backgroundColor: '#9575cd',
    elevation: 10,
    shadowOffset: {width: 1, height: 13},
  },
  fabRight: {
    bottom: 0,
    backgroundColor: '#9575cd',
    elevation: 10,
    shadowOffset: {width: 1, height: 13},
  },
  icon: {
    flex: 1,
  },
  ingresar: {
    backgroundColor: '#9575cd',
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
  inputNombre: {
    marginBottom: 3,
    backgroundColor: 'transparent',
    fontSize: 13,
    flex: 2,
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
    color: '#FFFFFF',
    padding: 0,
    margin: 0,
  },
});
export default CrearMascota;
