import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  TextInput,
  Headline,
  Button,
  Checkbox,
  Text,
  Card,
} from 'react-native-paper';
import globalStyles from '../styles/global';
import axios from 'axios';

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
  const [fotoUrl, gFotoURL] = useState('');
  const [rescatista, gRescatista] = useState('');
  const [imagen, gImagen] = useState('');
  const [checkedPerro, setCheckedPerro] = React.useState(true);
  const [checkedGato, setCheckedGato] = React.useState(false);
  const [checkedMacho, setCheckedMacho] = React.useState(true);
  const [checkedHembra, setCheckedHembra] = React.useState(false);
  const [disableEdad, gDisableEddad] = React.useState(true);

  const guardarMascota = async () => {
    try {
      const postMascotas = {nombre, sexo,tamanio};

      const resultado = await axios.post(
        'http://10.0.2.2:8090/adoptame/mobile/uploadPet',
        postMascotas,
      );      
      
      gConsMascotaApi(true);
    } catch (error) {
      console.log(error);
    }
  };

 

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
          onChangeText={(texto) => gEdad(texto)}
          style={style.edad}
          disabled={disableEdad}
        />
        
      </View>
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
});
export default CrearMascota;
