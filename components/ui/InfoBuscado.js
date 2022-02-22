import React from 'react'
import {View, Image} from 'react-native';
import {Button, Text, Portal, Modal} from 'react-native-paper';
import infoStyle from '../../styles/info';

function InfoBuscado({visible, hideModal}) {
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={infoStyle.modal}>
        <View style={infoStyle.InfoContent}>
          <View style={infoStyle.rowinfo}>
            <View style={infoStyle.columncenter}>
              <Image
                source={require('../../img/magnify.png')}
                style={infoStyle.imglogoInfo}
              />
            </View>
            <View>
              <Text style={infoStyle.sub}>Búsqueda</Text>
              <Text style={infoStyle.texto}>
                Estamos en busqueda de noticias. Entre todxs lo encontraremos
              </Text>
            </View>
          </View>
          <View style={infoStyle.rowinfo}>
            <View style={infoStyle.columncenter}>
              <Image
                source={require('../../img/home-heart.png')}
                style={infoStyle.imglogoInfo}
              />
            </View>
            <View>
              <Text style={infoStyle.sub}>Encontrado</Text>
              <Text style={infoStyle.texto}>
                Comparte con nosotros que has encontrado tu mascota!
              </Text>
            </View>
          </View>
        </View>
        <Button
          labelStyle={infoStyle.label}
          style={infoStyle.guardar}
          color="#FFC936"
          mode="contained"
          onPress={() => hideModal()}>
          Entendido
        </Button>
      </Modal>
    </Portal>
  );
}

export default InfoBuscado;
