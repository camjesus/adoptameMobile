import {useState, useEffect, useCallback, useRef} from 'react';
import * as React from "react";
import {StyleSheet} from 'react-native';
import {GiftedChat, Bubble, InputToolbar, Send, Avatar} from 'react-native-gifted-chat';
import firebaseApp from '../database/firebaseDB';
import AsyncStorage from '@react-native-community/async-storage';
import * as firebase from 'firebase';
import _s from 'firebase/storage';
import firestore from 'firebase/firestore';
import {IconButton, Text, Button, Portal, Dialog, Paragraph, Modal} from 'react-native-paper';
import { View } from 'react-native';
import globalStyles from '../styles/global';
import axios from 'axios';
import constantes from '../components/context/Constantes'; 
import {Icon} from 'react-native-elements';

const db = firebase.firestore(firebaseApp);
const ChatScreen = (props) => {
  console.log('props chats');
  console.log(props);
  const {user} = props.route.params;
  console.log('user chats');
  console.log(user);
  const {navigation, chat, mascotaItem} = props.route.params;
  const [apellidoUsuario, setApellidoUsuario] = useState('');
  const [isFocus, setIsFocus] = useState(true);
  const chatRef = useRef(chat);
  const mascotaItemRef = useRef(mascotaItem);
  const [messages, setMessages] = useState([]);
  const [idChat, setidChat] = useState(props?.route.params.idChat);
  const [mensaje, setMensaje] = useState('');
  const [titulo, setTitulo] = useState('');
  const [visible, setVisible] = useState(false);
  const [modo, setModo] = useState('adoptante');
  const [accion, setAccion] = useState('');
  const [subSolc, setSubSolc] = useState('');
  const [visibleSolc, setvisibleSolc] = useState(false);
  

  useEffect(() => {
    //setChat(props.chat);
    //chatRef.current = chat;
    console.log('chat chats');
    console.log(chat);
    console.log(chatRef);
    if(user._id === chatRef.current.usuario1)
    {
      setModo('rescatista');
    }
    buscarChat();

  }, [])



  const sendMessageAuto = (messages) => {
    setMessages((previousMessages) => GiftedChat.append(previousMessages, messages));

        db.collection("mensajes")
        .add({
          _id: messages._id,
          text: messages.text,
          createdAt: messages.createdAt,
          system: true,
        idChat: chatRef.current.idChat
        });
  }

  const buscarChat = (props) => {
    console.log('Busco chats');
    console.log('idchat');
    console.log(idChat);
    console.log(mascotaItem);
    if(idChat == null){
      db.collection("chats")
    .where("usuario1", "==", chat?.usuario1)
    .where("usuario2", "==", chat?.usuario2)
    .where("idMascota", "==", chat?.idMascota)
    .onSnapshot((snapshot) => {
      console.log('snapshot');
      console.log(snapshot);
      
        snapshot.docs.map((doc) => (
        chatRef.current = {
        idChat: doc.id,
        fecha: doc.data().fecha,
        idMascota: doc.data().idMascota,
        imagenMascota: doc.data().foto_url,
        nombreMascota: doc.data().nombreMascota,
        nombreUsr1: doc.data().nombreUsr1,
        nombreUsr2: doc.data().nombreUsr2,
        usuario1: doc.data().usuario1,
        usuario2: doc.data().usuario2,
        solicitado: doc.data().solicitado,
      }));
      console.log('chatRef');
      console.log(chatRef);
      if(chatRef.current.idChat !== null)
      {
        buscarMensajes(chatRef.current.idChat);
      }
        //);
    });
  }else{
    console.log('esta pasando por aca otra vez?');
    buscarMensajes(idChat);
    }
    }

    const buscarMensajes = (id) => {
        console.log('Busco mensajes');
        console.log('idchat');
        console.log(id);
        var mensajes = [];
  
        db.collection('mensajes')
        .where('idChat', '==', id)
        //.get()
        .orderBy('createdAt', 'desc')
        .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({
          _id: doc.id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user,
          system: doc.data().system === undefined ? false : doc.data().system,
          })
          )
        );
        });
      console.log(messages);
    }
    
  

    const onSend = useCallback((messages = []) => {
    console.log(messages);
    var fecha = new Date();
    if(idChat === null)
    {
       db.collection("chats")
      .add({
            fecha: fecha,
            idMascota: mascotaItemRef.current.id,
            imagenMascota: mascotaItemRef.current.foto_url,
            nombreMascota: mascotaItemRef.current.nombre,
            nombreUsr1: mascotaItemRef.current.rescatista,
            nombreUsr2: user.name,
            usuario1: mascotaItemRef.current.rescatistaId,
            usuario2: user._id,
            solicitado: false,
      })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        setidChat(docRef.id);
        console.log('messages');
        console.log(messages);
        setMessages((previousMessages) => GiftedChat.append(previousMessages, messages));

        messages.forEach((item) => {
            db.collection("mensajes")
            .add({
              text: item.text,
              createdAt: new Date(),
              user: item.user,
              idChat: docRef.id,
              system: false
            });
        });
      });
    } else {
      setMessages((previousMessages) => GiftedChat.append(previousMessages, messages));
      console.log('messages sdas');
      console.log(messages);
      messages.forEach((item) => {
        db.collection("mensajes")
        .add({
          text: item.text,
          createdAt: new Date(),
          user: item.user,
          idChat: chatRef.current.idChat,
          system: false
        })
});
    
  };
});

