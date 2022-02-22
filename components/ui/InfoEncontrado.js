import React from 'react'
import {View, Image} from 'react-native';
import {Button, Text, Portal, Modal} from 'react-native-paper';
import infoStyle from '../../styles/info'

function InfoEncontrado({visible, hideModal}) {
  return (
  <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={infoStyle.modal}>
          <View style={infoStyle.InfoContent}>
          <View style={infoStyle.rowinfo}>
          <View style={infoStyle.columncenter}>
          <Image source={require('../../img/home-search.png')} style={infoStyle.imglogoInfo} /> 
            </View>
            <View>

            <Text style={infoStyle.sub}>Búsqueda</Text>
            <Text style={infoStyle.texto}>En la espera de que lo encuentre su familia. Acordate de revisar si lo estan buscando en "Buscados"</Text>
            </View>

          </View>
          
          <View style={infoStyle.rowinfo}>
          <View style={infoStyle.columncenter}>
          <Image source={require('../../img/home-heart.png')} style={infoStyle.imglogoInfo} /> 
            </View>
            <View>
            <Text style={infoStyle.sub}>Entregado</Text>
            <Text style={infoStyle.texto}>Comparte con nosotros si encontraste a su familia</Text>
            </View>
            </View>
              </View>
              <Button
              labelStyle={infoStyle.label}
              style={infoStyle.guardar}
              color="#F59822"
                mode="contained"
                onPress={() => hideModal()}>
                Entendido
              </Button>
            
      </Modal>
    </Portal>
  )
}

export default InfoEncontrado;