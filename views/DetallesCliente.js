import React from 'react';
import {Text, StyleSheet, View, Button} from 'react-native';

const DetallesCliente = () => {
  return (
    <View style={style.contenedor}>
      <Text>DetallesCliente</Text>
    </View>
  );
};

const style = StyleSheet.create({
  contenedor: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default DetallesCliente;
