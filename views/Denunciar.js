import React, {useEffect, useState} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {Headline, FAB, Checkbox} from 'react-native-paper';
import axios from 'axios';
import globalStyles from '../styles/global';
import MascotaItem from '../components/ui/MascotaItem';
import AsyncStorage from '@react-native-community/async-storage';
import {
  Text,
  Card,
  IconButton,
  Button,
  TextInput,
  Portal,
  Dialog,
  Paragraph,
} from 'react-native-paper';
import Maticons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {useIsFocused} from '@react-navigation/native';
import constantes from '../components/context/Constantes';

const Denunciar = (props, route) => {
  const {params} = route;
  console.log(props.route.params);
  const {navigation} = props;
  const {mascotaItem} = props.route.params;
  const [denuncias, guardarDenuncias] = useState([]);
  const [userId, gUserId] = useState();
  const [otro, gOtro] = useState('');
  const [motivoID, gMotivoID] = useState(0);
  const [consultoDenuncias, gConsultoDenuncias] = useState(true);
  const [estilo, gEstilo] = useState(true);
  const [alerta, ingresarAlerta] = useState(false);

  useEffect(() => {
    console.log('pase por el effect');
    if  (consultoDenuncias) {
      obtenerDatosStorage();
      gConsultoDenuncias(false);
    }
  }, [consultoDenuncias]); //cuando la pantalla tiene el foco

  const obtenerDatosStorage = async () => {
    try {
      await AsyncStorage.getItem('userId');
      AsyncStorage.getItem('userId').then((value) => {
        gUserId(parseInt(value));
      });
    } catch (error) {
      console.log(error);
    }
  };

  const enviarDenuncia = async () => {
    var newDenuncia = new FormData();
    newDenuncia.append('idMotivo', motivoID);
    newDenuncia.append('idMascota', mascotaItem.id);
    newDenuncia.append('idPersona', userId);
    newDenuncia.append('otro', otro);

    const urdenuncia = constantes.BASE_URL + 'addDenuncia/';
    console.log(newDenuncia);

    const resultado = await axios.post(urdenuncia, newDenuncia);
    console.log(resultado);

    ingresarAlerta(true);
  };

  return (
    <View>
      <ScrollView>
        <View style={(globalStyles.base, {flex: 1})}>
          <View style={globalStyles.header}>
            <IconButton
              icon="arrow-left"
              color="#FFFFFF"
              style={globalStyles.iconBack}
              onPress={() => navigation.goBack()}
              size={30}
            />


        <Text style={globalStyles.title}>Reportar</Text>

            <View style={globalStyles.viewR} />
          </View>
          <View style={{marginVertical: '5%'}}>
            <TouchableOpacity
              onPress={() => {
                gMotivoID(2);
                gOtro('');
                console.log(motivoID);
              }}>
              <View
                style={
                  motivoID !== 2 ? style.viewMotivos : style.viewMotivosDesc
                }>
                <Maticons
                  style={style.advertencia}
                  name="alert-outline"
                  size={80}
                  color="#9575cd"
                />
                <Text style={style.motivoText}>
                  Estan pidiendo dinero por esta mascota
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                gMotivoID(1);
                gOtro('');
                console.log(motivoID);
              }}>
              <View
                style={
                  motivoID !== 1 ? style.viewMotivos : style.viewMotivosDesc
                }>
                <Maticons
                  style={style.advertencia}
                  name="eye-off-outline"
                  size={80}
                  color="#9575cd"
                />
                <Text style={style.motivoText}>
                  La información tiene contenido inapropiado
                </Text>
              </View>
            </TouchableOpacity>

            <View style={style.viewOtro}>
              <TextInput
                label={'Otro (' + (200 - otro.length) + ')'}
                value={otro}
                onChangeText={(texto) => {
                  gOtro(texto);
                  gMotivoID(0);
                ;}}
                style={style.inputOtro}
                maxLength={200}
                multiline={true}
              />
            </View>
            <View>
              <Button
                style={style.guardar}
                mode="contained"
                icon="send"
                rigth
                onPress={() => enviarDenuncia()}>
                Enviar
              </Button>
            </View>
          </View>
        </View>
      </ScrollView>
      <Portal>
        <Dialog visible={alerta} style={globalStyles.dialog}>
          <Dialog.Title style={globalStyles.dialogTitle}>Mensaje</Dialog.Title>
          <Dialog.Content>
            <Paragraph style={globalStyles.dialogMsj}>
              El reporte se envió con éxito
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              mode="contained"
              onPress={() => {
                ingresarAlerta(false);
                navigation.navigate('DetalleMascota', {
                  mascotaItem: mascotaItem,
                  idMascota: mascotaItem.id,
                });
              }}>
              Ok
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};
const style = StyleSheet.create({
  advertencia: {
    margin: 10,
  },
  viewMotivos: {
    justifyContent: 'center',
    padding: 10,
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginHorizontal: '18%',
    marginBottom: 20,
    paddingBottom: 30,
    elevation: 4,
    borderRadius: 10,
  },
  viewMotivosDesc: {
    justifyContent: 'center',
    padding: 10,
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginHorizontal: '18%',
    marginBottom: 20,
    paddingBottom: 30,
    elevation: 4,
    borderRadius: 10,
    backgroundColor: '#f5bb05',
  },
  motivoText:
  {
    fontSize: 20,
    textAlign: 'center',
    paddingHorizontal: 15,
  },
  viewOtro: {
    justifyContent: 'flex-end',
    marginHorizontal: '10%',
    borderColor: '#9575cd',
    borderWidth: 3,
    borderStyle: 'solid',
    padding: 10,
    borderRadius: 10,
    bottom: 0,
    marginTop: 20,
  },
  inputOtro: {
    marginBottom: 3,
    backgroundColor: 'transparent',
    fontSize: 13,
  },
  guardar: {
    justifyContent: 'flex-end',
    backgroundColor: '#9575cd',
    padding: 3,
    borderRadius: 5,
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: {width: 1, height: 13},
    marginHorizontal: 40,
    marginTop: 30,
    marginBottom: 10,
  },
});

export default Denunciar;
