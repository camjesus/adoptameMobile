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
import Slider from '@react-native-community/slider';
import globalStyles from '../styles/global';
import axios from 'axios';

const Filtros = ({navigation, route}) => {
  console.log(route.params);
  const [edad, gEdad] = useState(30);
  const [mascotasDisponibles, gDisponiblesM] = useState([]);
  const [tipoMascota, gTipoMascota] = useState('');
  const [checkedPerro, setCheckedPerro] = React.useState(true);
  const [checkedGato, setCheckedGato] = React.useState(true);
  const [checkedMacho, setCheckedMacho] = React.useState(true);
  const [checkedHembra, setCheckedHembra] = React.useState(true);
  const [checkedPeque, setCheckedPeque] = React.useState(true);
  const [checkedMediano, setCheckedMediano] = React.useState(true);
  const [checkedGrande, setCheckedGrande] = React.useState(true);

  const filtros = [];
  const params = new URLSearchParams();

  const aplicarFiltros = () => {
    //agregar a los fitros
    if (checkedPerro) {
      gTipoMascota('Perro');
    }
    if (checkedGato) {
      gTipoMascota('Gato');
    }

    if (checkedPeque) {
      filtros.push(['tamanio', 'Pequenio']);
      params.append('tamanio', 'Pequenio');
    }
    if (checkedMediano) {
      filtros.push(['tamanio', 'Mediano']);
      params.append('tamanio', 'Mediano');
    }
    if (checkedGrande) {
      filtros.push(['tamanio', 'Grande']);
      params.append('tamanio', 'Grande');
    }

    if (checkedMacho) {
      filtros.push(['sexo', 'Macho']);
      params.append('sexo', 'Macho');
    }
    if (checkedHembra) {
      filtros.push(['sexo', 'Hembra']);
      params.append('sexo', 'Hembra');
    }
    filtros.push(['edad', edad]);
    params.append('edad', edad);

    console.log(params);
    console.log('FILTROS ' + filtros);
    navigation.navigate('Disponibles', {data: params});
    //obtenerMasDisponilbes();
  };

  const obtenerMasDisponilbes = async () => {
    try {
      var request = {
        params: params,
      };

      const mascoFilt = await axios.get(
        'http://10.0.2.2:8090/adoptame/mobile/listaMascotasDisponible',
        request,
      );
      console.log(mascoFilt.data);
      console.log('paso por obetener mascotas Disponibles en filtros');
      gDisponiblesM(mascoFilt.data);

      console.log('mascotasDisp');
      console.log(mascotasDisponibles);
      navigation.navigate('Disponibles', mascotasDisponibles);
    } catch (error) {
      console.log(error);
    }
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
      <View style={style.sliderCont}>
        <Text style={style.text}>{edad.toString()}</Text>
        <Slider
          step={1}
          maximumValue={30}
          onValueChange={(value) => {
            gEdad(parseFloat(value));
          }}
          value={edad}
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
  text: {
    fontSize: 10,
    textAlign: 'center',
  },
  sliderCont: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

export default Filtros;
