import React from 'react'
import {View, Image} from 'react-native';
import {Button, Text, Portal, Modal} from 'react-native-paper';
import infoStyle from '../../styles/info'

function InfoAdopcion({visible, hideModal}) {
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={infoStyle.modal}>
        <View style={infoStyle.infoContent}>
          <View style={infoStyle.rowinfo}>
            <View style={infoStyle.columncenter}>
              <Image
                source={require('../../img/home-search.png')}
                style={infoStyle.imglogoInfo}
              />
            </View>
            <View>
              <Text style={infoStyle.sub}>Búsqueda</Text>
              <Text style={infoStyle.texto}>
                La mascota esta en bùsqueda de su nueva familia
              </Text>
            </View>
          </View>
          <View style={infoStyle.rowinfo}>
            <View style={infoStyle.columncenter}>
              <Image
                source={require('../../img/dots-horizontal.png')}
                style={infoStyle.imglogoInfo}
              />
            </View>
            <View>
              <Text style={infoStyle.sub}>Adaptación</Text>
              <Text style={infoStyle.texto}>
                Es un periodo de mínimo 15 días para que la mascota y su nueva
                familia se conozcan y que sean compatibles
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
              <Text style={infoStyle.sub}>Adoptado</Text>
              <Text style={infoStyle.texto}>Tu mascota consiguió su nuevo hogar!</Text>
            </View>
          </View>
        </View>
        <Button
          labelStyle={infoStyle.label}
          style={infoStyle.guardar}
          color="#9575cd"
          mode="contained"
          onPress={() => hideModal()}>
          Entendido
        </Button>
      </Modal>
    </Portal>
  );
}

export default InfoAdopcion;
