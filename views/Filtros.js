import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  TextInput,
  Headline,
  Button,
  Checkbox,
  Text,
  Card,
  Switch,
} from 'react-native-paper';
import Slider from '@react-native-community/slider';
import globalStyles from '../styles/global';
import axios from 'axios';
import GetLocation from 'react-native-get-location';


const Filtros = ({navigation, route}) => {
  console.log(route.params);
  const [edad, gEdad] = useState(30);
  const [mascotasDisponibles, gDisponiblesM] = useState([]);
  const [tipoMascota, gTipoMascota] = useState('');
  const [distancia, gDistancia] = useState(100);
  const [latitud, setLatitud] = useState(-34.6038);
  const [longitud, setLongitud] = useState(-58.3818);


  const [checkedMacho, setCheckedMacho] = React.useState(true);
  const [checkedHembra, setCheckedHembra] = React.useState(true);
  const [checkedPeque, setCheckedPeque] = React.useState(true);
  const [checkedMediano, setCheckedMediano] = React.useState(true);
  const [checkedGrande, setCheckedGrande] = React.useState(true);
  const km = ' km';
  const anios = ' años';
  const filtros = [];
  const params = new URLSearchParams();

  const aplicarFiltros = () => {
   
    if (checkedPeque) {
      params.append('tamanio', 'CHICO');
    }
    if (checkedMediano) {
      params.append('tamanio', 'MEDIANO');
    }
    if (checkedGrande) {
      params.append('tamanio', 'GRANDE');
    }

    if (checkedMacho) {
      params.append('sexo', 'MACHO');
    }
    if (checkedHembra) {
      params.append('sexo', 'HEMBRA');
    }
    params.append('edad', edad);

    console.log(params);
    navigation.navigate('Disponibles', {data: params});
  };






  

  return (
    <View style={globalStyles.base}>
      <View style={globalStyles.contenedor}>
        <Text style={style.titulo}>Sexo:</Text>
        <View style={style.mascotaRow}>
          <Text style={style.textCheck}>Macho</Text>
          <Switch
            value={checkedMacho}
            onValueChange={() => {
              setCheckedMacho(!checkedMacho);
            }}
          />
          <Text style={style.textCheck}>Hembra</Text>
          <Switch
            value={checkedHembra}
            onValueChange={() => {
              setCheckedHembra(!checkedHembra);
            }}
          />
        </View>
        <Text style={style.titulo}>Tamaño:</Text>
        <View style={style.mascotaRow}>
          <Text style={style.textCheck}>Pequeño</Text>
          <Switch
            value={checkedPeque}
            onValueChange={() => {
              setCheckedPeque(!checkedPeque);
            }}
          />
          <Text style={style.textCheck}>Mediano</Text>
          <Switch
            value={checkedMediano}
            onValueChange={() => {
              setCheckedMediano(!checkedMediano);
            }}
          />
          <Text style={style.textCheck}>Grande</Text>
          <Switch
            value={checkedGrande}
            onValueChange={() => {
              setCheckedGrande(!checkedGrande);
            }}
          />
        </View>
        <Text style={style.titulo}>Edad:</Text>
        <View style={style.sliderCont}>
          <Text style={style.text}>
            {edad.toString()}
            {anios}
          </Text>
          <Slider
            step={1}
            maximumValue={30}
            onValueChange={(value) => {
              gEdad(parseFloat(value));
            }}
            value={edad}
            minimumTrackTintColor="#FF9D4E"
            maximumTrackTintColor="#FFFFFF"
            thumbTintColor="#FFFFFF"
          />
        </View>
        <Text style={style.titulo}>Distancia:</Text>
        <View style={style.sliderCont}>
          <Text style={style.text}>
            {distancia.toString()}
            {km}
          </Text>
          <Slider
            step={10}
            maximumValue={100}
            onValueChange={(value) => {
              gDistancia(parseFloat(value));
            }}
            value={distancia}
            minimumTrackTintColor="#FF9D4E"
            maximumTrackTintColor="#FFFFFF"
            thumbTintColor="#FFFFFF"
          />
        </View>
        <Button
          style={style.ingresar}
          mode="contained"
          onPress={() => aplicarFiltros()}>
          Aplicar
        </Button>
      </View>
    </View>
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
    marginTop: 40,
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
  mascotaRow: {
    flexDirection: 'row',
    paddingBottom: 8,
    justifyContent: 'center',
  },
  textCheck: {
    paddingTop: 8,
    marginStart: 15,
  },
  titulo: {
    fontSize: 20,
    margin: 10,
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
  slider: {
    color: '#FF9D4E',
  },
});

export default Filtros;
