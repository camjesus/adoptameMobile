import {useState, useEffect, useRef} from 'react';
import * as React from 'react';
import {Plataform, StyleSheet, FlatList, View, Text} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import firebaseApp from '../database/firebaseDB';
import AsyncStorage from '@react-native-community/async-storage';
import * as firebase from 'firebase';
import _s from 'firebase/storage';
import firestore from 'firebase/firestore';
import {Button, IconButton} from 'react-native-paper';
import CardChat from '../components/ui/CardChat';
import {ScrollView} from 'react-native-gesture-handler';
import globalStyles from '../styles/global';

const db = firebase.firestore(firebaseApp);

const ListaChats = (props) => {
  const {navigation} = props;
  const [apellidoUsuario, setApellidoUsuario] = useState('');
  const [isFocus, setIsFocus] = useState(true);
  const [chats1, setchats1] = useState();
  const [chats, setchats] = useState();
  const [chatsTest, setchatsTest] = useState();
  const [userId, gUserId] = useState(null);
  const [usernombre, gNombre] = useState(null);
  const [mascotaItem, setmascotaItem] = useState({});
  const [tipoB, setTipoB] = useState('mismascotas');
  const _chats = [];
  const _chats1 = [];

  const user = {_id: userId, name: usernombre};
  useEffect(() => {
    if (userId !== null) {
      tipoBusqueda(userId, tipoB);
    } else {
      obtenerDatosStorage();
    }
  }, [userId]);

  const obtenerDatosStorage = async () => {
    await AsyncStorage.getItem('userId').then((value) => {
      gUserId(parseInt(value));
    });

    await AsyncStorage.getItem('nombre').then((value) => {
      gNombre(
        value.substring(0, 1).toUpperCase() + value.substr(1, value.length - 1),
      );
    });
  };

  const tipoBusqueda = (id, tipoB) => {
    console.log('Busco chats');
    console.log('idchat');
    setTipoB(tipoB);

    console.log('userId');
    console.log(id);
    if (tipoB == 'mispreguntas') {
      db.collection('chats')
        .where('usuario2', '==', id)
        //.get()
        .onSnapshot((snapshot) => {
          setchats(
            snapshot.docs.map((doc) => ({
              _id: doc.id,
              chat: doc.data(),
            })),
          ),
            _chats.push(chats);
        });
    } else {
      db.collection('chats')
        .where('usuario1', '==', id)
        .onSnapshot((snapshot) => {
          setchats1(
            snapshot.docs.map((doc) => ({
              _id: doc.id,
              chat: doc.data(),
            })),
          );
        });
    }
  };

  return (
    <View>
      <View style={globalStyles.header}>
        <IconButton
          icon="arrow-left"
          color="#FFFFFF"
          style={globalStyles.iconBack}
          onPress={() => navigation.goBack()}
          size={30}
        />
        <Text style={globalStyles.title}>Chats</Text>
        <View style={globalStyles.viewR} />
      </View>
      <View style={styles.tipoBusqueda}>
        <Button
          style={styles.buttonGL}
          mode="contained"
          color={tipoB === 'mismascotas' ? '#9575cd' : '#ffffff'}
          labelStyle={styles.labelStyleGroup}
          onPress={() => tipoBusqueda(userId, 'mismascotas')}>
          Mis Mascotas
        </Button>
        <Button
          style={styles.buttonGR}
          mode="contained"
          color={tipoB === 'mispreguntas' ? '#9575cd' : '#ffffff'}
          labelStyle={styles.labelStyleGroup}
          onPress={() => tipoBusqueda(userId, 'mispreguntas')}>
          Mis Preguntas
        </Button>
      </View>
      {tipoB === 'mispreguntas' && chats === [] && (
        <Text style={globalStyles.msjAdvertencia}>No tiene chats</Text>
      )}
      <View style={{paddingVertical: 15}}>
        {tipoB === 'mispreguntas' && (
          <View>
            <FlatList
              data={chats}
              renderItem={({item}) => (
                <CardChat item={item} navigation={navigation} user={user} />
              )}
              keyExtractor={(item) => item._id}
            />
          </View>
        )}

        {tipoB === 'mismascotas' && (
          <FlatList
            data={chats1}
            renderItem={({item}) => (
              <CardChat item={item} navigation={navigation} user={user} />
            )}
            keyExtractor={(item) => item._id}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tipoBusqueda: {
    flexDirection: 'row',
    marginTop: 10,
    paddingHorizontal: 10,
    marginHorizontal: 5,
  },
  buttonGL: {
    borderBottomLeftRadius: 30,
    borderTopLeftRadius: 30,
    flex: 2,
  },
  buttonGR: {
    borderBottomRightRadius: 30,
    borderTopRightRadius: 30,
    flex: 2,
  },
});

export default ListaChats;
