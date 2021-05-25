import React, {useState, useEffect} from 'react';
import {StyleSheet, View,Alert} from 'react-native';
import {
  TextInput,
  Headline,
  Button,
  Checkbox,
  Text,
  Card,
  Switch,
  IconButton,
} from 'react-native-paper';
import Slider from 'react-native-slider';
import globalStyles from '../styles/global';
import axios from 'axios';
import GetLocation from 'react-native-get-location';

const Filtros = ({navigation, route}) => {
  console.log(route.params);
  const [edad, gEdad] = useState(30);
  const [distancia, gDistancia] = useState(100);

  const [checkedMacho, setCheckedMacho] = React.useState(true);
  const [checkedHembra, setCheckedHembra] = React.useState(true);
  const [checkedPeque, setCheckedPeque] = React.useState(true);
  const [checkedMediano, setCheckedMediano] = React.useState(true);
  const [checkedGrande, setCheckedGrande] = React.useState(true);
  const km = ' km';
  const anios = ' años';
  const params = new URLSearchParams();

  const aplicarFiltros = (latitud, longitud) => {
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

    params.append("latitud",latitud);
    params.append("longitud",longitud);
    params.append("distancia",distancia);

    console.log(params);
    navigation.navigate('Disponibles', {data: params});
  };

  const getCurrentPosition = async () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then((location) => {
        console.log(location);
        aplicarFiltros(location.latitude, location.longitude);
      })
      .catch((error) => {
        const {code, message} = error;
        Alert.alert(`Ha ocurrido un error , intente mas tarde`);
        console.warn(code, message);
      });
  };

  return (
    <View style={globalStyles.base}>
      <View style={globalStyles.header}>
        <IconButton
          icon="arrow-left"
          color="#FFFFFF"
          style={globalStyles.iconBack}
          onPress={() => navigation.goBack()}
          size={30}
        />
        <Text style={globalStyles.title}>Filtros</Text>
        <View style={globalStyles.viewR}></View>
      </View>
      <View style={style.contenedor}>
        <View style={style.labelTS}>
          <Text style={style.titulo}>Tipo:</Text>
          <Text style={style.titulo}>Sexo:</Text>
        </View>
        <View style={style.contenedorRowTS}>
          <View style={style.mascotaRowTS}>
          <View style={style.mascotaCol}>
            <Text style={style.textCheck}>Perro</Text>
            <Switch
              value={checkedMacho}
              color="#FFAD00"
              onValueChange={() => {
                setCheckedMacho(!checkedMacho);
              }}
            />
            </View>
            <View style={style.mascotaCol}>
              <Text style={style.textCheck}>Gato</Text>
              <Switch
                value={checkedHembra}
                color="#FFAD00"
                onValueChange={() => {
                  setCheckedHembra(!checkedHembra);
                }}
              />
            </View>
          </View>
          <View style={style.mascotaRowTS}>
          <View style={style.mascotaCol}>
            <Text style={style.textCheck}>Macho</Text>
            <Switch
              value={checkedMacho}
              color="#FFAD00"
              onValueChange={() => {
                setCheckedMacho(!checkedMacho);
              }}
            />
            </View>
            <View style={style.mascotaCol}>
            <Text style={style.textCheck}>Hembra</Text>
            <Switch
              value={checkedHembra}
              color="#FFAD00"
              onValueChange={() => {
                setCheckedHembra(!checkedHembra);
              }}
            />
            </View>
          </View>
        </View>
        <Text style={{fontSize: 18, marginTop: 20}}>Tamaño:</Text>
        <View style={style.mascotaRow}>
        <View style={style.mascotaCol}>
          <Text style={style.textCheck}>Pequeño</Text>
          <Switch
            value={checkedPeque}
            color="#FFAD00"
            onValueChange={() => {
              setCheckedPeque(!checkedPeque);
            }}
          />
          </View>
          <View style={style.mascotaCol}>
          <Text style={style.textCheck}>Mediano</Text>
          <Switch
            value={checkedMediano}
            color="#FFAD00"
            onValueChange={() => {
              setCheckedMediano(!checkedMediano);
            }}
          />
          </View>
          <View style={style.mascotaCol}>
          <Text style={style.textCheck}>Grande</Text>
          <Switch
            value={checkedGrande}
            color="#FFAD00"
            onValueChange={() => {
              setCheckedGrande(!checkedGrande);
            }}
          />
          </View>
        </View>
        <Text style={{fontSize: 18, marginTop: 20}}>Edad:</Text>
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
            minimumTrackTintColor="#FFAD00"
            maximumTrackTintColor="#D0800A"
            thumbTintColor="#FFAD00"
            style={{marginVertical: 10}}
          />
        </View>
        <Text style={{fontSize: 18, marginTop: 20}}>Distancia:</Text>
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
            minimumTrackTintColor="#FFAD00"
            maximumTrackTintColor="#D0800A"
            thumbTintColor="#FFAD00"
            thumbTouchSize={{width: 100, height: 100}}
            style={{marginVertical: 10, marginBottom: 30}}
          />
        </View>
        <Button
          style={style.ingresar}
          mode="contained"
          onPress={() => getCurrentPosition()}>
          Aplicar
        </Button>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  labelTS: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contenedorRowTS: {
    flexDirection: 'row',
  },
  ingresar: {
    justifyContent: 'flex-end',
    backgroundColor: '#FFAD00',
    borderRadius: 5,
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    elevation: 10,
    shadowRadius: 15,
    shadowOffset: {width: 1, height: 13},
    marginHorizontal: 50,
    marginTop: 'auto',
    marginBottom: 20,
  },
  contenedor: {
    flex: 1,
    flexDirection: 'column',
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 40,
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 10,
    shadowOffset: {width: 1, height: 13},
    marginVertical: 40,
    padding: 30,
    paddingTop: 40,
  },
  mascotaRow: {
    flexDirection: 'row',
    paddingBottom: 8,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-evenly'
  },
  mascotaCol: {
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center',
    paddingEnd: 9,
  },
  mascotaRowTS: {
    flexDirection: 'row',
    paddingBottom: 8,
    flex: 2,
  },
  textCheck: {
    paddingTop: 8,
    marginStart: 5,
  },
  titulo: {
    fontSize: 18,
    flex: 2,
  },
  textChEdad: {
    paddingTop: 8,
  },
  textCheckEdad: {
    paddingTop: 8,
    marginStart: 5,
  },
  text: {
    fontSize: 13,
    textAlign: 'center',
  },
  sliderCont: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  slider: {
    color: '#FFAD00',
  },
});

export default Filtros;