const customtInputToolbar = props => {
  return (
    <InputToolbar
      {...props}
      placeholder="Escribí tu mensaje..."
      containerStyle={{
        backgroundColor: "white",
        borderTopColor: "#FFAD00",
        borderTopWidth: 1,
      }}
    />
  );
};

const customView = props => {
  return (
    <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: "#FFAD00"
        },
        left: {
          backgroundColor: "white",
          borderWidth: 1,
          borderColor: "#FFAD00",
        }
      }}
      textStyle={{
        right: {
          color: "white"
        },
        left: {
          color: "black"
        }
      }}
    />
  )
};

const renderSend = props => {
  console.log('props')
  console.log(props.renderSend);
  return (
    
    <Send
    {...props}
    containerStyle={{
    }}>
  <IconButton
        icon="paw"
        color="#000000"
        style={style.iconSend}
        size={33}
    />
</Send>
   
  )
}
const customAvatar = (props) => {
  return(
    <Avatar
    {...props}
    imageStyle={{
        height: 30,
        width: 10,
    }}
/>  
  );
  }

  const setDialog = (para) => {
    setAccion(para);
    switch (para) {
      case 'cancelar':
        setTitulo("Cancelar solicitud");
        setMensaje("Estas seguro de cancelar la solicitud de adopción?");
        break;

        case 'rechazar':
        setTitulo("Rechazar solicitud");
        setMensaje("Estas seguro de cancelar la solicitud de adopción?");
        break;
      case 'solicitar':
        setTitulo("Solicitar adopción");
        setMensaje("Estas seguro de solicitar la adopción?");
        break;

      case 'desvincular':
        setTitulo("Desvincular adoptante");
        setMensaje("Estas seguro de desvincular al adoptante?");
        break;
      case 'vincular':
        setTitulo("Vincular adoptante");
        setMensaje("Estas seguro que quieres que vincuar al adoptante?");
        break;
      case 'adoptado':
        setTitulo("Ups!");
        setMensaje("Esta mascota fue adoptada! Pero no pierdas las esperanzas! Encontraremos otrx compa!");
        break;
    }
    setVisible(true);
  }

  const reseteoSolicitudes = () => {
    //usco los chats con la mascota
    db.collection('chats')
    .where("idMascota", "==", mascotaItemRef.current.id)
    .where("solicitado", "==", true)
    .get()
    .then((response) => {
      console.log('response.doc');
      console.log(response.doc);
     response.forEach((doc) => {
      sendMessageAuto({
        _id: Math.random().toString(36).substring(7),
        text: 'La mascota solicitada, fue adoptada por otra persona! Otra mascota te esta esperando!',
        createdAt: new Date(),
        system: true,
      idChat: doc.id,
      });
      db.collection('chats')
      .doc(doc.id)
      .update({
        solicitado: false
      })
  })
    });
  }

  const updateChat = (accion, chatDoc) => {
    console.log('accion');
    console.log(accion);
    console.log(chatDoc);
    
     db.collection('chats')
     .doc(chatDoc)
      .update({
        solicitado: accion
      })
      chatRef.current.solicitado = accion;
  }

  const asociarAdoptante = async (idAdoptante, id) => {
    console.log('idAdoptante');
    console.log(idAdoptante);
    console.log('id');
    console.log(id);

    const postAdoptante = {id, idAdoptante: idAdoptante};
    mascotaItemRef.current.idAdoptante = idAdoptante;
    const url = constantes.BASE_URL + 'asociarDesasociar';

    const resultado = await axios.post(url, postAdoptante);
    console.log('DATA ' + resultado.data);
    mascotaItemRef.current = resultado.data;
    console.log('idAdoptante');
    console.log(idAdoptante);
  };

    return(
    
      <View style={{flex: 1}}>
        <View>
        <View style={globalStyles.header}>
        <IconButton
          icon="arrow-left"
          color="#FFFFFF"
          style={globalStyles.iconBack}
          onPress={() => navigation.goBack()}
          size={30}
        />
        {user._id === chat?.usuario1 && (
          <View style={style.viewR}>     
                    <Icon
                    style={style.titleIcon}
                    size={25}
                    name="paw"
                    type="material-community"
                    color="#FFFFFF"
                  />  
                <Text style={style.title}>{chat?.nombreMascota} | {chat?.nombreUsr1}</Text>
                <Icon
                    style={style.titleIcon}
                    size={25}
                    name="account"
                    type="material-community"
                    color="#FFFFFF"
                  />  
                  </View>
        )}
          {user._id === chat?.usuario2 && (
                <View style={style.viewR}>     
                    <Icon
                    style={style.titleIcon}
                    size={25}
                    name="paw"
                    type="material-community"
                    color="#FFFFFF"
                  />  
                <Text style={style.title}>{chat?.nombreMascota} | {chat?.nombreUsr1}</Text>
                <Icon
                    style={style.titleIcon}
                    size={25}
                    name="account"
                    type="material-community"
                    color="#FFFFFF"
                  />  
                  </View>
        )}

        
        {(mascotaItemRef.current.idAdoptante === null 
        && chatRef.current.solicitado === false
        && modo === "adoptante") && (
          <IconButton
          icon="home-heart"
          color="#FFFFFF"
          style={globalStyles.viewR}
          onPress={() => setDialog('solicitar')}
          size={30}
        />
        )}

        {(mascotaItemRef.current.idAdoptante ===  chatRef.current.usuario2
        && modo === 'rescatista') &&(
          <IconButton
          icon="account-remove"
          color="#FFFFFF"
          style={globalStyles.viewR}
          onPress={() => setDialog('desvincular')}
          size={30}
        />
        )}

    {(mascotaItemRef.current.idAdoptante === null 
        && chatRef.current.solicitado === true
        && modo === 'rescatista') &&(
          <View style={{position: 'absolute', right: 15}}>
      <IconButton
          icon="check"
          color="#4FC70F"
          style={style.viewLIcon}
          onPress={() => {
            setDialog('vincular')
         } }
          size={30}
        />
          <IconButton
          icon="close"
          color="#F65842"
          style={style.viewRIcon}
          onPress={() => setDialog('rechazar')}
          size={30}
        />
          </View>
        )}


    {(mascotaItemRef.current.idAdoptante !== null 
        && modo === "adoptante") && (
          <IconButton
          icon="home-heart"
          color="#F65842"
          style={globalStyles.viewR}
          onPress={() => setDialog('adoptado')}
          size={30}
        />

        )}

      {(mascotaItemRef.current.idAdoptante === null
        && modo === "rescatista") && (
          <View style={globalStyles.viewR}></View>
        )}

      {(mascotaItemRef.current.idAdoptante === null 
       && chatRef.current.solicitado === true
        && modo === "adoptante") && (
          <IconButton
          icon="paw-off"
          color="#F65842"
          style={globalStyles.viewR}
          onPress={() => setDialog('cancelar')}
          size={30}
        />
        )}
      </View>
      </View>
      {(mascotaItemRef.current.idAdoptante === null 
        && chatRef.current.solicitado === true
        && modo === "adoptante") && (
          <View style={style.viewPopup}>
          <Text style={style.text}>
          Has solicitado la adopción! Estamos en la espera de la respuesta!
        </Text>
        </View>
        )}

      {(mascotaItemRef.current.idAdoptante === null 
        && chatRef.current.solicitado === true
        && modo === "rescatista") && (
          <View style={style.viewPopupSolc}>
          <Text style={style.text}>
          Te han solicitado la adopción! Estamos en la espera de tu respuesta!
        </Text>
        </View>
        )}

      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={user}
        maxInputLength={200}
        renderInputToolbar={(props) => customtInputToolbar(props)}
        renderBubble={(props) => customView(props)}
        renderSend={(props) => renderSend(props)}
        renderAvatar={(props) => customAvatar(props, chat)}
      />

      <Portal>
        <Dialog visible={visible} style={globalStyles.dialog}>
            <Dialog.Title style={globalStyles.dialogTitle}>{titulo}</Dialog.Title>
          <Dialog.Content>
            <Paragraph style={globalStyles.dialogMsj}>{mensaje}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
          <Button
              style={{marginHorizontal: 10}}
              onPress={() => {
                setVisible(false);
              }}>
              Cancelar
            </Button>
              <Button
              color="#FFAD00"
                mode="contained"
                style={{marginHorizontal: 10}}
                onPress={() => {
                
                  switch (accion) {
                    case 'cancelar':
                      sendMessageAuto({
                        _id: Math.random().toString(36).substring(7),
                        text: 'Se ha cancelado la solicitud',
                        createdAt: new Date(),
                        system: true,
                        idChat: chatRef.current.idChat,
                      });
                      updateChat(false, chatRef.current.idChat);
                      break;
                    
                    case 'solicitar':
                      sendMessageAuto({
                          _id: Math.random().toString(36).substring(7),
                          text: 'Se ha solicitado la adopción',
                          createdAt: new Date(),
                          system: true,
                        idChat: chatRef.current.idChat,
                      });
                      updateChat(true, chatRef.current.idChat);
                      break;
              
                    case 'desvincular':
                      mascotaItemRef.current.idAdoptante = null;
                      asociarAdoptante(0, mascotaItemRef.current.id);
                      sendMessageAuto({
                        _id: Math.random().toString(36).substring(7),
                          text: 'Se ha desvinculado el adoptante',
                          createdAt: new Date(),
                          system: true,
                        idChat: chatRef.current.idChat,
                      });
                      break;
                    case 'vincular':
                      sendMessageAuto({
                        _id: Math.random().toString(36).substring(7),
                          text: 'Se ha vinculado el adoptante',
                          createdAt: new Date(),
                          system: true,
                        idChat: chatRef.current.idChat,
                      });
                      updateChat(false, chatRef.current.idChat);
                      asociarAdoptante(chatRef.current.usuario2, chatRef.current.idMascota);
                      reseteoSolicitudes();
                      break;
                      case 'rechazar':
                      sendMessageAuto({
                        _id: Math.random().toString(36).substring(7),
                        text: 'Se ha rechazado la solicitud',
                        createdAt: new Date(),
                        system: true,
                        idChat: chatRef.current.idChat,
                      });
                      updateChat(false, chatRef.current.idChat);
                      break;
                  }
                  setVisible(false);

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
  titleIcon: {
    alignItems: 'baseline'
  },
  title: {
    color: '#FFFFFF',
    fontSize: 26,
    padding: 0,
    marginVertical: 0, 
    alignItems: 'baseline',
    textTransform: 'capitalize',
    marginHorizontal: 3
  },
  viewLIcon: {
    marginHorizontal: 0,
    paddingHorizontal: 0,
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    right: 0,
    marginTop: 50,
    elevation: 6
  },
  viewRIcon: {
    marginHorizontal: 0,
    paddingHorizontal: 0,
    right: 50,
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    marginTop: 50,
    elevation: 6
  },
  viewR: {
    flexDirection: 'row',
    marginTop: 20
  },
  renderMessage: {
    backgroundColor: "#FFAD00"
  },
  sendIcon: {
    fontSize: 25,
    color: '#3A97F9'
},
iconSend: {
  marginVertical: 'auto',
      justifyContent: 'center',
      alignItems: 'flex-start'
},
textAvatar: {
  backgroundColor: "#FFAD00"
},
viewPopupSolc: {
  position: 'absolute',
  marginHorizontal: "20%",
  marginTop: '25%',
  marginVertical: 10,
  top: 0,
  padding: 9,
  backgroundColor: '#FFFFFF',
  borderRadius: 10,
  borderColor: '#FFAD00',
  borderStyle: 'solid',
  borderWidth: 1,
  elevation: 6,
},
viewPopup: {
  position: 'absolute',
  marginHorizontal: "20%",
  marginTop: '23%',
  marginVertical: 10,
  top: 0,
  //bottom: 50,
  padding: 10,
  backgroundColor: '#FFFFFF',
  borderRadius: 10,
  borderColor: '#FFAD00',
  borderStyle: 'solid',
  borderWidth: 1,
  elevation: 10,
},
text: {
  textAlign: 'center',
  marginHorizontal: 4,
},
text1: {
  textAlign: 'center',
  marginHorizontal: 5,
  marginTop: 10
}

});

export default ChatScreen;
