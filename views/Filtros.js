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
const Filtros = ({navigation, route}) => {
  const {gConsMascotaApi} = route.params;
  const [sexo, gSexo] = useState('');
  const [temanio, gTamanio] = useState('');
  const [edad, gEdad] = useState('');
  const [raza, gRaza] = useState('');
  const [tipoMascota, gTipoMascota] = useState('');
  const [longitud, gLongitud] = useState('');
  const [latitud, gLatitud] = useState('');
  const [fotoUrl, gFotoURL] = useState('');
  const [rescatista, gRescatista] = useState('');
  const [imagen, gImagen] = useState('');
  const [checkedPerro, setCheckedPerro] = React.useState(true);
  const [checkedGato, setCheckedGato] = React.useState(true);
  const [checkedMacho, setCheckedMacho] = React.useState(true);
  const [checkedHembra, setCheckedHembra] = React.useState(true);
  const [checkedPeque, setCheckedPeque] = React.useState(true);
  const [checkedMediano, setCheckedMediano] = React.useState(true);
  const [checkedGrande, setCheckedGrande] = React.useState(true);

  const aplicarFiltros = () => {
    if (checkedPerro && checkedGato) {
      gTipoMascota(null);
    } else {
      if (checkedPerro) {
        gTipoMascota('Perro');
      }
      if (checkedGato) {
        gTipoMascota('Gato');
      }
    }

    if (checkedPeque && checkedMediano && checkedGrande) {
      gTamanio(null);
      if (checkedPeque) {
        gTamanio('Pequenio');
      }
      if (checkedMediano) {
        gTamanio('Mediano');
      }
      if (checkedGrande) {
        gTamanio('Grande');
      }
    }

    if (checkedMacho && checkedHembra) {
      gSexo(null);
      if (checkedMacho) {
        gSexo('Macho');
      }
      if (checkedMacho) {
        gSexo('Hembra');
      }
    }

    const filtro = {
      sexo: sexo,
      tamanio: tamanio,
      tipoMascota: tipoMascota,
    };
    gConsMascotaApi(true);
    navigation.navigate('Disponibles', {filtro, gConsMascotaApi});
  };

  //<Headline style={globalStyles.titulo}> Crear nueva mascota</Headline>
  return (
    <View style={globalStyles.contenedor}>
      <Text style={style.titulo}>Tipo:</Text>
      <View style={style.mascotaRow}>
        <Text style={style.textCheck}>Perro</Text>
        <Checkbox
          status={checkedPerro ? 'checked' : 'unchecked'}
          onPress={() => {
            setCheckedPerro(!checkedPerro);
          }}
        />
        <Text style={style.textCheck}>Gato</Text>
        <Checkbox
          status={checkedGato ? 'checked' : 'unchecked'}
          onPress={() => {
            setCheckedGato(!checkedGato);
          }}
        />
      </View>
      <Text style={style.titulo}>Sexo:</Text>
      <View style={style.mascotaRow}>
        <Text style={style.textCheck}>Macho</Text>
        <Checkbox
          status={checkedMacho ? 'checked' : 'unchecked'}
          onPress={() => {
            setCheckedMacho(!checkedMacho);
          }}
        />
        <Text style={style.textCheck}>Hembra</Text>
        <Checkbox
          status={checkedHembra ? 'checked' : 'unchecked'}
          onPress={() => {
            setCheckedHembra(!checkedHembra);
          }}
        />
      </View>
      <Text style={style.titulo}>Tamaño:</Text>
      <View style={style.mascotaRow}>
        <Text style={style.textCheck}>Pequeño</Text>
        <Checkbox
          status={checkedPeque ? 'checked' : 'unchecked'}
          onPress={() => {
            setCheckedPeque(!checkedPeque);
          }}
        />
        <Text style={style.textCheck}>Mediano</Text>
        <Checkbox
          status={checkedMediano ? 'checked' : 'unchecked'}
          onPress={() => {
            setCheckedMediano(!checkedMediano);
          }}
        />
        <Text style={style.textCheck}>Grande</Text>
        <Checkbox
          status={checkedGrande ? 'checked' : 'unchecked'}
          onPress={() => {
            setCheckedGrande(!checkedGrande);
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
        />
      </View>
      <Button mode="contained" onPress={() => aplicarFiltros()}>
        Aplicar
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

export default Filtros;
