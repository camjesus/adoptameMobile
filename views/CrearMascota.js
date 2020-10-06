import React, {useState, useEffect } from 'react';
import {StyleSheet, View,PermissionsAndroid,Image} from 'react-native';
import {
  TextInput,
  Headline,
  Button,
  Checkbox,
  Text,
  Card,
  TouchableOpacity
  
} from 'react-native-paper';
import globalStyles from '../styles/global';
import axios from 'axios';
import ImagePicker from 'react-native-image-picker';

const CrearMascota = ({route}) => {
  const {gConsMascotaApi} = route.params;
  const [nombre, gNombre] = useState('');
  const [sexo, gSexo] = useState('');
  const [tamanio, gTamanio] = useState('');
  const [descripcion, gDescripcion] = useState('');
  const [edad, gEdad] = useState('');
  const [raza, gRaza] = useState('');
  const [tipoMascota, gTipoMascota] = useState('');
  const [longitud, gLongitud] = useState('');
  const [latitud, gLatitud] = useState('');
  const [rescatista, gRescatista] = useState('');
  const [imagen, gImagen] = useState(null);
  const [checkedPerro, setCheckedPerro] = React.useState(true);
  const [checkedGato, setCheckedGato] = React.useState(false);
  const [checkedMacho, setCheckedMacho] = React.useState(true);
  const [checkedHembra, setCheckedHembra] = React.useState(false);
 
  const guardarMascota = async () => {
    try {
      const postMascotas = {nombre, sexo,tamanio,imagen};
      var bodyFormData = new FormData();
      bodyFormData.append('nombre', nombre);
      bodyFormData.append('estado', 'DISPONIBLE');

      if(checkedMacho){
        bodyFormData.append('sexo', 'MACHO');

      }else{
        bodyFormData.append('sexo', 'HEMBRA');

      }
      bodyFormData.append('tamanio', tamanio); //poner en pantalla
      bodyFormData.append('raza', raza);
      if(checkedPerro){
        bodyFormData.append('tipoMascota', 'PERRO');

      }else{
        bodyFormData.append('tipoMascota', 'GATO');

      }
      bodyFormData.append('raza', raza);
      bodyFormData.append('edad', edad);
      bodyFormData.append('descripcion', 'aca va la descripcion');


      bodyFormData.append('rescatista', '1'); //sacarlo de user storage
      bodyFormData.append('image', {
                                     name: imagen.fileName,
                                     type: imagen.type,
                                     uri:
                                     Platform.OS === "android" ? imagen.uri : imagen.uri.replace("file://", "")
                                    });

     axios.request({
       method: 'post',
       url: 'http://10.0.2.2:8090/adoptame/mobile/uploadPet',
       data: bodyFormData,
       headers: {
         'Content-Type': 'multipart/form-data'
       }        
      })
      .then(function (response) {
          //handle success
          console.log(response);
       })
      .catch(function (response) {
          //handle error
         console.log(response);
      });


    //  gConsMascotaApi(true);
    } catch (error) {
      console.log(error);
    }
  };



 

  useEffect(() => {
    console.log('entro a useEffec con la mascota ' );
  
    console.log(imagen);
  }, [imagen]);



 const selectPhotoTapped=async ()=> {
  const options = {
    quality: 1.0,
    maxWidth: 500,
    maxHeight: 500,
    storageOptions: {
      privateDirectory: true,
      skipBackup: true
    },
  };


  try {
    console.log("pidiendo permiso");
    await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
    ])

    const permissionCamera = await PermissionsAndroid.check('android.permission.CAMERA')
    const permissionWriteStorage = await PermissionsAndroid.check('android.permission.WRITE_EXTERNAL_STORAGE')
    const permissionREADStorage = await PermissionsAndroid.check('android.permission.READ_EXTERNAL_STORAGE')
    console.log("sali de perdir permiso");

    if (!permissionCamera || !permissionWriteStorage || !permissionREADStorage) {
      console.log("Failed to get the required permissions");

      return {
        error: 'Failed to get the required permissions.'
      }
    }
  } catch (error) {
    console.log("error"+error);

    return {
      error: 'Failed to get the required permissions.'
    }
  }

console.log("abriendo camara");

  ImagePicker.showImagePicker(options, response => {
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
}


  //<Headline style={globalStyles.titulo}> Crear nueva mascota</Headline>
  return (
    <View style={globalStyles.contenedor}>
      <TextInput
        label="Nombre"
        value={nombre}
        onChangeText={(texto) => gNombre(texto)}
        style={style.input}
      />
      <Text style={style.titulo}>Tipo:</Text>
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
      </View>
      <Text style={style.titulo}>Sexo:</Text>
      <View style={style.mascotaRow}>
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
      <Text style={style.titulo}>Edad:</Text>

      <View style={style.mascotaRow}>
        <TextInput
          label="Edad"
          value={edad}
          keyboardType = 'numeric'
          onChangeText={(texto) => gEdad(texto)}
          style={style.edad}
       />
      </View>
      

          
              <Button mode="contained" onPress={() => selectPhotoTapped()}>
              elegir foto
            </Button>
          <Image  style={style.imgMascota} source={imagen} />


     
     
      <Button mode="contained" onPress={() => guardarMascota()}>
        Guardar
      </Button>
    </View>
  );
};

const style = StyleSheet.create({
  contenedor: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    marginBottom: 20,
    backgroundColor: 'transparent',
  },
  mascotaRow: {
    flexDirection: 'row',
    paddingBottom: 8,
  },
  textCheck: {
    paddingTop: 8,
    marginStart: 50,
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
  }
});
export default CrearMascota;
