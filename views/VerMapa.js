import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  LoginManager,
  AccessToken,
  GraphRequestManager,
  GraphRequest,
} from 'react-native-fbsdk';
import axios from 'axios';
import MapView from 'react-native-maps';
import Marker from 'react-native-maps';
import {FAB, Text} from 'react-native-paper';
import globalStyles from '../styles/global';

import GetLocation from 'react-native-get-location';

export default class VerMapa extends Component {
  constructor(props) {
    super();

    //por default va al obelisco
    this.state = {
      region: {
        latitude: -34.6038,
        longitude: -58.3818,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      marker: null,
    };
  }

  componentDidMount() {
    //obtiene la posicion actual para poder setear el mapa en donde estoy
    //componenDidmount es cuando carga la pantalla
    this.getCurrentLocation();
  }

  async getCurrentLocation() {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then((location) => {
        console.log(location);

        this.setState({
          region: {
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          },
        });
      })
      .catch((error) => {
        const {code, message} = error;
        console.warn(code, message);
      });
  }

  onMapPress(e) {
    console.log('longitud ' + e.nativeEvent.coordinate.latitude);
    console.log('Latitud' + e.nativeEvent.coordinate.longitude);
    this.setState({marker: e.nativeEvent.coordinate});
  }

  //vuelvo a la pantalla anterior y le paso las coordenadas elegidas
  goback() {
    this.props.navigation.navigate('crearMascota', {
      coordinates: this.state.marker,
    });
  }

  render() {
    return (
      //este boton es para poder volver atras ya que el encabezado  no lo mostramos
      //y de esta manera sobreescribimos el boton de volver para darle el comportamiento
      //que queremos , en este caso pasarle parametros
      <View style={{flex: 1, zIndex: -1}}>
        <MapView
          style={{flex: 1}}
          initialRegion={this.state.region}
          onPress={(e) => this.onMapPress(e)}
          zoomControlEnabled={true}>
          {
            //si hay un marcador lo muestro sino no
            //es para que cuando inicie y no haya ningun marcador no vuele por el aire
            this.state.marker && (
              <MapView.Marker coordinate={this.state.marker} />
            )
          }
        </MapView>
        <View style={styles.container}>
          <Text style={styles.textInfo}>
            Selecciona un punto de cercanía{'\n'} en el que se encuentra la mascota. {'\n'} Nadie podrá ver la
            dirección.
          </Text>
          <FAB
            icon="map-marker-radius"
            style={styles.fab}
            color="#FFFFFF"
            onPress={() => this.goback()}
            animated="true"
          />
          
        </View>
        <FAB
            icon="arrow-left"
            style={styles.fabBack}
            color="#FFFFFF"
            onPress={() => this.goback()}
            animated="true"
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fabBack: {
    position: 'absolute',
    backgroundColor: '#FFAD00',
    left: 0,
    top: 0,
    margin: 15,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#FFAD00',
  },
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
  container: {
    flexDirection: 'row',
  },
  textInfo: {
    position: 'absolute',
    margin: 30,
    marginRight: 10,
    right: 0,
    bottom: 50,
    padding: 7,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderColor: '#FFAD00',
    borderStyle: 'solid',
    textAlign: 'center',
    borderWidth: 1,
    elevation: 10,
  }
});
